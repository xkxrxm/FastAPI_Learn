import uvicorn
from fastapi import FastAPI
from starlette.responses import RedirectResponse

from app.router import router

app = FastAPI()

app.include_router(router)


@app.get('/')
async def toweb():
    return RedirectResponse('/docs')


if __name__ == '__main__':
    uvicorn.run(app=app,host='0.0.0.0', port=8080)
