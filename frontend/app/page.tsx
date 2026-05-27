import AddRecordForm from "@/components/AddRecordForm"
import { API_URL } from "@/lib/api"

async function getRecords() {
  const res = await fetch(
    `${API_URL}/records`,
    {
      cache: "no-store"
    }
  )

  return res.json()
}

export default async function Home() {

  const records = await getRecords()

  return (
    <main className="p-10 bg-zinc-900 min-h-screen text-white">

      <h1 className="text-5xl font-bold mb-10">
        Plague Inc Records
      </h1>

      <AddRecordForm />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {records.map((record: any) => (

          <div
            key={record.id}
            className="bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700"
          >

            {record.screenshot && (

              <img
                src={record.screenshot}
                alt="Screenshot"
                className="w-full h-64 object-cover"
              />

            )}

            <div className="p-5">

              <h2 className="text-3xl font-bold mb-2">
                {record.plague}
              </h2>

              <p className="text-zinc-300">
                Difficulty: {record.difficulty}
              </p>

              <p className="text-green-400 font-bold mt-2">
                Score: {record.score}
              </p>

            </div>

          </div>

        ))}

      </div>

    </main>
  )
}