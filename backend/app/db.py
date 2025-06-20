from pymongo import MongoClient
import os
from datetime import datetime

client = MongoClient(os.getenv("MONGO_URL"))
db = client["manim_db"]

def insert_render_entry(privy_id: str, prompt: str, code: str, video_url: str):
    db.renders.insert_one({
        "privy-Id": privy_id,
        "prompt": prompt,
        "code": code,
        "video_url": video_url,
        "timestamp": datetime.utcnow()
    })

