import { ElectronHandler } from '../../preload';

export function mockInvokeReset() {
  (window.electron.ipcRenderer.invoke as jest.Mock).mockReset();
}

export function mockInvoke(returnValue: any) {
  (window.electron.ipcRenderer.invoke as jest.Mock).mockReset();
  window.electron.ipcRenderer.invoke = jest.fn().mockResolvedValue(returnValue);
}

export function mockInvokeWithImplementation(
  fn: ElectronHandler['ipcRenderer']['invoke']
) {
  (window.electron.ipcRenderer.invoke as jest.Mock).mockReset();
  window.electron.ipcRenderer.invoke = jest.fn(fn);
}
