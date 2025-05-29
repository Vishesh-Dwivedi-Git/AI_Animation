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

def inject_manim_config(code: str) -> str:
    """
    Prepends Manim configuration settings to the user's code.
    """
    config_injection = textwrap.dedent("""\
        from manim import config

        config.pixel_height = 480
        config.pixel_width = 854
        config.frame_rate = 15

    """)
    cleaned = clean_code(code)
    return config_injection + cleaned + "\n"
