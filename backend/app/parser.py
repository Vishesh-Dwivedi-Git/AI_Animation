import os
import json
import traceback
from mistralai import Mistral
from dotenv import load_dotenv

load_dotenv()

# Mistral API setup
api_key = os.getenv("MISTRAL_API_KEY")
model = "mistral-large-latest"
client = Mistral(api_key=api_key)

def parse_prompt(prompt: str, theme: str = "default") -> dict:
    """
    Use Mistral LLM to convert a natural prompt into structured scene data (objects, background, theme).
    """
    SYSTEM_PROMPT = """
You are a scene planner for a 2D animation engine.
Convert the user's natural prompt into a JSON object with this format:

{
  "objects": [
    { "name": "object_name", "action": "optional_action" }
  ],
  "background": "background_name",
  "theme": "chosen_theme"
}

- Return only valid JSON. No explanation. No comments.
- Use lower_snake_case for keys and values.
- Infer "theme" from user input or default to the provided theme argument.
"""

    USER_PROMPT = f"""
Prompt: "{prompt}"
Default Theme: "{theme}"
"""

    try:
        print("🔍 Parsing prompt with Mistral...")

        response = client.chat.complete(
            model=model,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": USER_PROMPT}
            ]
        )

        content = response.choices[0].message.content.strip()
        print("🧠 Mistral response (raw):", content)

        # Parse JSON safely
        scene_data = json.loads(content)
        return scene_data

    except Exception as e:
        print("❌ Error parsing prompt with Mistral:", e)
        traceback.print_exc()
        return {
            "objects": [],
            "background": "default",
            "theme": theme
        }
