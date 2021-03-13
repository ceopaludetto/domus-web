import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = {
    loading: false,
    loadingNew: false,
    success: false,
    successNew: false,
    failure: false,
    failureNew: false,
    data: {},
    regras: []
};

export const { Types, Creators } = createActions({
    requestRegra: ['REG_STR_DESC', 'UNDO'],
    requestRegraEdit: ['REG_STR_DESC', 'REG_INT_ID', 'UNDO', 'OLD_REG_STR_DESC'],
    requestRegraDelete: ['REG_INT_ID', 'UNDO'],
    requestRegraLoad: []
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
    regras: [...action.data]
});

const loadFailure = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    failure: true,
    regras: []
});

export default createReducer(INITIAL_STATE, {
    [Types.REQUEST_REGRA]: request,
    [Types.REQUEST_REGRA_EDIT]: request,
    [Types.REQUEST_REGRA_DELETE]: request,
    [Types.REQUEST_REGRA_LOAD]: load,
    SUCCESS_REGRA: success,
    FAILURE_REGRA: failure,
    SUCCESS_REGRA_LOAD: loadSuccess,
    FAILURE_REGRA_LOAD: loadFailure
});
