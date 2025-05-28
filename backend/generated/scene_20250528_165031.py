
from manim import *

class BouncingCircle(Scene):
    def construct(self):
        circle = Circle(radius=1, color=RED, fill_opacity=1)
        self.play(Create(circle))
        self.play(circle.animate.shift(UP * 2))
        self.play(circle.animate.shift(DOWN * 4))
        self.play(circle.animate.shift(UP * 2))
        self.play(circle.animate.shift(DOWN * 2))
        self.wait(1)
