import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = 'black';

export const { Types, Creators } = createActions({
    requestPrimary: [],
    requestBlack: [],
    requestWhite: []
});

const primary = (state = INITIAL_STATE, action) => 'primary';

const black = (state = INITIAL_STATE, action) => 'black';

const white = (state = INITIAL_STATE, action) => 'white';

export default createReducer(INITIAL_STATE, {
    [Types.REQUEST_PRIMARY]: primary,
    [Types.REQUEST_BLACK]: black,
    [Types.REQUEST_WHITE]: white
});
