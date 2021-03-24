import { createAction } from 'redux-actions';

// storybookでelectronをimportするとエラーになる
// action, action creatorだけのファイルのまま維持する
export const QUIT_APP = 'QUIT_APP';
export const OPEN_PREFERENCE = 'OPEN_PREFERENCE';
export const CLOSE_WINDOW = 'CLOSE_WINDOW';

export const quitApp = createAction(QUIT_APP);
export const openPreference = createAction(OPEN_PREFERENCE);
export const closeWindow = createAction(CLOSE_WINDOW);
