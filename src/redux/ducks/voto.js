import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = {
    loading: false,
    loadingNew: false,
    success: false,
    successNew: false,
    failure: false,
    failureNew: false,
    data: {},
    votos: []
};

export const { Types, Creators } = createActions({
    requestVoto: ['VOT_INT_ID', 'VOTO_BIT_OPCAO'],
    requestVotoEdit: ['VOTO_INT_ID', 'VOTO_BIT_OPCAO'],
    requestVotoDelete: ['VOTO_INT_ID'],
    requestVotoLoad: []
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
    votos: [...action.data]
});

const loadFailure = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    failure: true,
    votos: []
});

export default createReducer(INITIAL_STATE, {
    [Types.REQUEST_VOTO]: request,
    [Types.REQUEST_VOTO_EDIT]: request,
    [Types.REQUEST_VOTO_DELETE]: request,
    [Types.REQUEST_VOTO_LOAD]: load,
    SUCCESS_VOTO: success,
    FAILURE_VOTO: failure,
    SUCCESS_VOTO_LOAD: loadSuccess,
    FAILURE_VOTO_LOAD: loadFailure
});
