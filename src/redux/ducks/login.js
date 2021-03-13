import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = {
    loading: false,
    loadingToken: false,
    success: false,
    failure: false,
    failureToken: false,
    data: {}
};

export const { Types, Creators } = createActions({
    requestLogin: ['MOR_STR_LGN', 'MOR_STR_PSW'],
    requestLogout: []
});

const request = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: true
});

const requestToken = (state = INITIAL_STATE, action) => ({
    ...state,
    loadingToken: true
});

const success = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    loadingToken: false,
    success: true,
    data: {
        MORADOR: action.data.MORADOR
    }
});

const failure = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    failure: true,
    data: {
        ERROR: action.data.ERROR,
        ERROR_TYPE: action.data.ERROR_TYPE
    }
});

const failureToken = (state = INITIAL_STATE, action) => ({
    ...state,
    loadingToken: false,
    failureToken: true,
    data: {
        ERROR: action.data.ERROR
    }
});

const reload = (state = INITIAL_STATE, action) => ({
    ...state,
    data: {
        MORADOR: action.data.MORADOR
    }
});

const logout = (state = INITIAL_STATE, action) => INITIAL_STATE;

export default createReducer(INITIAL_STATE, {
    [Types.REQUEST_LOGIN]: request,
    REQUEST_LOGIN_TOKEN: requestToken,
    SUCCESS_LOGIN: success,
    SUCCESS_LOGIN_TOKEN: success,
    FAILURE_LOGIN: failure,
    FAILURE_LOGIN_TOKEN: failureToken,
    MORADOR_RELOAD: reload,
    RESET_LOGIN: logout
});
