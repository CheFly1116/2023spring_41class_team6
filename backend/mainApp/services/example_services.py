from models.crud import db_register_user, db_get_users, db_del_user
from models.database import SessionLocal, engine, Base
from models.schema import UserSchema
from models.model import User
from typing import List

def login(data):
    name = data["username"]
    return data["username"]


def register_user(data):
    return data