import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = {
    loading: false,
    loadingNew: false,
    success: false,
    successNew: false,
    failure: false,
    failureNew: false,
    data: {},
    funcionarios: []
};

export const { Types, Creators } = createActions({
    requestFuncionario: ['FUNC_STR_NOME', 'FUNC_STR_CEL', 'FUNC_STR_CARGO', 'FUNC_STR_EMPR', 'UNDO'],
    requestFuncionarioEdit: [
        'FUNC_STR_NOME',
        'FUNC_STR_CEL',
        'FUNC_STR_CARGO',
        'FUNC_STR_EMPR',
        'FUNC_INT_ID',
        'UNDO',
        'OLD_FUNC_STR_NOME',
        'OLD_FUNC_STR_CEL',
        'OLD_FUNC_STR_CARGO',
        'OLD_FUNC_STR_EMPR'
    ],
    requestFuncionarioDelete: ['FUNCIONARIOS', 'UNDO'],
    requestFuncionarioLoad: []
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
    funcionarios: [...action.data]
});

const loadFailure = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    failure: true,
    funcionarios: []
});

export default createReducer(INITIAL_STATE, {
    [Types.REQUEST_FUNCIONARIO]: request,
    [Types.REQUEST_FUNCIONARIO_EDIT]: request,
    [Types.REQUEST_FUNCIONARIO_DELETE]: request,
    [Types.REQUEST_FUNCIONARIO_LOAD]: load,
    SUCCESS_FUNCIONARIO: success,
    FAILURE_FUNCIONARIO: failure,
    SUCCESS_FUNCIONARIO_LOAD: loadSuccess,
    FAILURE_FUNCIONARIO_LOAD: loadFailure
});
