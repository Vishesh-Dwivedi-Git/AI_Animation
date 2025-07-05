"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import axios from "axios"
import { usePrivy } from "@privy-io/react-auth"
import LoginModal from "./auth/LoginModal"
import { useRouter } from "next/navigation"
import { Bot, User, Download, Send, Loader2 } from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  videoUrl?: string
  isLoading?: boolean
  timestamp: Date
}

export function ChatInterface() {
  const { user, authenticated, getAccessToken, login, logout } = usePrivy()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (authenticated && user) {
      const name =
        user.google?.name || user.github?.name || user.twitter?.name || user.email || "User"
      setMessages([
        {
          id: crypto.randomUUID(),
          type: "ai",
          content: `👋 Hello ${name}! I'm your AI animation assistant. Describe the animation you want to create and I'll generate it for you.`,
          timestamp: new Date(),
        },
      ])
    }
  }, [authenticated, user])

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return
    setIsGenerating(true)

    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    const newAIPlaceholder: Message = {
      id: crypto.randomUUID(),
      type: "ai",
      content: "Generating your animation...",
      isLoading: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage, newAIPlaceholder])
    setInput("")

    try {
      const accessToken = await getAccessToken()

      const res = await axios.post(
        "http://localhost:8000/generate",
        { prompt: input },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      const videoUrl = res.data?.video_url || ""

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newAIPlaceholder.id
            ? {
                ...msg,
                content: "Here's your generated animation! 🎬",
                isLoading: false,
                videoUrl,
                timestamp: new Date(),
              }
            : msg
        )
      )
    } catch (err) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newAIPlaceholder.id
            ? {
                ...msg,
                content: "❌ Something went wrong. Please try again.",
                isLoading: false,
                timestamp: new Date(),
              }
            : msg
        )
      )
    } finally {
      setIsGenerating(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (!authenticated) {
    return <LoginModal onClose={() => window.location.href = "/"} login={() => login()} />
  }

  const displayName =
    user?.google?.name ||
    user?.github?.name ||
    user?.twitter?.name ||
    (typeof user?.email === "string"
      ? user?.email
      : typeof user?.email === "object" && user?.email !== null && "address" in user.email
      ? (user.email as { address: string }).address
      : undefined) ||
    "User"

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8 border-2 border-emerald-400">
            <AvatarFallback className="bg-emerald-600 text-white text-xs">
              <Bot className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-white font-semibold">AI Animation Studio</h1>
            <p className="text-slate-400 text-sm">Create stunning animations with AI</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-slate-700 text-slate-200">
            {displayName}
          </Badge>
          <Badge variant="outline" className="border-slate-600 text-slate-300">
            {messages.length} messages
          </Badge>
          <Button
            onClick={async () => {
              await logout()
              router.push("/")
            }}
            variant="destructive"
            size="sm"
            className="bg-red-600 hover:bg-red-500"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 relative overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="p-4 space-y-6 max-w-4xl mx-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-4 ${
                  msg.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                {/* Avatar */}
                <Avatar className="w-8 h-8 flex-shrink-0 border-2 border-slate-600">
                  <AvatarFallback className={`text-white text-xs ${
                    msg.type === "user" ? "bg-emerald-600" : "bg-slate-700"
                  }`}>
                    {msg.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>

                {/* Message Content */}
                <div className={`flex-1 max-w-2xl ${msg.type === "user" ? "text-right" : ""}`}>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs text-slate-400 font-medium">
                      {msg.type === "user" ? "You" : "AI Assistant"}
                    </span>
                    <span className="text-xs text-slate-500">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                  
                  <Card className={`p-4 ${
                    msg.type === "user"
                      ? "bg-emerald-600 text-white border-emerald-500"
                      : "bg-slate-800 text-slate-100 border-slate-700"
                  }`}>
                    {msg.isLoading ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">{msg.content}</span>
                      </div>
                    ) : (
                      <div className="text-sm leading-relaxed">
                        {msg.content}
                      </div>
                    )}
                    
                    {msg.videoUrl && (
                      <div className="mt-4 space-y-3">
                        <Separator className="bg-slate-600" />
                        <div className="rounded-lg overflow-hidden bg-slate-900 border border-slate-700">
                          <video 
                            controls 
                            className="w-full h-auto"
                            style={{ maxHeight: '300px' }}
                          >
                            <source src={msg.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                        <div className="flex justify-center">
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
                          >
                            <a href={msg.videoUrl} download>
                              <Download className="w-4 h-4 mr-2" />
                              Download MP4
                            </a>
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            ))}
            
            {/* Auto-scroll target */}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Textarea
              placeholder="Describe your animation... (e.g., 'generate a moving circle converting square')"
              className="w-full bg-slate-800 border-slate-600 text-white placeholder-slate-400 resize-none pr-12 min-h-[80px] focus:border-emerald-400 focus:ring-emerald-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isGenerating}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isGenerating}
              className="absolute bottom-2 right-2 bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
              size="sm"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          
          <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span className={`${input.length > 500 ? 'text-red-400' : ''}`}>
              {input.length}/1000
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}