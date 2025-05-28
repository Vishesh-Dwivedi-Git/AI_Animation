from manim import config

config.pixel_height = 480
config.pixel_width = 854
config.frame_rate = 15

from manim import *

class CircleToSquareAnimation(Scene):
    def construct(self):
        circle = Circle(radius=1, color=BLUE)
        square = Square(side_length=2, color=RED)

        self.play(Create(circle))
        self.play(Transform(circle, square))
        self.play(ApplyMethod(circle.shift, UP))
        self.play(ApplyMethod(circle.shift, DOWN))
        self.play(Transform(circle, Circle(radius=1, color=BLUE)))
