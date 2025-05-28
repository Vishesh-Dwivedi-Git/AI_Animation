from manim import config

config.pixel_height = 480
config.pixel_width = 854
config.frame_rate = 15

from manim import *

class BouncingCircles(Scene):
    def construct(self):
        circles = [
            Circle(color=BLUE, radius=1).shift(LEFT * 3 + UP * 2),
            Circle(color=RED, radius=1).shift(RIGHT * 3 + UP * 2),
            Circle(color=GREEN, radius=1).shift(LEFT * 3 + DOWN * 2),
            Circle(color=YELLOW, radius=1).shift(RIGHT * 3 + DOWN * 2),
            Circle(color=PURPLE, radius=1)
        ]

        for circle in circles:
            self.add(circle)

        def bounce_zigzag(circle, direction):
            return circle.animate.shift(direction).then(circle.animate.shift(-direction))

        animations = [
            bounce_zigzag(circles[0], RIGHT * 2 + DOWN),
            bounce_zigzag(circles[1], LEFT * 2 + DOWN),
            bounce_zigzag(circles[2], RIGHT * 2 + UP),
            bounce_zigzag(circles[3], LEFT * 2 + UP),
            bounce_zigzag(circles[4], RIGHT * 2 + UP)
        ]

        self.play(*animations, run_time=2)
        self.wait(1)

        animations = [
            bounce_zigzag(circles[0], LEFT * 2 + UP),
            bounce_zigzag(circles[1], RIGHT * 2 + UP),
            bounce_zigzag(circles[2], LEFT * 2 + DOWN),
            bounce_zigzag(circles[3], RIGHT * 2 + DOWN),
            bounce_zigzag(circles[4], LEFT * 2 + DOWN)
        ]

        self.play(*animations, run_time=2)
        self.wait(1)

        animations = [
            bounce_zigzag(circles[0], RIGHT * 2 + DOWN),
            bounce_zigzag(circles[1], LEFT * 2 + DOWN),
            bounce_zigzag(circles[2], RIGHT * 2 + UP),
            bounce_zigzag(circles[3], LEFT * 2 + UP),
            bounce_zigzag(circles[4], RIGHT * 2 + UP)
        ]

        self.play(*animations, run_time=2)
        self.wait(1)

        animations = [
            bounce_zigzag(circles[0], LEFT * 2 + UP),
            bounce_zigzag(circles[1], RIGHT * 2 + UP),
            bounce_zigzag(circles[2], LEFT * 2 + DOWN),
            bounce_zigzag(circles[3], RIGHT * 2 + DOWN),
            bounce_zigzag(circles[4], LEFT * 2 + DOWN)
        ]

        self.play(*animations, run_time=2)
        self.wait(1)

        animations = [
            bounce_zigzag(circles[0], RIGHT * 2 + DOWN),
            bounce_zigzag(circles[1], LEFT * 2 + DOWN),
            bounce_zigzag(circles[2], RIGHT * 2 + UP),
            bounce_zigzag(circles[3], LEFT * 2 + UP),
            bounce_zigzag(circles[4], RIGHT * 2 + UP)
        ]

        self.play(*animations, run_time=2)
        self.wait(1)
