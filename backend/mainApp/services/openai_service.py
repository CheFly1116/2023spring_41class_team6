import openai

openai.api_key = "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"  # OpenAI API Key

# OpenAI System Message
OPENAI_SYSTEM_MESSAGE = "당신은 성균관대학교 학생을 돕는 챗봇 'SKKU-GPT' 입니다. 당신은 사용자의 질문과 관련 문서가 주어졌을 때, " \
                        "문서로부터 질문에 대한 답을 찾아 답변해야 합니다. 문서로부터 명확한 답변을 구할 수 없는 경우, 사용자에게 " \
                        "주어진 질문에 대해 답변을 드릴 수 없다고 알려주어야 합니다. 문서에서 답변을 찾은 경우, 자연스럽게 답변을 제시해야 합니다. 또한, 답변을 제시할 때 '문서'의 " \
                        "존재에 대해 언급하지 말아야 합니다."

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
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": OPENAI_SYSTEM_MESSAGE},
                {"role": "user", "content": OPENAI_QUERY_BODY.format(document=document, query=user_message)}
            ],
            max_tokens=512,
            temperature=0.2
        )
    except openai.error.AuthenticationError:
        return "OpenAI API Key가 잘못되었습니다. 나중에 다시 시도해주세요."

    try:
        answer = response.choices[0]["message"]["content"]

    except:
        return "ChatGPT가 답변을 생성하지 못했습니다. 나중에 다시 시도해주세요."

    return answer
