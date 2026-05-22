"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { API_URL } from "@/lib/api"

export default function LoginPage() {

  const router = useRouter()

  const [username, setUsername] =
    useState("")

  const [password, setPassword] =
    useState("")

  async function handleLogin(
    e: React.FormEvent
  ) {

    e.preventDefault()

    const response = await fetch(
      `${API_URL}/login`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          username,
          password
        })
      }
    )

    const data = await response.json()

    if (data.access_token) {

      localStorage.setItem(
        "token",
        data.access_token
      )

      router.push("/admin")

    } else {

      alert("Login inválido")

    }
  }

  return (

    <main className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="bg-zinc-800 p-8 rounded-2xl w-full max-w-md"
      >

        <h1 className="text-4xl font-bold mb-8">
          Login
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="w-full p-3 rounded-xl bg-zinc-900"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-3 rounded-xl bg-zinc-900"
          />

          <button
            className="w-full bg-green-500 hover:bg-green-600 transition p-3 rounded-xl font-bold"
          >
            Login
          </button>

        </div>

      </form>

    </main>
  )
}