import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      question: "how_does_it_work()",
      answer:
        "our ai models are trained on millions of animation frames. describe your scene, choose a style, and get high-quality 2d animation in seconds.",
    },
    {
      question: "what_styles_available()",
      answer:
        "anime, cartoon, realistic, motion comic, pixel art, watercolor, and more. pro users can train custom styles.",
    },
    {
      question: "export_formats()",
      answer: "mp4, gif, and webm formats. quality ranges from 720p to 4k depending on your plan.",
    },
    {
      question: "free_trial()",
      answer:
        "yes. free tier includes 5 animations per month with basic styles and 720p quality. no credit card required.",
    },
    {
      question: "commercial_usage()",
      answer: "all animations are yours to use commercially. paid plans remove watermarks and provide full rights.",
    },
    {
      question: "generation_time()",
      answer: "most animations generate within 30-60 seconds. pro users get priority processing.",
    },
  ]

  return (
    <section id="faq" className="py-24 bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">faq()</h2>
          <p className="text-gray-400 text-lg">// frequently asked questions</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-black border border-gray-800 rounded px-6 hover:border-green-500/50 transition-colors"
            >
              <AccordionTrigger className="text-white hover:text-green-400 text-left font-mono">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 text-sm leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
