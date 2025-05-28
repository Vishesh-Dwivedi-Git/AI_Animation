from manim import config

config.pixel_height = 480
config.pixel_width = 854
config.frame_rate = 15

from manim import *

class CircleToSquare(Scene):
    def construct(self):
        circle = Circle(radius=1, color=RED, fill_opacity=1)
        square = Square(side_length=2, color=WHITE)

        self.play(FadeIn(circle))
        self.play(circle.animate.shift(RIGHT * 2))
        self.play(circle.animate.shift(RIGHT * 2))

        self.play(Transform(circle, square))

        self.play(square.animate.shift(UP * 2).rotate(PI / 4))
        self.wait(1)
