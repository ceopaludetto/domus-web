import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = {
    loading: false,
    loadingNew: false,
    success: false,
    successNew: false,
    failure: false,
    failureNew: false,
    data: {},
    posts: []
};

export const { Types, Creators } = createActions({
    requestPost: ['POST_STR_DESC'],
    requestPostLoad: []
});

const request = (state = INITIAL_STATE, action) => ({
    ...state,
    loadingNew: true
});

const success = (state = INITIAL_STATE, action) => ({
    ...state,
    loadingNew: false,
    successNew: true
});

const failure = (state = INITIAL_STATE, action) => ({
    ...state,
    loadingNew: false,
    failureNew: true,
    data: {
        ERROR: action.data.ERROR
    }
});

const load = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: true
});

const loadSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    success: true,
    posts: [...action.data]
});

const loadFailure = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    failure: true,
    posts: []
});

export default createReducer(INITIAL_STATE, {
    [Types.REQUEST_POST]: request,
    [Types.REQUEST_POST_LOAD]: load,
    SUCCESS_POST: success,
    FAILURE_POST: failure,
    SUCCESS_POST_LOAD: loadSuccess,
    FAILURE_POST_LOAD: loadFailure
});
