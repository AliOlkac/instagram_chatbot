from openai import OpenAI

client = OpenAI(api_key="OPENAI_API_KEYİN")

SYSTEM_PROMPT = """BURAYA AZ ÖNCE VERDİĞİM SİSTEM PROMPT'U KOY"""

def generate_reply(user_message: str, history: list[str] = None) -> str:
    """
    history: önceki konuşmaları liste halinde (isteğe bağlı)
    şimdilik basit tutuyoruz.
    """
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
    ]
    if history:
        for h in history:
            messages.append({"role": "user", "content": h["user"]})
            messages.append({"role": "assistant", "content": h["assistant"]})
    messages.append({"role": "user", "content": user_message})

    # Burada en güncel kullanım için OpenAI dokümantasyonuna bakmanı öneririm:
    # platform.openai.com/docs (Python quickstart)
    response = client.chat.completions.create(
        model="gpt-5.1-mini",   # veya kullanmak istediğin başka bir model
        messages=messages,
    )

    return response.choices[0].message.content

if __name__ == "__main__":
    history = []
    while True:
        msg = input("Müşteri: ")
        if not msg:
            break
        reply = generate_reply(msg, history=history)
        print("Bot:", reply)
        history.append({"user": msg, "assistant": reply})
