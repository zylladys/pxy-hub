import { API_URL } from "@/lib/api"

async function getCharacter(slug: string) {

  const res = await fetch(
    `${API_URL}/characters/${slug}`,
    {
      cache: "no-store"
    }
  )

  return res.json()
}

async function getGallery(id: number) {

  const res = await fetch(
    `${API_URL}/gallery/${id}`,
    {
      cache: "no-store"
    }
  )

  return res.json()
}

export default async function CharacterPage({
  params
}: any) {

  const character = await getCharacter(
    (await params).slug
  )

  const gallery = await getGallery(
    character.id
  )

  return (

    <main className="min-h-screen bg-zinc-900 text-white">

      {character.image && (

        <img
          src={`${API_URL}/${character.image}`}
          className="w-full h-[500px] object-cover"
        />

      )}

      <div className="p-10">

        <h1 className="text-6xl font-bold mb-4">
          {character.name}
        </h1>

        <p className="text-zinc-400 mb-10">
          {character.universe}
        </p>

        <div className="space-y-8 mb-16">

          <div>

            <h2 className="text-3xl font-bold mb-2">
              Description
            </h2>

            <p className="text-zinc-300">
              {character.description}
            </p>

          </div>

          <div>

            <h2 className="text-3xl font-bold mb-2">
              Personality
            </h2>

            <p className="text-zinc-300">
              {character.personality}
            </p>

          </div>

        </div>

        <div>

          <h2 className="text-4xl font-bold mb-8">
            Gallery
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {gallery.map((art: any) => (

              <div
                key={art.id}
                className="bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700"
              >

                <img
                  src={`${API_URL}/${art.image}`}
                  className="w-full h-72 object-cover"
                />

                <div className="p-4">

                  <h3 className="text-2xl font-bold mb-2">
                    {art.title}
                  </h3>

                  <p className="text-zinc-400">
                    {art.description}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </main>
  )
}