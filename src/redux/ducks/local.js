import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = {
    loading: false,
    loadingNew: false,
    success: false,
    successNew: false,
    failure: false,
    failureNew: false,
    data: {},
    locais: []
};

export const { Types, Creators } = createActions({
    requestLocal: ['LOC_STR_NOME', 'LOC_STR_DESC', 'LOC_INT_QTDE', 'UNDO'],
    requestLocalEdit: [
        'LOC_STR_NOME',
        'LOC_STR_DESC',
        'LOC_INT_QTDE',
        'LOC_INT_ID',
        'UNDO',
        'OLD_LOC_STR_NOME',
        'OLD_LOC_STR_DESC',
        'OLD_LOC_INT_QTDE'
    ],
    requestLocalDelete: ['LOCAIS', 'UNDO'],
    requestLocalLoad: []
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
    locais: [...action.data]
});

const loadFailure = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    failure: true,
    locais: []
});

export default createReducer(INITIAL_STATE, {
    [Types.REQUEST_LOCAL]: request,
    [Types.REQUEST_LOCAL_EDIT]: request,
    [Types.REQUEST_LOCAL_DELETE]: request,
    [Types.REQUEST_LOCAL_LOAD]: load,
    SUCCESS_LOCAL: success,
    FAILURE_LOCAL: failure,
    SUCCESS_LOCAL_LOAD: loadSuccess,
    FAILURE_LOCAL_LOAD: loadFailure
});
