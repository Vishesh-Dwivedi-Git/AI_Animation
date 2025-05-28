import os
import subprocess
import uuid
from pathlib import Path
import traceback

def render_video(code_path: str) -> str:
    """
    Renders a Manim animation from the provided Python file.

    Args:
        code_path (str): The path to the .py file containing the Manim Scene.

    Returns:
        str: The full path to the rendered video file.

    Raises:
        RuntimeError: If rendering fails.
        FileNotFoundError: If output video file cannot be located.
    """
    print(f"🎬 Starting render for: {code_path}")

    # Generate unique output filename
    output_filename = f"output_{uuid.uuid4().hex[:8]}"
    output_dir = "videos"
    os.makedirs(output_dir, exist_ok=True)
    print(f"📁 Ensured '{output_dir}/' directory exists.")


    # Manim render command
    cmd = [
        "manim",
        code_path,
        "-o", f"{output_filename}.mp4",
        "-qk",  # 'k' stands for 720p quality
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

    # Determine full video output path
    scene_name = Path(code_path).stem
    full_video_path = os.path.join(
        output_dir, "videos", scene_name, "720p30", f"{output_filename}.mp4"
    )

    if os.path.exists(full_video_path):
        print(f"🎉 Rendered video saved to: {full_video_path}")
        return full_video_path
    else:
        print("⚠️ Rendered file not found at expected path, trying fallback search...")

        # Try fallback: Search all .mp4 in output directory
        for root, _, files in os.walk(output_dir):
            for file in files:
                if file.endswith(".mp4") and output_filename in file:
                    fallback_path = os.path.join(root, file)
                    print(f"✅ Found fallback video at: {fallback_path}")
                    return fallback_path

        raise FileNotFoundError("Rendered video not found in expected or fallback locations.")
