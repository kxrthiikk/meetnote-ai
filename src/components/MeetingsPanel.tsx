import MeetingCard from "./MeetingCard";

import type { Meeting } from "../types/meeting";

type MeetingsPanelProps = {
    meetings: Meeting[];

    selectedMeeting: Meeting;

    setSelectedMeeting: (meeting: Meeting) => void;
};

export default function MeetingsPanel({
    meetings,
    selectedMeeting,
    setSelectedMeeting,
}: MeetingsPanelProps) {

    return (
        <main className="flex-1 p-6 overflow-y-auto">

            <h2 className="text-3xl font-semibold mb-6">
                Recent Meetings
            </h2>

            <div className="space-y-4">

                {meetings.map((meeting) => (

                    <div
                        key={meeting.id}
                        onClick={() => setSelectedMeeting(meeting)}
                        className="cursor-pointer"
                    >
                        <MeetingCard
                            title={meeting.title}
                            time={meeting.time}
                            transcriptReady={meeting.transcriptReady}
                            summaryReady={meeting.summaryReady}
                            isSelected={selectedMeeting.id === meeting.id}
                        />
                    </div>

                ))}

            </div>

        </main>
    );
}