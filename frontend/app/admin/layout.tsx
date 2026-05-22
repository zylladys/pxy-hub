export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (

    <div className="min-h-screen bg-zinc-900 text-white flex">

      <aside className="w-72 bg-zinc-950 border-r border-zinc-800 p-6">

        <h1 className="text-3xl font-bold mb-10">
          PXY Admin
        </h1>

        <nav className="space-y-4">

          <a
            href="/admin"
            className="block hover:text-green-400"
          >
            Dashboard
          </a>

          <a
            href="/admin/characters"
            className="block hover:text-green-400"
          >
            Characters
          </a>

          <a
            href="/admin/gallery"
            className="block hover:text-green-400"
          >
            Gallery
          </a>

          <a
            href="/admin/records"
            className="block hover:text-green-400"
          >
            Records
          </a>

        </nav>

      </aside>

      <main className="flex-1 p-10">
        {children}
      </main>

    </div>
  )
}