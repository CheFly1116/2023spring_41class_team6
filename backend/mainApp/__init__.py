from flask import Flask, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models.database import SessionLocal
from routes import routes_list

app = Flask(__name__)
db = SQLAlchemy(app)

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
    
    app.run(debug=True)