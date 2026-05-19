import { useEffect, useState } from "react";
import TranscriptionCard from "./TranscriptionCard";
import type { Transcript } from "../types/transcript";

const fakeMessages = [
  {
    speaker: "Michael",
    text: "The backend deployment is almost done.",
  },
  {
    speaker: "Emma",
    text: "We should improve the dashboard analytics.",
  },
  {
    speaker: "David",
    text: "Let's finalize the API integration today.",
  },
];

export default function TranscriptPanel() {

    const [transcript, setTranscript] = useState<Transcript[]>([
        {
            speaker: "John",
            text: "We should improve onboarding flow.",
        },
        {
            speaker: "Sarah",
            text: "API latency issue still exists.",
        }
    ]);

    useEffect(() => {

        let currentIndex = 0;

        const interval = setInterval(() => {

            if (currentIndex >= fakeMessages.length) {
                clearInterval(interval);
                return;
            }

            const nextMessage = fakeMessages[currentIndex];

            if (!nextMessage) return;

            setTranscript((prev) => [
                ...prev,
                nextMessage
            ]);

            currentIndex++;

        }, 3000);

        return () => clearInterval(interval);

    }, []);

    return (
        <section className="w-[380px] border-l border-zinc-800 p-5">

            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>

                <h2 className="text-xl font-semibold">
                    Live Transcript
                </h2>
            </div>

            {/* Transcript List */}
            <div className="space-y-4">
                {transcript.map((line, index) => (
                    <TranscriptionCard
                        key={index}
                        speaker={line.speaker}
                        text={line.text}
                    />
                ))}
            </div>

        </section>
    );
}