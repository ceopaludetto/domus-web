import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = {
    loading: false,
    loadingNew: false,
    success: false,
    successNew: false,
    failure: false,
    failureNew: false,
    data: {},
    blocos: []
};

export const { Types, Creators } = createActions({
    requestBloco: ['BLO_STR_NOME', 'UNDO'],
    requestBlocoEdit: ['BLO_STR_NOME', 'BLO_INT_ID', 'UNDO', 'OLD_BLO_STR_NOME'],
    requestBlocoDelete: ['BLOCOS', 'UNDO'],
    requestBlocoLoad: []
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
    blocos: [...action.data]
});

const loadFailure = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    failure: true,
    blocos: []
});

export default createReducer(INITIAL_STATE, {
    [Types.REQUEST_BLOCO]: request,
    [Types.REQUEST_BLOCO_EDIT]: request,
    [Types.REQUEST_BLOCO_DELETE]: request,
    [Types.REQUEST_BLOCO_LOAD]: load,
    SUCCESS_BLOCO: success,
    FAILURE_BLOCO: failure,
    SUCCESS_BLOCO_LOAD: loadSuccess,
    FAILURE_BLOCO_LOAD: loadFailure
});
