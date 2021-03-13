import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = {
    loading: false,
    loadingNew: false,
    success: false,
    successNew: false,
    failure: false,
    failureNew: false,
    data: {},
    votacoes: []
};

export const { Types, Creators } = createActions({
    requestVotacao: ['VOT_STR_TITULO', 'VOT_STR_DESC', 'UNDO'],
    requestVotacaoEdit: [
        'VOT_STR_TITULO',
        'VOT_STR_DESC',
        'VOT_INT_ID',
        'UNDO',
        'OLD_VOT_STR_TITULO',
        'OLD_VOT_STR_DESC'
    ],
    requestVotacaoDelete: ['VOT_INT_ID', 'UNDO'],
    requestVotacaoLoad: []
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
    votacoes: [...action.data]
});

const loadFailure = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    failure: true,
    votacoes: []
});

export default createReducer(INITIAL_STATE, {
    [Types.REQUEST_VOTACAO]: request,
    [Types.REQUEST_VOTACAO_EDIT]: request,
    [Types.REQUEST_VOTACAO_DELETE]: request,
    [Types.REQUEST_VOTACAO_LOAD]: load,
    SUCCESS_VOTACAO: success,
    FAILURE_VOTACAO: failure,
    SUCCESS_VOTACAO_LOAD: loadSuccess,
    FAILURE_VOTACAO_LOAD: loadFailure
});
