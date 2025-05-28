from manim import config

config.pixel_height = 480
config.pixel_width = 854
config.frame_rate = 15

from manim import *

class DancingAeroplane(Scene):
    def construct(self):
        aeroplane = ImageMobject("aeroplane.png").scale(0.5)

        def update_aeroplane(aeroplane, dt):
            aeroplane.rotate(PI / 6 * dt)
            aeroplane.shift(RIGHT * dt)

        aeroplane.add_updater(update_aeroplane)
        self.add(aeroplane)
        self.wait(5)
