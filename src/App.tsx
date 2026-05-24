import { useRef, useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import MeetingsPanel from "./components/MeetingsPanel";
import TranscriptPanel from "./components/TranscriptPanel";

import { meetings as initialMeetings } from "./data/meeting";

import type { Meeting } from "./types/meeting";
import type { DetectedMeeting } from "./types/detectedMeeting";

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

    const [detectedMeeting, setDetectedMeeting] =
        useState<DetectedMeeting | null>(null);

    const [isRecording, setIsRecording] =
        useState(false);

    const [recordingSeconds, setRecordingSeconds] =
        useState(0);

    const selectedMeeting = meetings.find(
        (meeting) => meeting.id === selectedMeetingId
    );

    const mediaRecorderRef =
        useRef<MediaRecorder | null>(null);

    const audioChunksRef =
        useRef<Blob[]>([]);

    //Fake meeting transcript updates every 3 seconds
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

    //Detect active meeting window
    useEffect(() => {

        window.electronAPI.onActiveWindow((data) => {

            console.log("ACTIVE WINDOW:");

            console.log(data);

            const title = data?.title || "";

            const owner = data?.owner?.name || "";

            const isGoogleMeet =
                title.includes("Google Meet - Google Chrome");

            const isTeams =
                owner.includes("Teams");

            const isZoom =
                title.includes("Zoom");

            if (
                isGoogleMeet ||
                isTeams ||
                isZoom
            ) {

                setDetectedMeeting({
                    app: owner,
                    title,
                });

            } else {

                setDetectedMeeting(null);

            }

        });

    }, []);

    //Fake recording timer
    useEffect(() => {
        if (!isRecording) {
            return;
        }

        const interval = setInterval(() => {
            setRecordingSeconds((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isRecording]);

    if (!selectedMeeting) {
        return null;
    }

    const formattedTime = new Date(
        recordingSeconds * 1000
    )
        .toISOString()
        .slice(11, 19);


    const startRecording = async () => {

        try {

            console.log("Requesting microphone access...");

            const stream =
                await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });

            console.log("Microphone stream granted");

            const mediaRecorder =
                new MediaRecorder(stream);

            mediaRecorderRef.current =
                mediaRecorder;

            audioChunksRef.current = [];

            mediaRecorder.onstart = () => {

                console.log("MediaRecorder started");

            };

            mediaRecorder.ondataavailable = (event) => {

                console.log("CHUNK RECEIVED");

                console.log(event.data);

                console.log("Chunk size:");

                console.log(event.data.size);

                if (event.data.size > 0) {

                    audioChunksRef.current.push(
                        event.data
                    );

                }

            };

            mediaRecorder.onerror = (event) => {

                console.error(
                    "MediaRecorder error:"
                );

                console.error(event);

            };

            mediaRecorder.onstop = async () => {

                console.log("Recording stopped");

                const audioBlob = new Blob(
                    audioChunksRef.current,
                    {
                        type: "audio/webm",
                    }
                );

                const audioFile = new File(
                    [audioBlob],
                    "meeting-recording.webm",
                    {
                        type: "audio/webm",
                    }
                );

                const arrayBuffer =
                    await audioFile.arrayBuffer();

                const uint8Array =
                    new Uint8Array(arrayBuffer);

                const savedPath =
                    await window.electronAPI
                        .saveAudioFile(
                            Array.from(uint8Array)
                        );

                console.log(savedPath);

                console.log(
                    "Audio saved locally"
                );

                const transcript =
                    await window.electronAPI
                        .transcribeAudio(
                            "meeting-recording.webm"
                        );

                console.log(
                    "TRANSCRIPT:"
                );

                console.log(transcript);

                setMeetings((prevMeetings) => {

                    return prevMeetings.map((meeting) => {

                        if (meeting.id !== selectedMeetingId) {
                            return meeting;
                        }

                        return {
                            ...meeting,

                            transcript: [
                                ...meeting.transcript,

                                {
                                    speaker: "AI Transcript",
                                    text: transcript,
                                },
                            ],
                        };
                    });
                });
            };

            mediaRecorder.start(1000);

            console.log("Recorder state:");

            console.log(mediaRecorder.state);

            setIsRecording(true);

            setRecordingSeconds(0);

        } catch (error) {

            console.error(
                "Microphone access denied or failed:"
            );

            console.error(error);

        }

    };

    const stopRecording = () => {

        const mediaRecorder =
            mediaRecorderRef.current;

        if (!mediaRecorder) {

            console.log("No recorder found");

            return;

        }

        console.log("Stopping recorder...");

        mediaRecorder.stop();

        setIsRecording(false);

    };

    return (
        <div className="h-screen bg-zinc-950 text-white flex">

            <Sidebar />

            {
                detectedMeeting && (

                    <div
                        className="
                            fixed
                            bottom-6
                            right-6
                            w-[320px]
                            bg-zinc-900
                            border
                            border-zinc-700
                            rounded-2xl
                            p-5
                            shadow-2xl
                            z-50
                        "
                    >

                        <p className="text-sm text-zinc-400">
                            Meeting Detected
                        </p>

                        <h3 className="text-lg font-semibold mt-1">
                            {detectedMeeting.title}
                        </h3>

                        <p className="text-sm text-zinc-500 mt-1">
                            {detectedMeeting.app}
                        </p>

                        <button
                            onClick={startRecording}

                            className="
                                mt-4
                                w-full
                                bg-violet-600
                                hover:bg-violet-500
                                transition
                                rounded-xl
                                py-3
                                font-medium
                            "
                        >
                            Start AI Notes
                        </button>

                    </div>
                )
            }

            {
                isRecording && (

                    <div
                        className="
                            fixed
                            top-6
                            right-6
                            bg-red-600
                            px-5
                            py-3
                            rounded-2xl
                            shadow-2xl
                            flex
                            items-center
                            gap-3
                            z-50
                        "
                    >

                        <div
                            className="
                                w-3
                                h-3
                                bg-white
                                rounded-full
                                animate-pulse
                            "
                        />

                        <span className="font-medium">
                            Recording...
                        </span>

                        <span className="font-mono">
                            {formattedTime}
                        </span>

                        <button
                            onClick={stopRecording}
                            className="
                                ml-3
                                bg-black/20
                                px-3
                                py-1
                                rounded-lg
                                text-sm
                            "
                        >
                            Stop
                        </button>

                    </div>
                )
            }

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