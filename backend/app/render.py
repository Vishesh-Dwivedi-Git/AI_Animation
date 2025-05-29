import subprocess
import uuid
import tempfile
from .db import insert_render_entry
from .storage import upload_video
import os

def render_and_store(user_email: str, prompt: str, final_code: str) -> str:
    with tempfile.NamedTemporaryFile(suffix=".py", mode="w", delete=False) as tmpfile:
        tmpfile.write(final_code)
        code_path = tmpfile.name

    output_filename = f"output_{uuid.uuid4().hex[:8]}.mp4"
    output_path = os.path.join(tempfile.gettempdir(), output_filename)

    cmd = ["manim", code_path, "-o", output_filename, "-q", "l", "--media_dir", tempfile.gettempdir()]
    subprocess.run(cmd, check=True)

    video_url = upload_video(output_path, output_filename)
    insert_render_entry(user_email, prompt, final_code, video_url)
    return video_url
