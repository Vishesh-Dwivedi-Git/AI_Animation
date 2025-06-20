import { Button } from '@/components/ui/button'

interface HeroSectionProps {
  onLoginClick: () => void
}

export function HeroSection({ onLoginClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="inline-block bg-gray-900 border border-gray-700 rounded px-3 py-1 mb-8">
            <span className="text-xs text-gray-400">// powered by ai</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
          <span className="text-white">generate_2d_animations()</span>
          <br />
          <span className="text-gray-400">from_text_prompts</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          describe your scene → ai creates animation → export as mp4/gif
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-green-500 text-black hover:bg-green-400 px-8 py-3 font-mono"
            onClick={onLoginClick}
          >
            start_creating
          </Button>
          <a
            href="#preview"
            className=" bg-white rounded-md border-gray-600 text-black hover:bg-gray-800 hover:border-green-500 hover:text-green-400 px-8 py-2.5 font-mono"
          >
            view_demo
          </a>
        </div>

        <div className="mt-16 text-s text-gray-500">
          <span>// signup required for generate_2d_animations</span>
        </div>
      </div>
    </section>
  )
}
