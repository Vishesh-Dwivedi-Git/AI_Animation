import os
from datetime import datetime
import traceback

def clean_code(code: str) -> str:
    """
    Removes markdown-style code fences (```python ... ```) from the code.
    """
    lines = code.strip().splitlines()
    if lines and lines[0].strip().startswith("```"):
        lines = lines[1:]
    if lines and lines[-1].strip().startswith("```"):
        lines = lines[:-1]
    return "\n".join(lines)

def save_code_to_file(code: str) -> str:
    """
    Saves the generated Manim code to a timestamped Python file inside the 'generated/' folder.

    Args:
        code (str): The Python code to save.

    Returns:
        str: The full path to the saved Python file.
    """
    try:
        # Ensure the folder exists
        os.makedirs("generated", exist_ok=True)
        print("📁 Ensured 'generated/' directory exists.")

        # Create a timestamped filename
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filepath = f"generated/scene_{timestamp}.py"

        # Clean and save the code to the file
        cleaned_code = clean_code(code)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(cleaned_code)
        print(f"✅ Code saved to: {filepath}")

        return filepath

    except Exception as e:
        print("❌ Error saving code to file!")
        traceback.print_exc()
        return "generated/error.py"
