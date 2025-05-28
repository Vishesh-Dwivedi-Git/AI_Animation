from manim import config

config.pixel_height = 480
config.pixel_width = 854
config.frame_rate = 15

from manim import *

class DancingWomen(Scene):
    def construct(self):
        women = SVGMobject("path_to_woman_svg_file").scale(0.5).move_to(ORIGIN)

        def update_woman(mob, dt):
            mob.rotate(dt * 2 * PI)

        women.add_updater(update_woman)
        self.add(women)
        self.wait(5)
