from manim import config

config.pixel_height = 480
config.pixel_width = 854
config.frame_rate = 15

from manim import *

class TransformAndRotate(Scene):
    def construct(self):
        circle = Circle(color=RED, fill_opacity=1)
        square = Square(color=BLUE)

        self.play(Create(circle))
        self.play(Transform(circle, square))
        self.play(Rotate(square, angle=PI, about_point=RIGHT))
        self.wait(1)
