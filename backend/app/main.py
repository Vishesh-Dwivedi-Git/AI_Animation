from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from app.llm_gen import generate_manim_code
from app.utils import inject_manim_config
from app.render import render_and_store
from dotenv import load_dotenv
import traceback
from app.verifyprivy import verify_privy_token

from backend.app import db

load_dotenv()

app = FastAPI()

class PromptRequest(BaseModel):
    prompt: str

@app.get("/")
def read_root():
    return {"message": "API is live!"}

@app.post("/api/auth/privy-login")
async def privy_login(payload=Depends(verify_privy_token)):
    privy_id = payload["sub"]
    email = payload.get("email")

    user = db.users.find_one({"privy_id": privy_id})
    if not user:
        db.users.insert_one({"privy_id": privy_id, "email": email})

    return {"message": "Logged in", "email": email}


@app.post("/generate")
def generate_scene(req: PromptRequest, payload=Depends(verify_privy_token)):
    try:
        privy_id = payload["sub"]         # from token
        user_email = payload.get("email") # optional if present in token

        print(f"\n🔐 Authenticated user: {user_email or privy_id}")
        print("🟡 Received prompt:", req.prompt)

        # Generate animation code
        raw_code = generate_manim_code(req.prompt)
        print("✅ Raw generated code:\n", raw_code[:500])

        # Inject manim config
        final_code = inject_manim_config(raw_code)
        print("✅ Final code:\n", final_code[:500])

        # Render and upload video
        video_url = render_and_store(final_code,  privy_id, prompt=req.prompt)
        print(f"✅ Uploaded video: {video_url}")

        return {"video_url": video_url}

    except Exception as e:
        print("❌ Error during generation pipeline")
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": str(e)})
