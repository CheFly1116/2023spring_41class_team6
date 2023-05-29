from flask import Blueprint, request
from flask import jsonify
from elasticsearch import Elasticsearch

from services import example_services as example_services
from services import openai_service as openai_service
from services import es_service as es_service

search_bp = Blueprint(name='search',
                      import_name=__name__,
                      url_prefix='/search')

query_bp = Blueprint(name='query',
                      import_name=__name__,
                      url_prefix='/query')

login_bp = Blueprint(name='login',
                     import_name=__name__,
                     url_prefix='/login')

register_bp = Blueprint(name='register',
                        import_name=__name__,
                        url_prefix='/register')

@search_bp.route('/', methods=['POST']) # Flask <-> ElasticSearch, Flask <-> OpenAI
def docs_search():
    query = request.json.get('query')
    result = es_service.get_rules(query)
    hits = result['hits']['hits'] # result가 OpenAI가 생성한 답변으로 나올 것이므로 수정 필요
    response = {'hits': hits}
    return jsonify(response)

@login_bp.route('/', methods=['POST'])
def login():
    data = request.json
    response = example_services.login(data)
    return jsonify(response)

@register_bp.route('/', methods=['POST'])
def register():
    data = request.get_json(silent=True)
    response = example_services.register(data)
    return jsonify(response)
    