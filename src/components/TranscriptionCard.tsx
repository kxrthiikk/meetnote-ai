
type TranscriptionCardProps = {
    speaker: string;
    text: string;
};

export default function TranscriptionCard({
    speaker,
    text,
}: TranscriptionCardProps) {
    return (
        <div className="space-y-5">
            <div>
                <p className="text-sm text-blue-400 mb-1">
                    {speaker}
                </p>
                <p className="text-zinc-300">
                    {text}
                </p>
            </div>
        </div>
    );
};