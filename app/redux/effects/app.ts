import { createAction } from 'redux-actions';

// storybookでelectronをimportするとエラーになる
// action, action creatorだけのファイルのまま維持する
export const QUIT_APP = 'QUIT_APP';
export const OPEN_PREFERENCE = 'OPEN_PREFERENCE';
export const CLOSE_WINDOW = 'CLOSE_WINDOW';
export const MAKE_WATCH_WINDOW = 'MAKE_WATCH_WINDOW';
export const MAKE_GENERAL_WINDOW = 'MAKE_GENERAL_WINDOW';
export const MAKE_LIST_WINDOW = 'MAKE_LIST_WINDOW ';
export const MAKE_UN_CLICKABLE_WINDOW = 'MAKE_UN_CLICKABLE_WINDOW ';
export const MAKE_CLICKABLE_WINDOW = 'MAKE_CLICKABLE_WINDOW';

export const quitApp = createAction(QUIT_APP);
export const openPreference = createAction(OPEN_PREFERENCE);
export const closeWindow = createAction(CLOSE_WINDOW);
export const makeWatchWindow = createAction(MAKE_WATCH_WINDOW);
export const makeGeneralWindow = createAction(MAKE_GENERAL_WINDOW);
export const makeListWindow = createAction(MAKE_LIST_WINDOW);
export const makeUnClickableWindow = createAction(MAKE_UN_CLICKABLE_WINDOW);
export const makeClickableWindow = createAction(MAKE_CLICKABLE_WINDOW);
