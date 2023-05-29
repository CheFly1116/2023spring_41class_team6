from models.model import db, User
from typing import List
from flask import session

def login(username, password):
    try:
        data = User.query.filter_by(username=username, password=password).first()
        if data is not None:
            session['username'] = username
            return True
        else:
            return False
    except:
            return False

def register_user(username, password):
    if not(username and password):
        return False
    else:
        usertable=User()
        usertable.username = username
        usertable.password = password
        db.session.add(usertable)
        db.session.commit()
        return True