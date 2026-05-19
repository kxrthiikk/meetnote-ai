export default function Sidebar() {
    return (
      <aside className="w-64 border-r border-zinc-800 p-4">
        <h1 className="text-2xl font-bold mb-8">
          MeetNote AI
        </h1>

        <nav className="space-y-2">
          <button className="w-full text-left px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800">
            Dashboard
          </button>

          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-zinc-800">
            Meetings
          </button>

          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-zinc-800">
            Settings
          </button>
        </nav>
      </aside>
    );
}