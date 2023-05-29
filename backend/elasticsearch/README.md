# Elasticsearch backend

Elasticsearch를 검색 엔진으로 사용

## 설치

```bash
docker-compose up -d
```

## 실행

```bash
docker-compose start
```

## 종료

```bash
docker-compose stop
```

## 삭제

```bash
docker-compose down
```

## Kibana 접속

[http://localhost:5601](http://localhost:5601)

## 문서 색인

Docker 컨테이너가 실행된 상태에서 아래 명령어를 실행
```bash
python index.py http://localhost:9200 documents/data.jsonl.gz
```
