// REQUIRING THE Operating aSystem


const os = require("os");
const { contextBridge, ipcRenderer } = require("electron");
const MY_APP ={
    cpuInfo: os.cpus()
}

contextBridge.exposeInMainWorld("myCPU", MY_APP);

contextBridge.exposeInMainWorld ("api",
    { hello: "HELLO YOUR API fucker...I finally got it \n" +
    "well I think... "}
)


ipcRenderer.send("msg", "hello from renderer PROCESS");

