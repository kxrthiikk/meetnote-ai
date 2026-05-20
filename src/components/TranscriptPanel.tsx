import TranscriptionCard from "./TranscriptionCard";
import type { Meeting } from "../types/meeting";
import { use, useEffect, useRef,  } from "react";

type TranscriptPanelProps = {
    meeting: Meeting;
}

export default function TranscriptPanel({
    meeting,
}: TranscriptPanelProps) {

    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({ 
            behavior: "smooth" 
        });
    }, [meeting.transcript]);

    return (
        <section className="w-[380px] border-l border-zinc-800 p-5 overflow-y-auto">

            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>

                <h2 className="text-xl font-semibold">
                    {meeting.title}
                </h2>
            </div>

            {/* Transcript List */}
            <div className="space-y-4">
                {meeting.transcript.map((line, index) => (
                    <TranscriptionCard
                        key={index}
                        speaker={line.speaker}
                        text={line.text}
                    />
                ))}
            </div>

            <div ref={bottomRef} />
        </section>
    );
}