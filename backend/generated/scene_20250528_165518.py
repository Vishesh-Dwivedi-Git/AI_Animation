
from manim import *

class BouncingCircle(Scene):
    def construct(self):
        circle = Circle(color=RED, fill_opacity=1)
        self.play(Create(circle))

        def update_circle(circle, dt):
            circle.acceleration = DOWN * 9.8
            circle.velocity += circle.acceleration * dt
            circle.shift(circle.velocity * dt)

            if circle.get_bottom()[1] < -3.5:
                circle.velocity[1] = -circle.velocity[1]

        circle.add_updater(update_circle)
        self.wait(5)
