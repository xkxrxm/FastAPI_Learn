import logging
import requests
from bs4 import BeautifulSoup as BS
import time
import json
import ddddocr
import re

from app.config import BUPT_USERNAME, BUPT_PASSWARD

ocr = ddddocr.DdddOcr()

# 设置debug等级
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(filename)s:%(lineno)s - %(message)s')


class Crawler:
    in_school = True
    headers = {
        "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'}
    webvpn = 'https://webvpn.bupt.edu.cn'
    session = requests.session()
    login_code = 401
    redirect = {}
    service = {
        'my': 'http://my.bupt.edu.cn/system/resource/code/auth/clogin.jsp?owner=1664271694'
    }

    url = {'my': ''}

    info_dest = {
        'notice': {
            'url': 'list.jsp?{}urltype=tree.TreeTempUrl&wbtreeid=1154',
            'tag': '【校内通知】',
            'redis': 'bupt_notice'
        },
        'ncov': {
            'url': 'list.jsp?{}urltype=tree.TreeTempUrl&wbtreeid=2012',
            'tag': '【防控通知】',
            'redis': 'bupt_ncov'
        },
        'public': {
            'url': 'list.jsp?{}urltype=tree.TreeTempUrl&wbtreeid=1305',
            'tag': '【公示公告】',
            'redis': 'bupt_public'
        }
    }

    # initialize
    def __init__(self, in_school=True):
        self.in_school = in_school
        for i in range(3):
            if self.login() == 200:
                break

    # encap get method
    def get(self, url, params=None):
        return self.session.get(url=url, headers=self.headers, params=params)

    # encap post method
    def post(self, url, data=None):
        return self.session.post(url=url, headers=self.headers, data=data)

    # login to webvpn
    def login_webvpn(self):
        response = self.get(self.webvpn + '/login')
        doc = BS(response.text, features='lxml')
        try:
            captcha_id = doc.select('input[name="captcha_id"]')[0].attrs.get('value')
            data = {
                'auth_type': 'local',
                'username': '2020210809',
                'sms_code': '',
                'password': '06238573',
                'captcha': '',
                'needCaptcha': 'false',
                'captcha_id': captcha_id
            }
            response = self.post(self.webvpn + '/do-login', data=data)
            logging.info('login to webvpn return %d', response.status_code)
            if response.status_code != 200:
                return None
        except Exception:
            pass

        # get redirect infomation
        cur_time = int(round(time.time() * 1000))
        response = self.get(self.webvpn + '/user/portal_groups', {'_t': cur_time})
        try:
            for item in json.loads(response.text)['data'][0]['resource']:
                self.redirect[item['detail'].split('.')[0]] = item['redirect']
            # print(self.redirect)
        except Exception:
            # print(response.text)
            return None

        # get login url
        response = self.get(self.webvpn + self.redirect['my'])
        return response.url[:response.url.find('?')]

    # login authentication
    def login(self):
        login_url = 'https://auth.bupt.edu.cn/authserver/login'

        # check webvpn
        if not self.in_school:
            login_url = self.login_webvpn()
        if login_url == None:
            return 401
        status_code = 401

        response = self.get(login_url, {'service': self.service['my']})
        doc = BS(response.text, features='lxml')
        execution = doc.select('input[name="execution"]')[0].attrs.get('value')

        # construct login data
        data = {
            'username': BUPT_USERNAME,
            'password': BUPT_PASSWARD,
            'submit': "登录",
            'type': 'username_password',
            'execution': execution,
            '_eventId': "submit"
        }

        # verify code
        code = self.decode(login_url[:login_url.find('/login')], doc.find_all('script'))
        if code != '':
            data['captcha'] = code

        response = self.post(login_url, data)
        status_code = response.status_code
        logging.info('authenticate return %d', status_code)
        if status_code == 200:
            self.url['my'] = self.webvpn + self.redirect['my'] if not self.in_school else 'http://my.bupt.edu.cn/'

        self.login_code = status_code
        return status_code

    # decode verify code picture
    def decode(self, base, js_list):
        capt = ''
        for ele in js_list:
            if ele.text.find('captchaUrl()') != -1:
                capt = ele.text
                break
        if capt == '':
            return

        # get verify code id
        id = re.findall('id: \'[0-9]*\'', capt)[0].replace('\'', '')
        id = id[id.find(': ') + 2:]

        # get image data stream
        img_data = self.get(base + '/captcha?captchaId=' + id).content
        # with open('./code.png','wb')as fp:
        #     fp.write(img_data)

        # call ocr
        res = ocr.classification(img_data).replace('l', '1')
        logging.info('decode: %s', res)
        return res

    # check login status
    def login_check(self):
        if self.login_code != 200:
            logging.error('not logged in')
            # send_msg(type='private',to=self.redis.get('qbot_root'),msg='athentication failed.')
            raise Exception('not logged in')

    # get article details
    def get_detail(self, sec_url):
        try:
            self.login_check()
        except Exception:
            return {"title": '', "content": ''}
        self.get(self.url['my'] + sec_url)
        response = self.get(self.url['my'] + sec_url)
        print(self.url['my'] + sec_url)
        doc = BS(response.text, features='lxml', from_encoding='utf-8')
        # get article node

        node = doc.find('div', class_='singlemainbox').find('form').find('div')

        # print(node)
        # get title, post and content
        title = node.find('h1').text
        content = node.find('div', class_='singleinfo').text

        return {"title": title, "content": content}


crawler = Crawler()
