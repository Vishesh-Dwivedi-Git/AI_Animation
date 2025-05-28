from manim import config

config.pixel_height = 480
config.pixel_width = 854
config.frame_rate = 15

from manim import *

class BouncingCircles(Scene):
    def construct(self):
        circles = [
            Circle(radius=1, color=BLUE).shift(UP * 2),
            Circle(radius=1, color=RED).shift(DOWN * 2),
            Circle(radius=1, color=GREEN).shift(LEFT * 2),
            Circle(radius=1, color=YELLOW).shift(RIGHT * 2),
            Circle(radius=1, color=PURPLE)
        ]

        def bounce_zigzag(circle, direction):
            return circle.animate.shift(direction).then(circle.animate.shift(-direction))

        directions = [
            RIGHT * 2,
            LEFT * 2,
            UP * 2,
            DOWN * 2,
            RIGHT * 2 + UP * 2
        ]

        animations = [
            bounce_zigzag(circles[i], directions[i])
            for i in range(5)
        ]

        self.play(*animations, run_time=30)
