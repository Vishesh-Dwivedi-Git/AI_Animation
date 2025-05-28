from manim import config

config.pixel_height = 480
config.pixel_width = 854
config.frame_rate = 15

from manim import *

class DancingPlane(Scene):
    def construct(self):
        plane = NumberPlane()

        self.play(Create(plane))

        self.play(
            Rotate(plane, angle=PI / 2, axis=UP, run_time=1),
            Rotate(plane, angle=PI / 2, axis=RIGHT, run_time=1),
            Rotate(plane, angle=PI / 2, axis=OUT, run_time=1),
        )

        self.wait(1)

        self.play(
            Rotate(plane, angle=-PI / 2, axis=UP, run_time=1),
            Rotate(plane, angle=-PI / 2, axis=RIGHT, run_time=1),
            Rotate(plane, angle=-PI / 2, axis=OUT, run_time=1),
        )

        self.wait(1)
