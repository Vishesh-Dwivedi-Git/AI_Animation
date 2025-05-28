from manim import *

class BouncingCircle(Scene):
    def construct(self):
        circle = Circle(color=YELLOW, radius=1)
        self.play(Create(circle))
        self.play(circle.animate.shift(UP * 2), run_time=1)
        self.play(circle.animate.shift(DOWN * 4), run_time=1)
        self.play(circle.animate.shift(UP * 2), run_time=1)
        self.wait(1)