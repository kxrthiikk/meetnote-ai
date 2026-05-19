import { useState } from "react";
import MeetingCard from "./MeetingCard";
import type { Meeting } from "../types/meeting";

export default function MeetingsPanel() {
    const [meetings, setMeetings] = useState<Meeting[]>([
        {
            id: 1,
            title: "Team Sync Meeting",
            time: "10:30 AM • 42 mins",
            transcriptReady: true,
            summaryReady: true,
        },
        {
            id: 2,
            title: "Product Discussion",
            time: "Yesterday • 1h 12m",
            transcriptReady: false,
            summaryReady: false,
        },
    ])

    return (
        <main className="flex-1 p-6 overflow-y-auto">
            <h2 className="text-3xl font-semibold mb-6">
                Recent Meetings
            </h2>

            <div className="space-y-4">
                {meetings.map((meeting) => (
                    <MeetingCard
                        key={meeting.id}
                        title={meeting.title}
                        time={meeting.time}
                        transcriptReady={meeting.transcriptReady}
                        summaryReady={meeting.summaryReady}
                    />
                ))}
            </div>
        </main>
    );
};