import { Card } from "@/components/ui/card"

export function Features() {
  const features = [
    {
      title: "ai_engine",
      description: "state-of-the-art models trained on millions of frames",
    },
    {
      title: "multi_styles",
      description: "anime, cartoon, realistic, motion comic variations",
    },
    {
      title: "instant_preview",
      description: "real-time generation with lightning-fast processing",
    },
    {
      title: "export_formats",
      description: "mp4, gif, webm optimized for any platform",
    },
    {
      title: "prompt_editing",
      description: "iterate and refine with simple text modifications",
    },
    {
      title: "always_available",
      description: "24/7 generation service with unlimited access",
    },
  ]

  return (
    <section id="features" className="py-24 bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">features()</h2>
          <p className="text-gray-400 text-lg">// everything you need for ai animation</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-black border-gray-800 p-6 hover:border-green-500/50 transition-colors">
              <h3 className="text-lg font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
