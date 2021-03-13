import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = {
    loading: false,
    success: false,
    failure: false,
    data: {},
    messages: []
};

export const { Types, Creators } = createActions({
    requestMessage: ['TEXT', 'ID', 'DEST'],
    requestMessageLoad: ['DEST', 'ID']
});

const request = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: true
});

const success = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    success: true,
    messages: [...action.data]
});

const failure = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    failure: true,
    data: {
        ERROR: action.data.ERROR
    }
});

const successNew = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    success: true,
    messages: [...state.messages, ...action.data]
});

const failureNew = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    failure: true,
    data: {
        ERROR: action.data.ERROR
    }
});

export default createReducer(INITIAL_STATE, {
    [Types.REQUEST_MESSAGE]: request,
    [Types.REQUEST_MESSAGE_LOAD]: request,
    SUCCESS_MESSAGE: success,
    FAILURE_MESSAGE: failure,
    SUCCESS_MESSAGE_NEW: successNew,
    FAILURE_MESSAGE_NEW: failureNew
});
