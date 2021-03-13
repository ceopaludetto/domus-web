import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = {
    loading: false,
    success: false,
    failure: false,
    data: {}
};

export const { Types, Creators } = createActions({
    requestForgot: ['MOR_STR_LGN']
});

const request = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: true
});

const success = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    success: true
});

const failure = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    failure: true,
    data: {
        ERROR: action.data.ERROR
    }
});

export default createReducer(INITIAL_STATE, {
    [Types.REQUEST_FORGOT]: request,
    SUCCESS_FORGOT: success,
    FAILURE_FORGOT: failure
});
