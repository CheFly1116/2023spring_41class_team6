import openai

openai.api_key = "API_KEY"  # OpenAI API Key

# OpenAI System Message
OPENAI_SYSTEM_MESSAGE = "당신은 성균관대학교 학생을 돕는 챗봇 'SKKU-GPT' 입니다. 당신은 사용자의 질문과 관련 문서가 주어졌을 때, " \
                        "문서로부터 질문에 대한 답을 찾아 답변해야 합니다. 문서로부터 명확한 답변을 구할 수 없는 경우, 사용자에게 " \
                        "당신은 성균관대학교 챗봇 'SKKU-GPT'로서 주어진 질문에 대해 답변을 드릴 수 없다고 알려주어야 합니다."

OPENAI_QUERY_BODY = """
문서: {document}
질문: {query}
""".strip()


def generate_answer(document: str, user_message: str) -> str:
    """
    Generate answer from the given document and user message

    :param document: document to search from
    :param user_message: user message
    :return: answer
    """
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": OPENAI_SYSTEM_MESSAGE},
            {"role": "user", "content": OPENAI_QUERY_BODY.format(document=document, query=user_message)}
        ],
        max_tokens=512,
        temperature=0.2
    )

    if len(response.choices) == 0:
        return "ChatGPT가 답변을 생성하지 못했습니다. 나중에 다시 시도해주세요."

    answer = response.choices[0].text
    return answer
