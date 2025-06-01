import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
def upload_video(file_path: str, file_name: str) -> str:
    with open(file_path, "rb") as f:
        supabase.storage.from_("animagic").upload(
            file_name,
            f,
            {
                "contentType": "video/mp4",
                "upsert": "true" # Boolean, not string
            }
        )

    # ✅ Get the actual public URL from Supabase
    public_url = supabase.storage.from_("animagic").get_public_url(file_name)
    return public_url
