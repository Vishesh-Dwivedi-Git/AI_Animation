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

def find_user_by_privy_id(privy_id):
    """Find a user by Privy ID."""
    return db.users.find_one({"privy_id": privy_id})

def create_user_with_email_and_privy_id( privy_id, email):
    """Create a user with Privy ID and email."""
    return db.users.insert_one({"privy_id": privy_id, "email": email})

