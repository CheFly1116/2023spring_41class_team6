from flask import Blueprint, jsonify, request
from services import es_service as es_service, example_services as example_services, openai_service as openai_service

search_bp = Blueprint(name='search',
                      import_name=__name__,
                      url_prefix='/search')

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
    print(response)
    return jsonify(response)

@login_bp.route('/', methods=['POST'])
def login():
    content = request.get_json(silent=True)
    username = content["username"]
    password = content["password"]
    response = example_services.login(username, password)
    return jsonify({'success': response})

@register_bp.route('/', methods=['POST'])
def register():
    content = request.get_json(silent=True)
    username = content["username"]
    password = content["password"]
    response = example_services.register_user(username, password)
    return jsonify({'success': response})