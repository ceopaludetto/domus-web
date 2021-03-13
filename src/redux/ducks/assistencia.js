import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = {
    loading: false,
    success: false,
    failure: false,
    data: {}
};

export const { Types, Creators } = createActions({
    requestAssistencia: ['AST_STR_TIT', 'AST_STR_DESC', 'AST_STR_TIPO']
});

const request = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: true
});

const success = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    success: true,
    data: {
        ASSISTENCIA: action.data.ASSISTENCIA
    }
});

const failure = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    failure: true,
    data: {
        ERROR: action.data.ERROR
    }
});

export default createReducer(INITIAL_STATE, {
    [Types.REQUEST_ASSISTENCIA]: request,
    SUCCESS_ASSISTENCIA: success,
    FAILURE_ASSISTENCIA: failure
});
