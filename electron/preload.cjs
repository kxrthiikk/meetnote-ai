const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {

    onActiveWindow: (callback) => {
        ipcRenderer.on("active-window", (_, data) => {
            callback(data);
        });
    },

    transcribeAudio: (audioPath) =>
            ipcRenderer.invoke(
                "transcribe-audio",
                audioPath
            ),

    saveAudioFile: (audioArray) =>
            ipcRenderer.invoke(
                "save-audio-file",
                audioArray
            ),
});