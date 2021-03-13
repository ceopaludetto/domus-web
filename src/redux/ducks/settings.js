import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = {
    loading: false,
    loadingPass: false,
    success: false,
    successPass: false,
    failure: false,
    failurePass: false,
    data: {}
};

export const { Types, Creators } = createActions({
    requestSettings: ['MORADOR'],
    requestSettingsPass: ['MORADOR']
});

const request = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: true
});

const success = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    success: true,
    data: {}
});

const failure = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    failure: true,
    data: {
        ERROR: action.data.ERROR
    }
});

const requestPass = (state = INITIAL_STATE, action) => ({
    ...state,
    loadingPass: true
});

const successPass = (state = INITIAL_STATE, action) => ({
    ...state,
    loadingPass: false,
    successPass: true,
    data: {
        MORADOR: action.data.MORADOR
    }
});

const failurePass = (state = INITIAL_STATE, action) => ({
    ...state,
    loadingPass: false,
    failurePass: true,
    data: {
        ERROR: action.data.ERROR
    }
});

export default createReducer(INITIAL_STATE, {
    [Types.REQUEST_SETTINGS]: request,
    SUCCESS_SETTINGS: success,
    FAILURE_SETTINGS: failure,
    [Types.REQUEST_SETTINGS_PASS]: requestPass,
    SUCCESS_SETTINGS_PASS: successPass,
    FAILURE_SETTINGS_PASS: failurePass
});
