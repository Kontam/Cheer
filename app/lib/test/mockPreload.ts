import { ElectronHandler } from '../../preload';

export function mockPreload() {
  const value: ElectronHandler = {
    ipcRenderer: {
      send: jest.fn,
      on: jest.fn,
      invoke: jest.fn as any,
    },
  };
  Object.defineProperty(window, 'electron', {
    writable: true,
    value,
  });
}
