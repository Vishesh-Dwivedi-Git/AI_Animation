"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"
import { usePrivy } from "@privy-io/react-auth"
import LoginModal from "./auth/LoginModal"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  videoUrl?: string
  isLoading?: boolean
}

const themes = {
  anime: {
    run_time: 1,
    easing: "linear",
    transitions: ["FadeIn", "GrowFromCenter"],
    background_fx: "zoom_in",
    font: "Noto Sans JP",
  },
  cartoon: {
    run_time: 2,
    easing: "ease_in_out",
    transitions: ["BounceIn", "SpinIn"],
    background_fx: "pan_left",
    font: "Comic Sans MS",
  },
  minimalist: {
    run_time: 3,
    easing: "smooth",
    transitions: ["FadeIn"],
    background_fx: null,
    font: "Arial",
  },
  "sci-fi": {
    run_time: 1.2,
    easing: "ease_out",
    transitions: ["FadeIn", "ZoomIn"],
    background_fx: "matrix_scroll",
    font: "Orbitron",
  },
}

export function ChatInterface() {
  const { user, authenticated, getAccessToken, login, logout } = usePrivy()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<keyof typeof themes>("anime")
  const router = useRouter()

  useEffect(() => {
    if (authenticated && user) {
      const name =
        user.google?.name || user.github?.name || user.twitter?.name || user.email || "Unknown"
      setMessages([
        {
          id: crypto.randomUUID(),
          type: "ai",
          content: `Hello ${name}, select a theme and describe the animation you want to create.`,
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
      content: `${input} (Theme: ${selectedTheme})`,
    }

    const newAIPlaceholder: Message = {
      id: crypto.randomUUID(),
      type: "ai",
      content: "Generating your animation...",
      isLoading: true,
    }

    setMessages((prev) => [...prev, newUserMessage, newAIPlaceholder])
    setInput("")

    try {
      const accessToken = await getAccessToken()

      const res = await axios.post(
        "http://localhost:8000/generate",
        { prompt: input, theme: themes[selectedTheme] },
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
                content: `Here is your generated animation (Theme: ${selectedTheme}):`,
                isLoading: false,
                videoUrl,
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
                content: "Something went wrong. Please try again.",
                isLoading: false,
              }
            : msg
        )
      )
    } finally {
      setIsGenerating(false)
    }
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
    "Unknown"

  return (
    <div className="h-screen flex flex-col bg-gray-950">
      <div className="p-4 border-b border-gray-800 bg-gray-950 text-white text-sm font-mono flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div>User: {displayName} // {messages.length} messages</div>
          <Select value={selectedTheme} onValueChange={value => setSelectedTheme(value as keyof typeof themes)}>
            <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white font-mono text-sm">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-white font-mono text-sm">
              {Object.keys(themes).map((theme) => (
                <SelectItem key={theme} value={theme} className="capitalize">
                  {theme}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={async () => {
            await logout()
            router.push("/")
          }}
          className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-md text-xs font-mono"
        >
          Logout
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6 max-w-4xl mx-auto">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xl rounded-lg p-4 font-mono text-sm ${
                  msg.type === "user"
                    ? "bg-green-600 text-black"
                    : "bg-gray-900 text-white border border-gray-800"
                }`}
              >
                {msg.content}
                {msg.videoUrl && (
                  <div className="mt-4">
                    <video controls className="w-full max-w-md border border-gray-700 rounded-lg">
                      <source src={msg.videoUrl} type="video/mp4" />
                    </video>
                    <div className="flex gap-2 mt-2">
                      <a
                        href={msg.videoUrl}
                        download
                        className="text-xs text-green-400 hover:underline"
                      >
                        Download MP4
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-800 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <Textarea
            rows={3}
            placeholder="generate a moving circle ...."
            className="w-full bg-black border-gray-700 text-white placeholder-gray-500 font-mono text-sm resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <div className="flex justify-end mt-2">
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isGenerating}
              className="bg-green-600 text-black hover:bg-green-500 font-mono text-sm px-6"
            >
              {isGenerating ? "Generating..." : "generate"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}