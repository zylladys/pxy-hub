import { API_URL } from "@/lib/api"

async function getCharacters() {

  const res = await fetch(
    `${API_URL}/characters`,
    {
      cache: "no-store"
    }
  )

  return res.json()
}

export default async function CharactersPage() {

  const characters = await getCharacters()

  return (

    <main className="min-h-screen bg-zinc-900 text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        Characters
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {characters.map((character: any) => (

          <a
            key={character.id}
            href={`/characters/${character.slug}`}
            className="bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700 hover:scale-[1.02] transition"
          >

            {character.image && (

              <img
                src={
                  character.image?.startsWith("http")
                    ? character.image
                    : `${API_URL}/${character.image}`
                }
                className="w-full h-80 object-cover"
              />

            )}

            <div className="p-5">

              <h2 className="text-3xl font-bold mb-2">
                {character.name}
              </h2>

              <p className="text-zinc-400">
                {character.universe}
              </p>

            </div>

          </a>

        ))}

      </div>

    </main>
  )
}