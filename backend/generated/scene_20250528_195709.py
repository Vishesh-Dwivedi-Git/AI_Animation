from manim import config

config.pixel_height = 480
config.pixel_width = 854
config.frame_rate = 15

from manim import *

class TransformingCircleToSquare(Scene):
    def construct(self):
        circle = Circle(radius=1, color=RED, fill_opacity=1)
        square = Square(side_length=2, color=RED, fill_opacity=1)

        self.play(Create(circle))
        self.play(circle.animate.shift(RIGHT*2))
        self.play(Transform(circle, square))
        self.play(Rotate(square, angle=2*PI, about_point=square.get_vertices()[0]))
