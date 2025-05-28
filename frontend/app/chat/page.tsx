import { ChatInterface } from "@/components/chat-interface"
import { Navbar } from "@/components/navbar"

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-black text-gray-100 font-mono">
      <div className="pt-16">
        <ChatInterface />
      </div>
    </div>
  )
}
