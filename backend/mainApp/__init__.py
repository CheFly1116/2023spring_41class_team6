from flask import Flask, jsonify, make_response, current_app
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from routes import routes_list
from models.model import db

from flask_wtf.csrf import CSRFProtect
import os

app = Flask(__name__)

#routes list
routes_list(app)

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.errorhandler(500)
def internal_error(error):
    return make_response(jsonify({'error': 'Internal server error'}), 500)

@app.route('/')
def hello_world():
    return 'hello world!'

if __name__=='__main__':
    basedir = os.path.abspath(os.path.dirname(__file__))
    dbfile = os.path.join(basedir, 'db.sqlite')

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + dbfile   
    app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True 
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
    app.config['SECRET_KEY'] = 'wcsfeufhwiquehfdx'

    csrf = CSRFProtect()
    csrf.init_app(app)

    db.init_app(app)
    db.app = app
    with app.app_context():
        db.create_all()  #db 생성

    app.run(host="127.0.0.1", port=5000, debug=True)