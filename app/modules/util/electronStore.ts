import Store from 'electron-store';

export const saveToStore = (name: string, value: any) => {
  const store = new Store<any>();
  store.set(name, value);
};

export const readStore = (name: string) => {
  const store = new Store<any>();
  return store.get(name);
};
