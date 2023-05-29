from elasticsearch import Elasticsearch

es = Elasticsearch('http://localhost:9200')


def search_document(user_message: str) -> str:
    """
    Query ElasticSearch and return the result

    :param user_message: user query
    :return: document or error message
    """
    user_message = user_message.strip()

    result = es.search(index='docs', body={
        "query": {
            "bool": {
                "must": [
                ],
                "should": [
                    {
                        "match": {
                            "document": {
                                "query": user_message
                            }
                        }
                    },
                    {
                        "match": {
                            "title": {
                                "query": user_message
                            }
                        }
                    },
                    {
                        "match": {
                            "title": "2023년"
                        }
                    }
                ]
            }
        }
    })
    count = result['hits']['total']['value']

    if count == 0:
        return "질문과 관련된 문서 정보를 찾을 수 없습니다."

    hit = result['hits']['hits'][0]['_source']
    document = hit['document']
    url = hit['url']

    return document
