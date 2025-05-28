from manim import config

config.pixel_height = 480
config.pixel_width = 854
config.frame_rate = 15

from manim import *

class BouncingCircles(Scene):
    def construct(self):
        circles = [Circle(radius=1, color=color) for color in [RED, GREEN, BLUE, YELLOW, PURPLE]]
        for circle in circles:
            self.play(FadeIn(circle))

        def get_zigzag_path(circle, amplitude, frequency):
            return lambda t: circle.get_center() + amplitude * RIGHT * np.sin(frequency * t) + amplitude * UP * np.cos(frequency * t)

        paths = [get_zigzag_path(circle, 2, 2 * PI) for circle in circles]

        for circle, path in zip(circles, paths):
            circle.add_updater(lambda m, dt: m.move_to(path(self.time)))

        self.wait(5)

        for circle in circles:
            circle.clear_updaters()
            self.play(FadeOut(circle))
