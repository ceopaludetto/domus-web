import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = {
    loading: false,
    loadingNew: false,
    success: false,
    successNew: false,
    failure: false,
    failureNew: false,
    data: {},
    posts: [],
    morador: {},
    moradores: []
};

export const { Types, Creators } = createActions({
    requestMoradorDelete: ['MORADORES', 'UNDO'],
    requestMoradorImage: ['FILE', 'NOME', 'MOR_INT_ID'],
    requestMoradorLoadPosts: ['MOR_INT_ID'],
    requestMoradorLoadId: ['MOR_INT_ID'],
    requestMoradorLoad: []
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
    moradores: [...action.data]
});

const loadFailure = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    failure: true,
    moradores: []
});

const loadIdSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    success: true,
    morador: { ...action.data }
});

const loadIdFailure = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    failure: true,
    morador: {}
});

const loadPostsSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    success: true,
    posts: [...action.data]
});

const loadPostsFailure = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    failure: true,
    posts: []
});

export default createReducer(INITIAL_STATE, {
    [Types.REQUEST_MORADOR_DELETE]: request,
    [Types.REQUEST_MORADOR_LOAD_POSTS]: load,
    [Types.REQUEST_MORADOR_LOAD_ID]: load,
    [Types.REQUEST_MORADOR_LOAD]: load,
    SUCCESS_MORADOR: success,
    FAILURE_MORADOR: failure,
    SUCCESS_MORADOR_LOAD: loadSuccess,
    FAILURE_MORADOR_LOAD: loadFailure,
    SUCCESS_MORADOR_ID_LOAD: loadIdSuccess,
    FAILURE_MORADOR_ID_LOAD: loadIdFailure,
    SUCCESS_MORADOR_POSTS_LOAD: loadPostsSuccess,
    FAILURE_MORADOR_POSTS_LOAD: loadPostsFailure
});
