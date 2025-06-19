'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

interface NavbarProps {
  onLoginClick: () => void
}

export function Navbar({ onLoginClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'chat', href: '/chat' },
    { name: 'features', href: '#features' },
    { name: 'pricing', href: '#pricing' },
    { name: 'faq', href: '#faq' },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-white">[animagic.ai]</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-green-400 transition-colors text-sm"
              >
                {link.name}
              </a>
            ))}
            <Button
              onClick={onLoginClick}
              className="bg-green-500 text-black hover:bg-green-400 text-sm font-mono"
            >
              get_started
            </Button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white transition">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-4 px-4 pb-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-gray-300 hover:text-green-400 text-sm"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button
              onClick={() => {
                setIsOpen(false)
                onLoginClick()
              }}
              className="w-full bg-green-500 text-black hover:bg-green-400 text-sm font-mono"
            >
              get_started
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
