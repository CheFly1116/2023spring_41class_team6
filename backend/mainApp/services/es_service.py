from elasticsearch import Elasticsearch
import openai

es = Elasticsearch('https://localhost:9200')
openai.api_key = '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'

def get_rules(user_message):
    result = es.search(index='my_index', body={'query': {'match' : {'text': user_message}}})
    hits = result['hits']['hits']
    if hits == '': # 문서를 찾아오지 못했을 경우 예외처리 필요
        a = 1 # syntax를 위한 임의 처리 구현 뒤 삭제
    
    message = '' # 구현 필요
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": message}
        ],
        max_tokens = 512,
        temperature = 0.2
    )

    return response.choices[0].message["content"]
    # return message 
    return hits
