from manim import config

config.pixel_height = 480
config.pixel_width = 854
config.frame_rate = 15

from manim import *

class BouncingCircles(Scene):
    def construct(self):
        circles = [
            Circle(color=RED, radius=1).shift(LEFT * 3 + UP * 2),
            Circle(color=GREEN, radius=1).shift(RIGHT * 3 + UP * 2),
            Circle(color=BLUE, radius=1).shift(LEFT * 3 + DOWN * 2),
            Circle(color=YELLOW, radius=1).shift(RIGHT * 3 + DOWN * 2),
            Circle(color=PURPLE, radius=1)
        ]

        for circle in circles:
            self.play(FadeIn(circle))

        def zigzag_path(circle, t):
            return UP * np.sin(t * PI) + RIGHT * np.cos(t * PI)

        for circle in circles:
            self.play(
                MoveAlongPath(circle, zigzag_path(circle, t)),
                run_time=3,
                rate_func=there_and_back
            )

        self.wait(1)
