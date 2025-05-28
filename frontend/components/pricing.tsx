import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Pricing() {
  const plans = [
    {
      name: "free",
      price: "$0",
      description: "for testing and learning",
      features: [
        "5 animations/month",
        "basic styles only",
        "720p export quality",
        "community support",
        "watermarked exports",
      ],
      cta: "start_free",
    },
    {
      name: "creator",
      price: "$19",
      period: "/month",
      description: "for content creators",
      features: [
        "100 animations/month",
        "all animation styles",
        "1080p export quality",
        "priority support",
        "no watermarks",
        "custom style training",
      ],
      cta: "upgrade_now",
      popular: true,
    },
    {
      name: "studio",
      price: "$49",
      period: "/month",
      description: "for teams and studios",
      features: [
        "unlimited animations",
        "premium styles",
        "4k export quality",
        "24/7 support",
        "api access",
        "team collaboration",
      ],
      cta: "contact_sales",
    },
  ]

  return (
    <section id="pricing" className="py-24 bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">pricing()</h2>
          <p className="text-gray-400 text-lg">// transparent pricing for every use case</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`p-8 ${
                plan.popular ? "bg-green-500 text-black border-green-500" : "bg-gray-900 border-gray-800 text-white"
              } hover:border-green-500/50 transition-colors`}
            >
              <div className="text-center mb-8">
                <div className="text-xs mb-2 opacity-60">// {plan.description}</div>
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="opacity-60 ml-1">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-3 mb-8 text-sm">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <span className="mr-3">•</span>
                    <span className="opacity-80">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full font-mono text-sm ${
                  plan.popular
                    ? "bg-black text-green-400 hover:bg-gray-900"
                    : "bg-green-500 text-black hover:bg-green-400"
                }`}
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
