"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"

interface Message {
  id: string
  type: "user" | "ai" | "system"
  content: string
  animation?: {
    style: string
    status: "generating" | "complete"
    preview?: string
  }
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      type: "ai",
      content: "Hello! Describe the animation you want to create, and I'll generate it for you.",
    },
  ])
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  const handleSend = () => {
    if (!input.trim() || isGenerating) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      type: "user",
      content: input,
    }

    const aiMessage: Message = {
      id: crypto.randomUUID(),
      type: "ai",
      content: `Generating animation: "${input}"`,
      animation: {
        style: "default", // Fallback style since selection is disabled
        status: "generating",
      },
    }

    setMessages((prev) => [...prev, userMessage, aiMessage])
    setInput("")
    setIsGenerating(true)

    const timeout = setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessage.id
            ? { ...msg, animation: { ...msg.animation!, status: "complete" } }
            : msg,
        ),
      )
      setIsGenerating(false)
    }, 3000)

    return () => clearTimeout(timeout)
  }

  const handleCancel = () => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.animation?.status === "generating"
          ? { ...msg, animation: { ...msg.animation, status: "complete" }, content: "Animation generation canceled." }
          : msg,
      ),
    )
    setIsGenerating(false)
  }

  const handleReset = () => {
    setIsResetting(true)
    setMessages([
      {
        id: crypto.randomUUID(),
        type: "ai",
        content: "New session started. What would you like to animate?",
      },
    ])
    setInput("")
    setTimeout(() => setIsResetting(false), 500)
  }

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-950">
      {/* Sidebar */}
      <div className="w-full md:w-80 md:min-w-[20rem] md:max-w-[24rem] bg-gray-950 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-lg font-bold text-white mb-4">animation_studio()</h2>
          <Button
            className="w-full bg-green-600 text-black hover:bg-green-500 font-mono text-sm transition-colors"
            onClick={handleReset}
            disabled={isResetting}
            aria-label="Start new session"
          >
            {isResetting ? "Resetting..." : "new_session"}
          </Button>
        </div>

        <div className="p-4 border-b border-gray-800">
          <div className="text-xs text-gray-400 mb-3">// animation style</div>
          <div className="text-gray-400 font-mono text-sm">Coming Soon</div>
        </div>

        <div className="flex-1 p-4 border-b border-gray-800">
          <div className="text-xs text-gray-400 mb-3">// recent animations</div>
          <div className="text-gray-400 font-mono text-sm">Coming Soon</div>
        </div>

        <div className="p-4 border-t border-gray-800">
          <div className="text-xs text-gray-400 mb-3">// navigation</div>
          <div className="space-y-2">
            <a href="/" className="block text-gray-400 hover:text-green-500 transition-colors text-sm">
              ← back_to_home
            </a>
            <a href="#" className="block text-gray-400 hover:text-green-500 transition-colors text-sm">
              settings
            </a>
            <a href="#" className="block text-gray-400 hover:text-green-500 transition-colors text-sm">
              help
            </a>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-800 bg-gray-950">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div>
              <h1 className="text-xl font-bold text-white">chat_interface</h1>
              <div className="text-sm text-gray-400">status: {isGenerating ? "generating" : "ready"}</div>
            </div>
            <div className="text-xs text-gray-400">// {messages.length} messages</div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-2xl ${message.type === "user" ? "order-2" : "order-1"}`}>
                  <div className="text-xs text-gray-400 mb-2">
                    // {message.type === "user" ? "user_input" : message.type === "ai" ? "ai_response" : "system"}
                  </div>
                  <div
                    className={`p-4 rounded-lg ${
                      message.type === "user"
                        ? "bg-green-600 text-black"
                        : "bg-gray-900 text-white border border-gray-800"
                    }`}
                  >
                    <div className="font-mono text-sm">{message.content}</div>

                    {message.animation && (
                      <div className="mt-4">
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-xs text-gray-400">animation_preview</div>
                            <div
                              className={`text-xs px-2 py-1 rounded ${
                                message.animation.status === "generating"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-green-500/20 text-green-400"
                              }`}
                            >
                              {message.animation.status}
                            </div>
                          </div>

                          <div className="bg-gray-700 h-48 rounded flex items-center justify-center mb-4">
                            {message.animation.status === "generating" ? (
                              <div className="text-center">
                                <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                                <div className="text-gray-400 text-xs">Generating animation...</div>
                              </div>
                            ) : (
                              <div className="text-center">
                                <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                                  <div className="text-green-400 text-2xl">▶</div>
                                </div>
                                <div className="text-gray-400 text-xs">Animation complete</div>
                              </div>
                            )}
                          </div>

                          {message.animation.status === "complete" && (
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-gray-600 text-gray-300 hover:bg-gray-700 font-mono text-xs"
                                aria-label="Regenerate animation"
                              >
                                regenerate
                              </Button>
                              <Button
                                size="sm"
                                className="bg-green-600 text-black hover:bg-green-500 font-mono text-xs"
                                aria-label="Download animation as MP4"
                              >
                                download_mp4
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-gray-600 text-gray-300 hover:bg-gray-700 font-mono text-xs"
                                aria-label="Export animation as GIF"
                              >
                                export_gif
                              </Button>
                            </div>
                          )}
                          {message.animation.status === "generating" && (
                            <Button
                              size="sm"
                              variant="destructive"
                              className="bg-red-600 text-white hover:bg-red-500 font-mono text-xs"
                              onClick={handleCancel}
                              aria-label="Cancel animation generation"
                            >
                              cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-3.5 border-t border-gray-800 bg-gray-950">
          <div className="max-w-4xl mx-auto">
            <div className="text-xs text-gray-400 mb-3">// describe your animation</div>
            <div className="flex space-x-4">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="A majestic dragon flying through stormy clouds at sunset..."
                className="flex-1 bg-black border-gray-700 text-white placeholder-gray-500 font-mono text-sm resize-none"
                rows={3}
                style={{ minHeight: "80px", maxHeight: "200px" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                aria-label="Describe your animation"
              />
              <div className="flex flex-col space-y-2">
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isGenerating}
                  className="bg-green-600 text-black hover:bg-green-500 font-mono text-sm px-6 transition-colors"
                  aria-label="Generate animation"
                >
                  {isGenerating ? "Generating..." : "generate"}
                </Button>
                <div className="text-xs text-gray-400 text-center">enter to send</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}