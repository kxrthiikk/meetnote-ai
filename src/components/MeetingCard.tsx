
import type { Meeting } from "../types/meeting";

type MeetingCardProps = {
    title: string;
    time: string;
    transcriptReady?: boolean;
    summaryReady?: boolean;
    isSelected?: boolean;
};

export default function MeetingCard({
    title,
    time,
    transcriptReady,
    summaryReady,
    isSelected,
}: MeetingCardProps) {
    return (
        <div
            className={`
                    rounded-2xl p-5 border transition-all
                    ${isSelected
                    ? "bg-zinc-800 border-blue-500"
                    : "bg-zinc-900 border-zinc-800"
                }
                `}
        >
            <h3 className="text-xl font-medium">
                {title}
            </h3>

            <p className="text-zinc-400 mt-2">
                {time}
            </p>

            <div className="mt-4 flex gap-2">
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                    Transcript Ready
                </span>

                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                    Summary Generated
                </span>
            </div>
        </div>
    );
}