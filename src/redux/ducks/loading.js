import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = 0;

export const { Types, Creators } = createActions({
    requestLoading: ['VALUE']
});

const request = (state = INITIAL_STATE, action) => action.VALUE;

export default createReducer(INITIAL_STATE, {
    [Types.REQUEST_LOADING]: request
});
