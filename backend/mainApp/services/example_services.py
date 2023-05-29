from models.model import db, User
from typing import List
from flask import session

def login(username, password):
    return True

def register_user(username, password):
    if not(username and password):
        return False
    else:
        usertable=User() #user_table 클래스
        usertable.username = username
        usertable.password = password
        db.session.add(usertable)
        db.session.commit()
        return True