import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { Features } from "@/components/features"
import { ChatPreview } from "@/components/chat-preview"
import { Pricing } from "@/components/pricing"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-gray-100 font-mono">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <Features />
      <ChatPreview />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  )
}
