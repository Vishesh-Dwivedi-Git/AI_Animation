import os
from datetime import datetime
import traceback
import textwrap

def clean_code(code: str) -> str:
    """
    Removes markdown-style code fences (```python ... ```) from the code.
    Also dedents the code to ensure correct indentation.
    """
    lines = code.strip().splitlines()
    if lines and lines[0].strip().startswith("```"):
        lines = lines[1:]
    if lines and lines[-1].strip().startswith("```"):
        lines = lines[:-1]
    return textwrap.dedent("\n".join(lines)).strip()

def save_code_to_file(code: str) -> str:
    """
    Cleans, injects config, and saves the Manim code to a timestamped file inside 'generated/'.

    Args:
        code (str): The Python code to save.

    Returns:
        str: The full path to the saved Python file.
    """
    try:
        os.makedirs("generated", exist_ok=True)
        print("📁 Ensured 'generated/' directory exists.")

        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filepath = f"generated/scene_{timestamp}.py"

        cleaned_code = clean_code(code)

        # Manim config injection block (dedented)
        config_injection = textwrap.dedent("""\
            from manim import config

            config.pixel_height = 480
            config.pixel_width = 854
            config.frame_rate = 15

        """)

        final_code = config_injection + cleaned_code + "\n"

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(final_code)
        print(f"✅ Code saved to: {filepath}")

        return filepath

    except Exception as e:
        print("❌ Error saving code to file!")
        traceback.print_exc()
        return "generated/error.py"
