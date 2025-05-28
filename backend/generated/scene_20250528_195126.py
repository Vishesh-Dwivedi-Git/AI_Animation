from manim import config

config.pixel_height = 480
config.pixel_width = 854
config.frame_rate = 15

from manim import *

class BouncingCircles(Scene):
    def construct(self):
        circles = [Circle(radius=1, color=color) for color in [RED, GREEN, BLUE, YELLOW, PURPLE]]
        for i, circle in enumerate(circles):
            circle.shift(RIGHT * (i + 1) * 2)
            self.add(circle)

        def zigzag_bounce(circle, direction):
            return [
                circle.animate.shift(UP * 2).set_duration(1),
                circle.animate.shift(direction * 2).set_duration(1),
                circle.animate.shift(DOWN * 2).set_duration(1),
                circle.animate.shift(direction * -2).set_duration(1),
            ]

        directions = [LEFT, RIGHT]
        animations = []
        for circle in circles:
            direction = directions[0] if circles.index(circle) % 2 == 0 else directions[1]
            animations.extend(zigzag_bounce(circle, direction))

        self.play(*animations, run_time=29)
