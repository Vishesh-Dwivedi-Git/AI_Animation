from pymongo import MongoClient
import os
from datetime import datetime

client = MongoClient(os.getenv("MONGO_URL"))
db = client["manim_db"]

def insert_render_entry(email: str, prompt: str, code: str, video_url: str):
    db.renders.insert_one({
        "email": email,
        "prompt": prompt,
        "code": code,
        "video_url": video_url,
        "timestamp": datetime.utcnow()
    })

def insert_user(user: dict):
    db.users.insert_one(user)

def find_user_by_email(email: str):
    return db.users.find_one({"email": email})
