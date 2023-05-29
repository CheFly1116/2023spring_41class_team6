from flask import Blueprint, jsonify, request
from services import es_service as es_service, example_services as example_services, openai_service as openai_service

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

    document = es_service.search_document(query)
    answer = openai_service.generate_answer(document, query)

    response = {"hits": answer}

    return jsonify(response)

@login_bp.route('/', methods=['POST'])
def login():
    data = request.get_json(silent=True)
    response = example_services.login(data)
    return jsonify(response)

@register_bp.route('/', methods=['POST'])
def register():
    data = request.get_json(silent=True)
    response = example_services.register_user(data)
    return jsonify(response)