"use client"

import { API_URL } from "@/lib/api"
import {
  useEffect,
  useState
} from "react"

export default function AdminCharacters() {

  const [characters, setCharacters] =
    useState([])

  const [name, setName] =
    useState("")

  const [slug, setSlug] =
    useState("")

  const [description, setDescription] =
    useState("")

  const [personality, setPersonality] =
    useState("")

  const [universe, setUniverse] =
    useState("")

  const [image, setImage] =
    useState<File | null>(null)

  async function loadCharacters() {

    const res = await fetch(
      `${API_URL}/characters`
    )

    const data = await res.json()

    setCharacters(data)
  }

  useEffect(() => {
    loadCharacters()
  }, [])

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault()

    const formData = new FormData()

    formData.append("name", name)
    formData.append("slug", slug)
    formData.append(
      "description",
      description
    )

    formData.append(
      "personality",
      personality
    )

    formData.append(
      "universe",
      universe
    )

    if (image) {
      formData.append("image", image)
    }

    const response = await fetch(
      `${API_URL}/characters`,
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

      alert("Character created!")

      loadCharacters()

    } else {

      alert("Error.")

    }
  }

  async function deleteCharacter(
  id: number
) {

  const confirmDelete =
    confirm(
      "Delete character?"
    )

  if (!confirmDelete) return

  const response = await fetch(
    `${API_URL}/characters/${id}`,
    {
      method: "DELETE",

      headers: {
        Authorization:
          `Bearer ${localStorage.getItem("token")}`
      }
    }
  )

  if (response.ok) {

    loadCharacters()

  } else {

    alert("Error deleting.")

  }
}

  return (

    <div>

      <h1 className="text-5xl font-bold mb-10">
        Characters
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-6 rounded-2xl border border-zinc-700 mb-10"
      >

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full p-3 rounded-xl bg-zinc-900"
          />

          <input
            type="text"
            placeholder="Slug"
            value={slug}
            onChange={(e) =>
              setSlug(e.target.value)
            }
            className="w-full p-3 rounded-xl bg-zinc-900"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full p-3 rounded-xl bg-zinc-900 h-32"
          />

          <textarea
            placeholder="Personality"
            value={personality}
            onChange={(e) =>
              setPersonality(
                e.target.value
              )
            }
            className="w-full p-3 rounded-xl bg-zinc-900 h-32"
          />

          <input
            type="text"
            placeholder="Universe"
            value={universe}
            onChange={(e) =>
              setUniverse(e.target.value)
            }
            className="w-full p-3 rounded-xl bg-zinc-900"
          />

          <input
            type="file"
            onChange={(e) =>
              setImage(
                e.target.files?.[0] || null
              )
            }
          />

          <button
            className="bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-xl font-bold"
          >
            Create Character
          </button>

        </div>

      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {characters.map((character: any) => (

          <div
            key={character.id}
            className="bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700"
          >

            {character.image && (

              <img
                src={
                  character.image?.startsWith("http")
                    ? character.image
                    : `${API_URL}/${character.image}`
                }
                className="w-full h-72 object-cover"
              />

            )}

            <div className="p-5">

              <h2 className="text-3xl font-bold mb-2">
                {character.name}
              </h2>

              <p className="text-zinc-400">
                {character.universe}
              </p>

              <button
  onClick={() =>
    deleteCharacter(
      character.id
    )
  }
  className="mt-4 bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-xl"
>
  Delete
</button>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}