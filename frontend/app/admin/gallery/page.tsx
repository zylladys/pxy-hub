"use client"

import { API_URL } from "@/lib/api"
import {
  useEffect,
  useState
} from "react"

export default function GalleryAdmin() {

  const [characters, setCharacters] =
    useState([])

  const [selectedCharacter, setSelectedCharacter] =
    useState("")

  const [title, setTitle] =
    useState("")

  const [description, setDescription] =
    useState("")

  const [image, setImage] =
    useState<File | null>(null)

  const [gallery, setGallery] =
    useState([])

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

    formData.append(
      "character_id",
      selectedCharacter
    )

    formData.append("title", title)

    formData.append(
      "description",
      description
    )

    if (image) {
      formData.append("image", image)
    }

    const response = await fetch(
      `${API_URL}/gallery`,
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

      alert("Art uploaded!")

    } else {

      alert("Error.")

    }
  }

  return (

    <div>

      <h1 className="text-5xl font-bold mb-10">
        Gallery Admin
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-6 rounded-2xl border border-zinc-700"
      >

        <div className="space-y-4">

          <select
            value={selectedCharacter}
            onChange={(e) => {

  setSelectedCharacter(
    e.target.value
  )

  loadGallery(
    e.target.value
  )

}}
            className="w-full p-3 rounded-xl bg-zinc-900"
          >

            <option value="">
              Select Character
            </option>

            {characters.map((character: any) => (

              <option
                key={character.id}
                value={character.id}
              >
                {character.name}
              </option>

            ))}

          </select>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
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
            Upload Art
          </button>

        </div>

      </form>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

  {gallery.map((art: any) => (

    <div
      key={art.id}
      className="bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700"
    >

      <img
        src={
          art.image?.startsWith("http")
            ? art.image
            : `${API_URL}/${art.image}`
        }
        className="w-full h-72 object-cover"
      />

      <div className="p-4">

        <h2 className="text-2xl font-bold mb-2">
          {art.title}
        </h2>

        <p className="text-zinc-400">
          {art.description}
        </p>

      </div>

    </div>

  ))}

</div>

    </div>
    
  )

  
async function loadGallery(
  characterId: string
) {

  if (!characterId) return

  const res = await fetch(
    `${API_URL}/gallery/${characterId}`
  )

  const data = await res.json()

  setGallery(data)
}
}
