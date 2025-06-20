'use client'

import { useState } from 'react'

import { HeroSection } from '@/components/hero-section'
import { HowItWorks } from '@/components/how-it-works'
import { Features } from '@/components/features'
import { ChatPreview } from '@/components/chat-preview'
import { Pricing } from '@/components/pricing'
import { Testimonials } from '@/components/testimonials'
import { FAQ } from '@/components/faq'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import LoginModal from '../components/auth/LoginModal'
import { usePrivy } from '@privy-io/react-auth'

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const { login } = usePrivy()

  return (
    <div className="min-h-screen bg-black text-gray-100 font-mono">
      <Navbar onLoginClick={() => setIsLoginOpen(true)} />

      <HeroSection onLoginClick={() => setIsLoginOpen(true)} />
      <HowItWorks />
      <Features />
      <ChatPreview onLoginClick={() => setIsLoginOpen(true)} />
      <Pricing onLoginClick={()=>setIsLoginOpen(true)} />
      <Testimonials />
      <FAQ />
      <Footer />

      {isLoginOpen && (
        <LoginModal
          login={() => {
            login()
            setIsLoginOpen(false)
          }}
          onClose={() => setIsLoginOpen(false)}
        />
      )}
    </div>
  )
}
