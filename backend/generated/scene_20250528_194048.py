from manim import config

config.pixel_height = 480
config.pixel_width = 854
config.frame_rate = 15

from manim import *

class BouncingBalls(Scene):
    def construct(self):
        balls = [Dot(radius=0.5).shift(UP*i + LEFT*2.5) for i in range(5)]
        self.add(*balls)

        def get_path(ball, direction):
            return VGroup(
                Line(ball.get_center(), ball.get_center() + direction * RIGHT),
                Line(ball.get_center() + direction * RIGHT, ball.get_center() + direction * (RIGHT + DOWN)),
                Line(ball.get_center() + direction * (RIGHT + DOWN), ball.get_center() + direction * DOWN),
                Line(ball.get_center() + direction * DOWN, ball.get_center() + direction * (LEFT + DOWN)),
                Line(ball.get_center() + direction * (LEFT + DOWN), ball.get_center() + direction * LEFT),
                Line(ball.get_center() + direction * LEFT, ball.get_center() + direction * (LEFT + UP)),
                Line(ball.get_center() + direction * (LEFT + UP), ball.get_center() + direction * UP),
                Line(ball.get_center() + direction * UP, ball.get_center() + direction * (RIGHT + UP)),
            ).set_color(ball.get_color())

        paths = [get_path(ball, i) for i, ball in enumerate(balls)]

        for ball, path in zip(balls, paths):
            self.play(MoveAlongPath(ball, path), run_time=5)
