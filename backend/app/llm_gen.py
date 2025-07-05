import os
import traceback
from mistralai import Mistral
from dotenv import load_dotenv

load_dotenv()

# Mistral API setup
api_key = os.getenv("MISTRAL_API_KEY")
model = "mistral-large-latest"
client = Mistral(api_key=api_key)

def generate_manim_code(prompt: str) -> str:
    try:
        print("\n🟡 Sending prompt to Mistral LLM...")
        print(f"📝 Prompt: {prompt}")

        system_prompt = (
           "You are an expert Python developer using the Manim animation library. "
            "Based on user prompts, generate valid and clean Manim code that uses the Scene class. "
            "Only return Python code. Do not add comments or explanations. "
             "Only generate animations involving basic 2D shapes such as circles, squares, triangles, lines, and polygons. "
             "Do not use any external objects, images, or prebuilt scenes. Focus strictly on 2D shape-based animations."
        )

        full_prompt = f"{system_prompt}\n\nUser Prompt: {prompt}\nGenerate only Manim Python code for this."

        chat_response = client.chat.complete(
            model=model,
            messages=[
                {"role": "user", "content": full_prompt},
            ]
        )

        code = chat_response.choices[0].message.content
        print("✅ Mistral LLM response received. Sample:\n", code[:500])  # Partial preview

        return code

    except Exception as e:
        print("❌ Error during LLM generation with Mistral")
        traceback.print_exc()
        return "# Error: Failed to generate code"
