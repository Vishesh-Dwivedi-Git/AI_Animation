from manim import config

config.pixel_height = 480
config.pixel_width = 854
config.frame_rate = 15

from manim import *

class CircleToSquareTransform(Scene):
    def construct(self):
        circle = Circle(color=RED, fill_opacity=1)
        square = Square(color=BLUE, fill_opacity=1)

        self.play(FadeIn(circle))
        self.play(circle.animate.shift(RIGHT * 2))
        self.play(Transform(circle, square))
        self.play(Rotate(square, angle=PI / 2, about_point=ORIGIN))
        self.play(FadeOut(square))
