import subprocess
import uuid
import tempfile
from .db import insert_render_entry
from .storage import upload_video
import os
import glob


from .db import insert_render_entry  # Make sure this import exists

def render_and_store(user_code: str, email: str, prompt: str) -> str:
    import tempfile, subprocess, uuid, os, glob

    # Step 1: Save Manim code to temp file
    with tempfile.NamedTemporaryFile(mode="w", suffix=".py", delete=False) as tmp_code_file:
        tmp_code_file.write(user_code)
        code_path = tmp_code_file.name

    # Step 2: Render video
    output_filename = f"output_{uuid.uuid4().hex[:8]}.mp4"
    media_dir = tempfile.gettempdir()

    cmd = [
        "manim", code_path,
        "-q", "l",
        "--format", "mp4",
        "--media_dir", media_dir,
        "--output_file", output_filename
    ]
    subprocess.run(cmd, check=True)

    # Step 3: Find the output video
    search_path = os.path.join(media_dir, "**", output_filename)
    found_files = glob.glob(search_path, recursive=True)
    if not found_files:
        raise FileNotFoundError(f"Could not find rendered video: {output_filename}")
    real_output_path = found_files[0]
    print(f"✅ Rendered video saved at: {real_output_path}")
    print(f"Output video path: {real_output_path}")
    # Step 4: Upload to Supabase
    video_url = upload_video(real_output_path, output_filename)

    # Step 5: Save render entry in MongoDB
    insert_render_entry(email=email, prompt=prompt, code=user_code, video_url=video_url)

    # Step 6: Clean up
    os.remove(code_path)
    os.remove(real_output_path)

    return video_url
