import type { Transcript } from "./transcript";

export interface Meeting {
    id: number;
    title: string;
    time: string;
    transcriptReady: boolean;
    summaryReady: boolean;

    transcript: Transcript[];
}