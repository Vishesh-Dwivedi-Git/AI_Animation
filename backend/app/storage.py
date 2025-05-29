import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def upload_video(file_path: str, file_name: str) -> str:
    with open(file_path, "rb") as f:
        supabase.storage.from_("videos").upload(file_name, f)
    return f"{SUPABASE_URL}/storage/v1/object/public/videos/{file_name}"
