from elasticsearch import Elasticsearch

es = Elasticsearch('https://localhost:9200')

def get_rules(user_message):
    result = es.search(index='my_index', body={'query': {'match' : {'text': user_message}}})
    hits = result['hits']['hits']
    return hits
