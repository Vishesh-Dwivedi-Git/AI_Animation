import { Card } from "@/components/ui/card"

export function Testimonials() {
  const testimonials = [
    {
      name: "sarah_chen",
      role: "content_creator",
      content: "revolutionized my workflow. animations in minutes instead of hours.",
    },
    {
      name: "marcus_rodriguez",
      role: "game_developer",
      content: "quality is incredible. like having a professional studio at my fingertips.",
    },
    {
      name: "emily_watson",
      role: "marketing_director",
      content: "social media engagement increased 300% after using animagic ai.",
    },
  ]

  return (
    <section className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">testimonials()</h2>
          <p className="text-gray-400 text-lg">// what users are saying</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-900 border-gray-800 p-6 hover:border-green-500/50 transition-colors">
              <div className="text-xs text-gray-500 mb-4">// review</div>
              <p className="text-gray-300 mb-6 text-sm leading-relaxed">"{testimonial.content}"</p>
              <div>
                <div className="text-white text-sm font-bold">{testimonial.name}</div>
                <div className="text-gray-400 text-xs">{testimonial.role}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
