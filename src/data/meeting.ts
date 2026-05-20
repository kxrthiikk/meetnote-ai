import type { Meeting } from "../types/meeting";

export const meetings: Meeting[] = [
    {
        id: 1,
        title: "Team Sync Meeting",
        time: "10:30 AM • 42 mins",
        transcriptReady: true,
        summaryReady: true,

        transcript: [
            {
                speaker: "John",
                text: "We should improve onboarding flow.",
            },
            {
                speaker: "Sarah",
                text: "API latency issue still exists.",
            },
        ],
    },

    {
        id: 2,
        title: "Product Discussion",
        time: "Yesterday • 1h 12m",
        transcriptReady: true,
        summaryReady: false,

        transcript: [
            {
                speaker: "Emma",
                text: "Dashboard analytics need improvements.",
            },
            {
                speaker: "David",
                text: "API integration will finish today.",
            },
        ],
    },
];