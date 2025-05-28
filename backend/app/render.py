import os
import subprocess
import uuid
from pathlib import Path
import traceback
import re

def extract_scene_names(code_path: str):
    """
    Extracts all class names that inherit from Scene or its subclasses in a Manim script.
    """
    try:
        with open(code_path, "r", encoding="utf-8") as f:
            code = f.read()
        return re.findall(r'class\s+(\w+)\s*\((?:.*?)Scene\)', code)
    except Exception:
        return []

def render_video(code_path: str, quality: str = "l") -> str:
    """
    Renders a Manim animation from the provided Python file.

    Args:
        code_path (str): The path to the .py file containing the Manim Scene.
        quality (str): Render quality: 'l' (low), 'm' (medium), 'h' (high), 'k' (4K/720p).

    Returns:
        str: The full path to the rendered video file.
    """
    print(f"🎬 Starting render for: {code_path}")

    # Ensure videos/ directory exists
    output_dir = "videos"
    os.makedirs(output_dir, exist_ok=True)
    print(f"📁 Ensured '{output_dir}/' directory exists.")

    # Generate unique output filename
    output_filename = f"output_{uuid.uuid4().hex[:8]}"

    # Extract scene names (optional)
    scene_names = extract_scene_names(code_path)
    if not scene_names:
        print("⚠️ No scene class found. Rendering may fail unless scene is explicitly named.")
    else:
        print(f"🎭 Detected scene(s): {scene_names}")

    # Manim render command
    cmd = [
        "manim",
        code_path,
        "-o", f"{output_filename}.mp4",
        f"-q{quality}",
        "--media_dir", output_dir
    ]
    print(f"🚀 Running command: {' '.join(cmd)}")

    try:
        subprocess.run(cmd, check=True)
        print("✅ Manim render completed.")
    except subprocess.CalledProcessError as e:
        print("❌ Manim rendering failed!")
        traceback.print_exc()
        raise RuntimeError("Manim rendering failed.") from e

    # Try to locate the rendered video
    found_path = None
    for root, _, files in os.walk(output_dir):
        for file in files:
            if file.endswith(".mp4") and output_filename in file:
                found_path = os.path.join(root, file)
                break
        if found_path:
            break

    if found_path:
        print(f"🎉 Rendered video saved to: {found_path}")
        return found_path
    else:
        raise FileNotFoundError("Rendered video not found in output directory.")
