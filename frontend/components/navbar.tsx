import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-white">[animagic.ai]</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="/chat" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
              chat
            </a>
            <a href="#features" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
              features
            </a>
            <a href="#pricing" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
              pricing
            </a>
            <a href="#faq" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
              faq
            </a>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-green-400 text-sm font-mono"
            >
              sign_in
            </Button>
            <Button className="bg-green-500 text-black hover:bg-green-400 text-sm font-mono">get_started</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
