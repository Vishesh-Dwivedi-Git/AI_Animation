from manim import config

config.pixel_height = 480
config.pixel_width = 854
config.frame_rate = 15

from manim import *

class BouncingCircles(Scene):
    def construct(self):
        circles = [
            Circle(radius=1, color=RED, fill_opacity=1).shift(UP*2 + LEFT*2),
            Circle(radius=1, color=GREEN, fill_opacity=1).shift(UP*2),
            Circle(radius=1, color=BLUE, fill_opacity=1).shift(UP*2 + RIGHT*2),
            Circle(radius=1, color=YELLOW, fill_opacity=1).shift(DOWN*2 + LEFT*2),
            Circle(radius=1, color=PURPLE, fill_opacity=1).shift(DOWN*2 + RIGHT*2)
        ]

        for circle in circles:
            self.play(FadeIn(circle))

        def zigzag_path(circle, start_pos, end_pos, duration):
            return Succession(
                ApplyMethod(circle.shift, DOWN * 0.5, rate_func=there_and_back, run_time=duration/4),
                ApplyMethod(circle.shift, RIGHT * 0.5, rate_func=there_and_back, run_time=duration/4),
                ApplyMethod(circle.shift, UP * 0.5, rate_func=there_and_back, run_time=duration/4),
                ApplyMethod(circle.shift, LEFT * 0.5, rate_func=there_and_back, run_time=duration/4)
            )

        zigzag_animations = [
            zigzag_path(circle, circle.get_center(), circle.get_center(), 0.5)
            for circle in circles
        ]

        self.play(*zigzag_animations, run_time=30)
