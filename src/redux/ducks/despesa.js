import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = {
    loading: false,
    loadingNew: false,
    success: false,
    successNew: false,
    failure: false,
    failureNew: false,
    data: {},
    despesas: []
};

export const { Types, Creators } = createActions({
    requestDespesa: ['DESP_STR_DESC', 'DESP_NM_VAL', 'UNDO'],
    requestDespesaEdit: ['DESP_STR_DESC', 'DESP_NM_VAL', 'DESP_INT_ID', 'UNDO', 'OLD_DESP_STR_DESC', 'OLD_DESP_NM_VAL'],
    requestDespesaDelete: ['DESPESAS', 'UNDO'],
    requestDespesaLoad: []
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
    despesas: [...action.data]
});

const loadFailure = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    failure: true,
    despesas: []
});

export default createReducer(INITIAL_STATE, {
    [Types.REQUEST_DESPESA]: request,
    [Types.REQUEST_DESPESA_EDIT]: request,
    [Types.REQUEST_DESPESA_DELETE]: request,
    [Types.REQUEST_DESPESA_LOAD]: load,
    SUCCESS_DESPESA: success,
    FAILURE_DESPESA: failure,
    SUCCESS_DESPESA_LOAD: loadSuccess,
    FAILURE_DESPESA_LOAD: loadFailure
});
