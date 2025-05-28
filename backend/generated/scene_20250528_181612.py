from manim import *

class BouncingBalls(Scene):
    def construct(self):
        colors = [RED, GREEN, BLUE, YELLOW, PURPLE]
        balls = [Dot(color=color, radius=0.2).move_to(UP * 2 - RIGHT * i) for i, color in enumerate(colors)]

        for ball in balls:
            self.play(FadeIn(ball))

        for _ in range(5):
            for ball in balls:
                self.play(ball.animate.shift(DOWN * 3), rate_func=there_and_back, run_time=1)
                self.play(ball.animate.rotate(PI), run_time=0.5)
                self.play(ball.animate.shift(RIGHT * 2), rate_func=there_and_back, run_time=1)

        self.wait(1)