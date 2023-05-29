"""
Compresses JSONL file with gzip
"""
import gzip
import json
from sys import argv


def compress_jsonl(jsonl_path: str, gzip_path: str) -> None:
    """
    Compresses JSONL file with gzip.

    :param jsonl_path: Path to the JSONL file.
    :param gzip_path: Path to the gzip file.
    :return: None
    """
    with open(jsonl_path, "r", encoding="utf-8") as f, gzip.open(gzip_path, "wt", encoding="utf-8") as g:
        for line in f:
            g.write(json.dumps(json.loads(line), ensure_ascii=False) + "\n")


if __name__ == "__main__":
    if len(argv) == 3:
        jsonl_path_ = argv[1]
        gzip_path_ = argv[2]
        compress_jsonl(jsonl_path_, gzip_path_)
    else:
        print(f"Usage: python {argv[0]} <jsonl_path> <gzip_path>")
