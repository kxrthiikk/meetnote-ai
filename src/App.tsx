import Sidebar from "./components/Sidebar";
import MeetingsPanel from "./components/MeetingsPanel";
import TranscriptPanel from "./components/TranscriptPanel";

export default function App() {
  return (
    <div className="h-screen bg-zinc-950 text-white flex">
        <Sidebar />
        <MeetingsPanel />
        <TranscriptPanel />
    </div>
  );
}