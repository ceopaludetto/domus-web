import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = {
    loading: false,
    loadingNew: false,
    success: false,
    successNew: false,
    failure: false,
    failureNew: false,
    data: {},
    comunicados: []
};

export const { Types, Creators } = createActions({
    requestComunicado: ['COMU_STR_TIT', 'COMU_STR_DESC', 'UNDO'],
    requestComunicadoEdit: [
        'COMU_STR_TIT',
        'COMU_STR_DESC',
        'COMU_INT_ID',
        'UNDO',
        'OLD_COMU_STR_TIT',
        'OLD_COMU_STR_DESC'
    ],
    requestComunicadoDelete: ['COMU_INT_ID', 'UNDO'],
    requestComunicadoLoad: []
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
    comunicados: [...action.data]
});

const loadFailure = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    failure: true,
    comunicados: []
});

export default createReducer(INITIAL_STATE, {
    [Types.REQUEST_COMUNICADO]: request,
    [Types.REQUEST_COMUNICADO_EDIT]: request,
    [Types.REQUEST_COMUNICADO_DELETE]: request,
    [Types.REQUEST_COMUNICADO_LOAD]: load,
    SUCCESS_COMUNICADO: success,
    FAILURE_COMUNICADO: failure,
    SUCCESS_COMUNICADO_LOAD: loadSuccess,
    FAILURE_COMUNICADO_LOAD: loadFailure
});
