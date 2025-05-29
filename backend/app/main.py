from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from app.llm_gen import generate_manim_code
from app.utils import inject_manim_config
from app.render import render_and_store
from app.auth import get_current_user, create_user, authenticate_user
from app.models import UserCreate, UserLogin
from dotenv import load_dotenv
import traceback

load_dotenv()

app = FastAPI()

class PromptRequest(BaseModel):
    prompt: str

@app.get("/")
def read_root():
    return {"message": "API is live!"}

@app.post("/signup")
def signup(user: UserCreate):
    return create_user(user)

@app.post("/login")
def login(user: UserLogin):
    return authenticate_user(user)

@app.post("/generate")
def generate_scene(req: PromptRequest, user=Depends(get_current_user)):
    try:
        print("\n🟡 Received prompt:", req.prompt)

        raw_code = generate_manim_code(req.prompt)
        print("✅ Raw generated code:\n", raw_code[:500])

        final_code = inject_manim_config(raw_code)
        print("✅ Cleaned and injected code:\n", final_code[:500])

        video_url = render_and_store(user["email"], req.prompt, final_code)
        print(f"✅ Uploaded video: {video_url}")

        return {"video_url": video_url}

    except Exception as e:
        print("❌ Error during generation pipeline")
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": str(e)})
