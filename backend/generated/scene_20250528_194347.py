from manim import config

config.pixel_height = 480
config.pixel_width = 854
config.frame_rate = 15

from manim import *

class BouncingCircles(Scene):
    def construct(self):
        circles = [Circle(radius=0.8, color=BLUE).shift(RIGHT * i * 2) for i in range(5)]

        for circle in circles:
            self.play(FadeIn(circle))

        def zigzag(circle, duration=2):
            return AnimationGroup(
                circle.animate(run_time=duration).shift(UP * 2).shift(LEFT * 2),
                circle.animate(run_time=duration).shift(DOWN * 2).shift(RIGHT * 2),
                circle.animate(run_time=duration).shift(UP * 2).shift(LEFT * 2),
                circle.animate(run_time=duration).shift(DOWN * 2).shift(RIGHT * 2),
                lag_ratio=0.5
            )

        while True:
            self.play(*[zigzag(circle) for circle in circles], run_time=2)
