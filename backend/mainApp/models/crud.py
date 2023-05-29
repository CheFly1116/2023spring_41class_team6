from sqlalchemy.orm import Session

from model import User

def db_register_user(db: Session, name, password):
    db_item = User(name=name, password=password)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

from schema import UserSchema

def db_get_users(db: Session):
    return db.query(User).all()

def db_del_user(db: Session, user: User, users: UserSchema):
    db.query(User) \
           .filter(User.id == users.id) \
           .delete()
    db.commit()
    return True