# 【示例6.6】第六章 6.2 小节 database.py
# 第一步，导入SQLAlchemy组件包
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 第二步，创建数据连接引擎
# 数据库连接串的格式为“数据库类型：//用户名：密码@主机/数据库实例”
engine = create_engine("mysql://root:123456@localhost/cat")
# 第三步，创建本地会话
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# 第四步，创建数据模型基础类
Base = declarative_base()