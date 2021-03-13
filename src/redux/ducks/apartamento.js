import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = {
    loading: false,
    loadingNew: false,
    success: false,
    successNew: false,
    failure: false,
    failureNew: false,
    data: {},
    apartamentos: []
};

export const { Types, Creators } = createActions({
    requestApartamento: ['APTO_INT_NUM', 'APTO_INT_AND', 'BLO_INT_ID', 'UNDO'],
    requestApartamentoGen: ['BLO_QTD', 'AND_QTD', 'APTO_QTD', 'BLOCOS'],
    requestApartamentoEdit: [
        'APTO_INT_NUM',
        'APTO_INT_AND',
        'BLO_INT_ID',
        'APTO_INT_ID',
        'UNDO',
        'OLD_APTO_INT_NUM',
        'OLD_APTO_INT_AND',
        'OLD_BLO_INT_ID'
    ],
    requestApartamentoDelete: ['APARTAMENTOS', 'UNDO'],
    requestApartamentoLoad: []
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
    apartamentos: [...action.data]
});

const loadFailure = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    failure: true,
    apartamentos: []
});

export default createReducer(INITIAL_STATE, {
    [Types.REQUEST_APARTAMENTO]: request,
    [Types.REQUEST_APARTAMENTO_GEN]: request,
    [Types.REQUEST_APARTAMENTO_EDIT]: request,
    [Types.REQUEST_APARTAMENTO_DELETE]: request,
    [Types.REQUEST_APARTAMENTO_LOAD]: load,
    SUCCESS_APARTAMENTO: success,
    FAILURE_APARTAMENTO: failure,
    SUCCESS_APARTAMENTO_LOAD: loadSuccess,
    FAILURE_APARTAMENTO_LOAD: loadFailure
});
