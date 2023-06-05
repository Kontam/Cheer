const { contextBridge, ipcRenderer } = require('electron');

const electronHandler = {
  ipcRenderer: {
    send(channel: string, ...args: any[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: string, func: (...args: any) => void) {
      ipcRenderer.on(channel, func);
      return () => {
        ipcRenderer.removeListener(channel, func);
      };
    },
    invoke(channel: string, ...args: any[]) {
      return ipcRenderer.invoke(channel, ...args);
    },
  },
};

export type ElectronHandler = typeof electronHandler;

contextBridge.exposeInMainWorld('electron', electronHandler);
contextBridge.exposeInMainWorld('node', {
  process,
});
