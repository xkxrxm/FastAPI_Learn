from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.config import DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DATABASE

from urllib.parse import quote


encoded_password = quote(DB_PASSWORD, safe="")
connection_string = f"mysql://{DB_USERNAME}:{encoded_password}@{DB_HOST}:3306/{DB_DATABASE}"
engine = create_engine(connection_string, echo=False)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

