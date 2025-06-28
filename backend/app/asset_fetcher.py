import os
import requests
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv

load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")  # Hugging Face token
HF_MODEL = "runwayml/stable-diffusion-v1-5"  # Or any other hosted model

API_URL = f"https://api-inference.huggingface.co/models/{HF_MODEL}"
HEADERS = {
    "Authorization": f"Bearer {HF_TOKEN}"
}

def generate_image(prompt: str, save_path: str):
    if os.path.exists(save_path):
        print(f"✅ Already exists: {save_path}")
        return

    print(f"🟢 Generating image for: {prompt}")

    try:
        response = requests.post(
            API_URL,
            headers=HEADERS,
            json={"inputs": prompt}
        )

        if response.status_code != 200:
            print(f"❌ Error from Hugging Face API: {response.status_code}")
            print(response.text)
            return

        img = Image.open(BytesIO(response.content)).convert("RGBA")
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        img.save(save_path)
        print(f"✅ Saved image to {save_path}")

    except Exception as e:
        print(f"❌ Exception during image generation for '{prompt}':", e)


def fetch_assets(scene_data: dict):
    theme = scene_data.get("theme", "default")

    # Generate object images
    for obj in scene_data.get("objects", []):
        name = obj["name"]
        prompt = f"{theme} style {name} with transparent background"
        path = f"assets/objects/{name}.png"
        generate_image(prompt, path)

    # Generate background image
    bg = scene_data.get("background")
    if bg:
        prompt = f"{theme} style background of {bg}"
        path = f"assets/backgrounds/{bg}.png"
        generate_image(prompt, path)
