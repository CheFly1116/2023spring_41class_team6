"""
Bulk index a jsonl file into Elasticsearch.
"""
import gzip
import json
from sys import argv
from typing import Optional

import elasticsearch
from elasticsearch.helpers import bulk


def bulk_index(
    jsonl_path: str, host: Optional[str] = None, index: str = "docs", **kwargs
) -> None:
    """
    Bulk index the jsonl file at the given path.

    :param jsonl_path: Path to the jsonl file.
    :param host: Host of the Elasticsearch instance.
    :param index: Name of the index to create.
    :param kwargs: Additional arguments to pass to the Elasticsearch constructor.
    :return: None
    """
    documents = []
    if jsonl_path.endswith("jsonl"):
        with open(jsonl_path, "r", encoding="utf-8") as f:
            for line in f:
                documents.append(json.loads(line))
    elif jsonl_path.endswith("jsonl.gz"):
        with gzip.open(jsonl_path, "rt", encoding="utf-8") as f:
            for line in f:
                documents.append(json.loads(line))

    es = elasticsearch.Elasticsearch(hosts=host, **kwargs)

    # Check if index exists
    if es.indices.exists(index=index):
        if input("Index already exists. Do you want to delete it? (y/n)") == "y":
            print("Deleting index...")
            es.indices.delete(index)
        else:
            print("Aborting...")
            return

    # Create index
    print("Creating index...")
    es.indices.create(index=index)

    # Bulk index
    def generate_data():
        for document in documents:
            yield {"_index": index, "_source": document}

    success, failed = bulk(es, generate_data(), stats_only=True)

    print(f"Indexed {success} documents. Failed to index {failed} documents.")


if __name__ == "__main__":
    if len(argv) >= 3:
        host_ = argv[1]
        for jsonl_path_ in argv[2:]:
            try:
                bulk_index(jsonl_path_, host_)
            except Exception as e:
                print(f"Failed to index {jsonl_path_}: {e}")
                exit(1)
    else:
        print(f"Usage: python {argv[0]} host jsonl_path [jsonl_path ...]")
        exit(1)
