export {};

declare global {
    interface Window {
        electronAPI: {
            onActiveWindow: (
                callback: (data: any) => void
            ) => void;

            transcribeAudio: (
                audioPath: string
            ) => Promise<string>;

            saveAudioFile: (
                audioArray: number[]
            ) => Promise<string>;
        };
    }
}