"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Message {
  id: string
  type: "user" | "ai"
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
      id: "1",
      type: "ai",
      content: "hello! describe the animation you want to create and i'll generate it for you.",
    },
  ])
  const [input, setInput] = useState("")
  const [selectedStyle, setSelectedStyle] = useState("anime")

  const animationHistory = [
    "sunset_fox_running.mp4",
    "dragon_flying_clouds.gif",
    "robot_walking_city.mp4",
    "cat_playing_yarn.gif",
  ]

  const styles = ["anime", "cartoon", "realistic", "motion_comic", "pixel_art", "watercolor"]

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
    }

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "ai",
      content: `generating ${selectedStyle} animation: "${input}"`,
      animation: {
        style: selectedStyle,
        status: "generating",
      },
    }

    setMessages((prev) => [...prev, userMessage, aiMessage])
    setInput("")

    // Simulate animation generation
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessage.id ? { ...msg, animation: { ...msg.animation!, status: "complete" } } : msg,
        ),
      )
    }, 3000)
  }

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-950 border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-lg font-bold text-white mb-4">animation_studio()</h2>
          <Button
            className="w-full bg-green-500 text-black hover:bg-green-400 font-mono text-sm"
            onClick={() =>
              setMessages([
                {
                  id: Date.now().toString(),
                  type: "ai",
                  content: "new session started. what would you like to animate?",
                },
              ])
            }
          >
            new_session
          </Button>
        </div>

        <div className="p-6 border-b border-gray-800">
          <div className="text-xs text-gray-500 mb-3">// animation style</div>
          <Select value={selectedStyle} onValueChange={setSelectedStyle}>
            <SelectTrigger className="bg-black border-gray-700 text-white font-mono">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-black border-gray-700">
              {styles.map((style) => (
                <SelectItem key={style} value={style} className="text-white font-mono">
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 p-6">
          <div className="text-xs text-gray-500 mb-3">// recent animations</div>
          <div className="space-y-2">
            {animationHistory.map((animation, index) => (
              <div
                key={index}
                className="p-3 bg-gray-900 border border-gray-800 rounded hover:border-green-500/50 cursor-pointer transition-colors"
              >
                <div className="text-white text-sm font-mono">{animation}</div>
                <div className="text-gray-400 text-xs">2 hours ago</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-800">
          <div className="text-xs text-gray-500 mb-3">// navigation</div>
          <div className="space-y-2">
            <a href="/" className="block text-gray-400 hover:text-green-400 transition-colors text-sm">
              ← back_to_home
            </a>
            <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors text-sm">
              settings
            </a>
            <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors text-sm">
              help
            </a>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 bg-gray-950">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">chat_interface</h1>
              <div className="text-sm text-gray-400">style: {selectedStyle} | status: ready</div>
            </div>
            <div className="text-xs text-gray-500">// {messages.length} messages</div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6 max-w-4xl">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-2xl ${message.type === "user" ? "order-2" : "order-1"}`}>
                  <div className="text-xs text-gray-500 mb-2">
                    // {message.type === "user" ? "user_input" : "ai_response"}
                  </div>
                  <div
                    className={`p-4 rounded-lg ${
                      message.type === "user"
                        ? "bg-green-500 text-black"
                        : "bg-gray-900 text-white border border-gray-800"
                    }`}
                  >
                    <div className="font-mono text-sm">{message.content}</div>

                    {message.animation && (
                      <div className="mt-4">
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-xs text-gray-400">animation_preview.{message.animation.style}</div>
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
                                <div className="text-gray-400 text-xs">generating...</div>
                              </div>
                            ) : (
                              <div className="text-center">
                                <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                                  <div className="text-green-400 text-2xl">▶</div>
                                </div>
                                <div className="text-gray-400 text-xs">animation_complete</div>
                              </div>
                            )}
                          </div>

                          {message.animation.status === "complete" && (
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-gray-600 text-gray-300 hover:bg-gray-700 font-mono text-xs"
                              >
                                regenerate
                              </Button>
                              <Button
                                size="sm"
                                className="bg-green-500 text-black hover:bg-green-400 font-mono text-xs"
                              >
                                download_mp4
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-gray-600 text-gray-300 hover:bg-gray-700 font-mono text-xs"
                              >
                                export_gif
                              </Button>
                            </div>
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
        <div className="p-6 border-t border-gray-800 bg-gray-950">
          <div className="max-w-4xl">
            <div className="text-xs text-gray-500 mb-3">// describe your animation</div>
            <div className="flex space-x-4">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="a majestic dragon flying through stormy clouds at sunset..."
                className="flex-1 bg-black border-gray-700 text-white placeholder-gray-500 font-mono text-sm resize-none"
                rows={3}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
              />
              <div className="flex flex-col space-y-2">
                <Button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="bg-green-500 text-black hover:bg-green-400 font-mono text-sm px-6"
                >
                  generate
                </Button>
                <div className="text-xs text-gray-500 text-center">enter to send</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
