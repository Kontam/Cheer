export function mockInvoke(returnValue: any) {
  (window.electron.ipcRenderer.invoke as jest.Mock).mockReset();
  window.electron.ipcRenderer.invoke = jest.fn().mockResolvedValue(returnValue);
}
