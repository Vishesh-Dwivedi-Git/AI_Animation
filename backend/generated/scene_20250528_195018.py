from manim import config

config.pixel_height = 480
config.pixel_width = 854
config.frame_rate = 15

from manim import *

class BouncingCircles(Scene):
    def construct(self):
        circles = [Circle(radius=1, color=color) for color in [RED, GREEN, BLUE, YELLOW, PURPLE]]
        positions = [(-3, 0, 0), (-1.5, 0, 0), (0, 0, 0), (1.5, 0, 0), (3, 0, 0)]

        for i, circle in enumerate(circles):
            circle.move_to(positions[i])
            self.add(circle)

        def bounce(circle, direction, amplitude):
            circle.shift(direction * amplitude)

        directions = [RIGHT, LEFT, UP, DOWN, RIGHT + UP]
        amplitudes = [0.5, 0.5, 0.5, 0.5, 0.5]

        for i in range(30):
            for j, circle in enumerate(circles):
                bounce(circle, directions[j], amplitudes[j])
                self.wait(0.1)
                directions[j] = -directions[j]

        self.wait(1)
