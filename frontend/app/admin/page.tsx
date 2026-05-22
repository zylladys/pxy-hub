"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {

  const router = useRouter()

  useEffect(() => {

    const token =
      localStorage.getItem("token")

    if (!token) {
      router.push("/login")
    }

  }, [])

  return (

    <div>

      <h1 className="text-5xl font-bold mb-10">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <a
          href="/admin/characters"
          className="bg-zinc-800 p-8 rounded-2xl border border-zinc-700 hover:border-green-500 transition"
        >
          <h2 className="text-3xl font-bold mb-3">
            Characters
          </h2>

          <p className="text-zinc-400">
            Gerenciar personagens
          </p>
        </a>

        <a
          href="/admin/gallery"
          className="bg-zinc-800 p-8 rounded-2xl border border-zinc-700 hover:border-green-500 transition"
        >
          <h2 className="text-3xl font-bold mb-3">
            Gallery
          </h2>

          <p className="text-zinc-400">
            Gerenciar artes
          </p>
        </a>

        <a
          href="/admin/records"
          className="bg-zinc-800 p-8 rounded-2xl border border-zinc-700 hover:border-green-500 transition"
        >
          <h2 className="text-3xl font-bold mb-3">
            Records
          </h2>

          <p className="text-zinc-400">
            Gerenciar recordes
          </p>
        </a>

      </div>

    </div>
  )
}