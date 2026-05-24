const { app, BrowserWindow } = require("electron");
const { ipcMain } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const activeWin = async () => {

    const mod = await import("active-win");

    console.log("ACTIVE WIN MODULE:");
    console.log(mod);

    return mod.default();
};


function createWindow() {

    const win = new BrowserWindow({
        width: 1400,
        height: 900,

        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,

            preload: require("path").join(__dirname, "preload.cjs"),
        },
    });

    win.loadURL("http://localhost:5173");
}

app.whenReady().then(() => {
    createWindow();

    setInterval(async () => {

        try {

            console.log("CHECKING ACTIVE WINDOW");

            const windowInfo = await activeWin();

            console.log(windowInfo);

            const windows = BrowserWindow.getAllWindows();

            windows.forEach((win) => {

                if (!win || win.isDestroyed()) {
                    return;
                }

                win.webContents.send(
                    "active-window",
                    windowInfo
                );

            });

        } catch (error) {

            console.error(
                "ACTIVE WINDOW ERROR:"
            );

            console.error(error);

        }

    }, 3000);
});

ipcMain.handle(
    "transcribe-audio",

    async (_, audioPath) => {

        return new Promise(
            (resolve, reject) => {

                const pythonProcess =
                    spawn(
                        "py",
                        [
                            "python/transcribe.py",
                            audioPath,
                        ]
                    );

                let transcript = "";

                pythonProcess.stdout.on(
                    "data",
                    (data) => {

                        transcript +=
                            data.toString();

                    }
                );

                pythonProcess.stderr.on(
                    "data",
                    (data) => {

                        console.error(
                            "PYTHON ERROR:"
                        );

                        console.error(
                            data.toString()
                        );

                    }
                );

                pythonProcess.on(
                    "close",
                    () => {

                        resolve(
                            transcript
                        );

                    }
                );

            }
        );
    }
);

ipcMain.handle(
    "save-audio-file",

    async (_, audioArray) => {

        const audioPath =
            "meeting-recording.webm";

        const buffer =
            Buffer.from(audioArray);

        fs.writeFileSync(
            audioPath,
            buffer
        );

        return audioPath;
    }
);
