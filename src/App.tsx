import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import MeetingsPanel from "./components/MeetingsPanel";
import TranscriptPanel from "./components/TranscriptPanel";

import { meetings as initialMeetings } from "./data/meeting";

import type { Meeting } from "./types/meeting";

const fakeMessages = [
    {
        speaker: "Michael",
        text: "Backend deployment is almost done.",
    },
    {
        speaker: "Emma",
        text: "Dashboard analytics need improvements.",
    },
    {
        speaker: "David",
        text: "API integration will finish today.",
    },
];

export default function App() {

    const [meetings, setMeetings] = useState<Meeting[]>(initialMeetings);

    const [selectedMeetingId, setSelectedMeetingId] = useState(
        initialMeetings[0].id
    );

    const selectedMeeting = meetings.find(
        (meeting) => meeting.id === selectedMeetingId
    );

    useEffect(() => {

        let currentIndex = 0;

        const interval = setInterval(() => {

            if (currentIndex >= fakeMessages.length) {
                clearInterval(interval);
                return;
            }

            const nextMessage = fakeMessages[currentIndex];

            setMeetings((prevMeetings) => {

                return prevMeetings.map((meeting) => {

                    if (meeting.id !== selectedMeetingId) {
                        return meeting;
                    }

                    return {
                        ...meeting,

                        transcript: [
                            ...meeting.transcript,
                            nextMessage,
                        ],
                    };
                });
            });

            currentIndex++;

        }, 3000);

        return () => clearInterval(interval);

    }, [selectedMeetingId]);

    if (!selectedMeeting) {
        return null;
    }

    return (
        <div className="h-screen bg-zinc-950 text-white flex">

            <Sidebar />

            <MeetingsPanel
                meetings={meetings}
                selectedMeeting={selectedMeeting}
                setSelectedMeeting={(meeting) =>
                    setSelectedMeetingId(meeting.id)
                }
            />

            <TranscriptPanel
                meeting={selectedMeeting}
            />

        </div>
    );
}