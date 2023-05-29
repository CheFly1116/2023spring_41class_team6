from flask import Blueprint, request
from flask import jsonify
from elasticsearch import Elasticsearch

from services import example_services as example_services

example_bp = Blueprint(name='example',
                       import_name=__name__,
                       url_prefix='/example')

openai_bp = Blueprint(name='answer',
                      import_name=__name__,
                      url_prefix='/answer')

search_bp = Blueprint(name='search',
                      import_name=__name__,
                      url_prefix='/search')

query_bp = Blueprint(name='query',
                      import_name=__name__,
                      url_prefix='/query')

login_bp = Blueprint(name='login',
                     import_name=__name__,
                     url_prefix='/login')

@example_bp.route('/', methods=['GET'])
def example_route() -> str:
    data = 'hello_world'
    result = example_services.example_route(data=data)
    return jsonify(result=result)

@example_bp.route('/<int:user_number>', methods=['GET'])
def example_route_add_param(user_number: int) -> str:
    result = example_services.example_route_add_param(user_number)
    return jsonify(result=result)

@openai_bp.route('/', methods=['GET']) # openai 답변 생성 요청 들어갈 곳
def answer_route() -> str:
    data = 'hello_world'
    result = example_services.answer_route(data=data)
    return jsonify(result=result)

es = Elasticsearch('https://localhost:9200')

@search_bp.route('/', methods=['POST']) # Flask <-> ElasticSearch
def docs_search():
    query = request.json.get('query')
    result = es.search(index='my_index', body={'query': {'match' : {'text': query}}})
    hits = result['hits']['hits']
    response = {'hits': hits}
    return jsonify(response)

@query_bp.route('/', methods=['POST']) # Android <-> Flask
def generate_answer():
    data = request.json
    response = example_services.generate_answer(data)
    return jsonify(response)

@login_bp.route('/', methods=['POST'])
def login():
    data = request.json
    response = example_services.login(data)
    return jsonify(response)