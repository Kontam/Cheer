import { createAction } from 'redux-actions';

export const MAKE_WATCH_WINDOW = 'MAKE_WATCH_WINDOW';
export const MAKE_GENERAL_WINDOW = 'MAKE_GENERAL_WINDOW';
export const MAKE_LIST_WINDOW = 'MAKE_LIST_WINDOW';

export const makeWatchWindow = createAction(MAKE_WATCH_WINDOW);
export const makeGeneralWindow = createAction(MAKE_GENERAL_WINDOW);
export const makeListWindow = createAction(MAKE_LIST_WINDOW);
