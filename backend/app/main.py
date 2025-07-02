from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from app.utils import inject_manim_config
from app.render import render_and_store
from dotenv import load_dotenv
import traceback
from app.verifyprivy import verify_privy_token
from app.db import find_user_by_privy_id, create_user_with_email_and_privy_id, db
from fastapi.middleware.cors import CORSMiddleware
from app.asset_fetcher import fetch_assets
from app.parser import parse_prompt
from app.llm_gen import generate_scene_code

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 👈 You can restrict this later (e.g., ["http://localhost:3000"])
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str

@app.get("/")
def read_root():
    return {"message": "API is live!"}

@app.post("/api/auth/privy-login")
async def privy_login(payload=Depends(verify_privy_token)):
    privy_id = payload["sub"]
    email = payload.get("email")

    user = find_user_by_privy_id(privy_id)
    if not user:
        create_user_with_email_and_privy_id(privy_id, email)

    return {"message": "Logged in", "email": email}


@app.post("/generate")
def generate_scene(req: PromptRequest, payload=Depends(verify_privy_token)):
    try:
        # 🔐 User authentication
        privy_id = payload["sub"]
        user_email = payload.get("email")

        print(f"\n🔐 Authenticated user: {user_email or privy_id}")
        print("🟡 Received prompt:", req.prompt)

        # 🔎 Step 1: Parse prompt into structured scene data
        scene_data = parse_prompt(req.prompt, theme=req.theme)
        print("✅ Parsed scene data:\n", scene_data)

        # 🎨 Step 2: Generate/fetch required assets
        fetch_assets(scene_data)

        # 🧠 Step 3: Generate Manim code using theme + scene
        raw_code = generate_scene_code(scene_data)
        print("✅ Raw Manim code:\n", raw_code[:500])

        # ⚙️ Step 4: Optionally inject Manim config (like resolution, bg color)
        final_code = inject_manim_config(raw_code)
        print("✅ Final Manim code ready:\n", final_code[:500])

        # 🎞️ Step 5: Render and store video
        video_url = render_and_store(final_code, user_id=privy_id, prompt=req.prompt)
        print(f"✅ Uploaded video URL: {video_url}")

        return {"video_url": video_url}

    except Exception as e:
        print("❌ Error during full generation pipeline")
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": str(e)})