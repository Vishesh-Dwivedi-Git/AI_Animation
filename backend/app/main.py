from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse

from app.llm_gen import generate_manim_code
from app.utils import save_code_to_file
from app.render import render_video
from dotenv import load_dotenv
import traceback

load_dotenv()

app = FastAPI()

class PromptRequest(BaseModel):
    prompt: str

@app.get("/")
def read_root():
    return {"message": "API is live!"}

@app.post("/generate")
def generate_scene(req: PromptRequest):
    try:
        print("\n🟡 Received prompt:", req.prompt)

        code = generate_manim_code(req.prompt)
        print("✅ Generated Manim code:\n", code[:500])  # Print first 500 chars

        path = save_code_to_file(code)
        print(f"📄 Code saved to: {path}")

        print("🎞️ Starting render...")
        video_path = render_video(path)
        print(f"✅ Video rendered at: {video_path}")

        return {"video_url": f"/{video_path}"}

    except Exception as e:
        print("❌ Error occurred during generation pipeline")
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": str(e)})

# Serve static video files
app.mount("/videos", StaticFiles(directory="videos"), name="videos")
