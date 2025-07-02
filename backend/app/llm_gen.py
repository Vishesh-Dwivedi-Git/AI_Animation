import os
import json
import traceback
from mistralai import Mistral
from dotenv import load_dotenv
from app.themes.config import themes # Theme config you defined earlier

load_dotenv()

# Mistral API setup
api_key = os.getenv("MISTRAL_API_KEY")
model = "mistral-large-latest"
client = Mistral(api_key=api_key)

def generate_scene_code(scene_data: dict) -> str:
    """
    Given parsed scene data (objects, actions, background, theme),
    and the theme config, generate stylized Manim code via Mistral LLM.
    """

    try:
        print("\n⚙️ Generating Manim scene from scene_data + theme...")

        theme = scene_data.get("theme", "default")
        theme_config = themes.get(theme, {})

        scene_json = json.dumps(scene_data, indent=2)
        theme_json = json.dumps(theme_config, indent=2)

        system_prompt = (
            "You are an expert in creating animations using the Manim library in Python. "
            "Given a scene description and a theme configuration, generate a Python class that inherits from Scene. "
            "Use background images, object animations, and apply the theme: transitions, run_time, easing, and fonts. "
            "Use ImageMobject for objects and backgrounds if applicable. "
            "Do NOT return anything other than Python code."
        )

        prompt = (
            f"Scene Data:\n{scene_json}\n\n"
            f"Theme Config:\n{theme_json}\n\n"
            "Generate a stylized Manim Scene class implementing this data."
        )

        response = client.chat.complete(
            model=model,
            messages=[
                {"role": "user", "content": f"{system_prompt}\n\n{prompt}"}
            ]
        )

        code = response.choices[0].message.content.strip()

        print("✅ Scene code generated (preview):\n", code[:300])
        return code

    except Exception as e:
        print("❌ Error generating scene code from Mistral")
        traceback.print_exc()
        return "# Error: Failed to generate scene code"
