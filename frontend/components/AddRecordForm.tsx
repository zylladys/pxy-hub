"use client"

import { useState } from "react"

export default function AddRecordForm() {

  const [plague, setPlague] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [score, setScore] = useState("")
  const [screenshot, setScreenshot] = useState<File | null>(null)

  const [loading, setLoading] = useState(false)

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault()

    setLoading(true)

    const formData = new FormData()

    formData.append("plague", plague)
    formData.append("difficulty", difficulty)
    formData.append("score", score)

    if (screenshot) {
      formData.append(
        "screenshot",
        screenshot
      )
    }

    const response = await fetch(
      "http://127.0.0.1:8000/records",
      {
        method: "POST",

        headers: {
            Authorization:
            `Bearer ${localStorage.getItem("token")}`
        },

        body: formData
      }
    )

    if (response.ok) {

      alert("Recorde enviado!")

      window.location.reload()

    } else {

      alert("Erro ao enviar.")

    }

    setLoading(false)
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-zinc-800 p-6 rounded-2xl border border-zinc-700 mb-10"
    >

      <h2 className="text-3xl font-bold mb-6">
        Adicionar Recorde
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Praga"
          value={plague}
          onChange={(e) =>
            setPlague(e.target.value)
          }
          className="w-full p-3 rounded-xl bg-zinc-900"
        />

        <input
          type="text"
          placeholder="Dificuldade"
          value={difficulty}
          onChange={(e) =>
            setDifficulty(e.target.value)
          }
          className="w-full p-3 rounded-xl bg-zinc-900"
        />

        <input
          type="number"
          placeholder="Score"
          value={score}
          onChange={(e) =>
            setScore(e.target.value)
          }
          className="w-full p-3 rounded-xl bg-zinc-900"
        />

        <input
          type="file"
          onChange={(e) =>
            setScreenshot(
              e.target.files?.[0] || null
            )
          }
          className="w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-xl font-bold"
        >
          {loading
            ? "Enviando..."
            : "Salvar Recorde"}
        </button>

      </div>

    </form>
  )
}