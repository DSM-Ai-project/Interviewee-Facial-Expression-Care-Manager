from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn


def create_app():
    app = FastAPI()
    include_router(app)
    add_cors_middleware(app)
    return app


def include_router(app: FastAPI):
    return None


def add_cors_middleware(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


app = create_app()

if __name__ == '__main__':
    uvicorn.run("main:app", reload=True)