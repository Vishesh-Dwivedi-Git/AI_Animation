'use client'

import { usePrivy } from "@privy-io/react-auth"
import axios from "axios"
import { useEffect } from "react"

interface LoginModalProps {
  onClose: () => void
  login: () => void
}

export default function LoginModal({ onClose, login }: LoginModalProps) {
  const { user, authenticated, getAccessToken } = usePrivy()

  useEffect(() => {
    const authenticateWithBackend = async () => {
      if (authenticated && user) {
        try {
          const token = await getAccessToken()
          
          // 👇 Hit your backend endpoint with Privy access token
          await axios.post(
            "http://localhost:8000/api/auth/privy-login", // your backend endpoint
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )

          console.log("✅ Authenticated with backend")
          onClose() // close modal after success
        } catch (err) {
          console.error("❌ Backend auth failed", err)
        }
      }
    }

    authenticateWithBackend()
  }, [authenticated, user])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-xl bg-gray-900 p-6 border border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-white">Sign In to Animagic</h1>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sign-in Button */}
        <button
          onClick={login}
          className="w-full rounded-lg bg-green-500 px-4 py-3 text-black font-semibold font-mono transition-colors hover:bg-green-400"
        >
          login_user()
        </button>
      </div>
    </div>
  )
}
