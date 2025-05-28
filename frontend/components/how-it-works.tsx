import { Card } from "@/components/ui/card"

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "input_prompt()",
      description: "describe your animation scene in natural language",
    },
    {
      step: "02",
      title: "select_style()",
      description: "choose from anime, cartoon, realistic, or custom styles",
    },
    {
      step: "03",
      title: "export_animation()",
      description: "download as mp4, gif, or webm in seconds",
    },
  ]

  return (
    <section className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">how_it_works()</h2>
          <p className="text-gray-400 text-lg">// three simple steps to create animations</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-gray-800 p-8 hover:border-green-500/50 transition-colors"
            >
              <div className="text-xs text-gray-500 mb-4">// step {step.step}</div>
              <h3 className="text-xl font-bold mb-4 text-white">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
