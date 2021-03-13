import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = {
    loading: false,
    success: false,
    failure: false,
    data: {}
};

export const { Types, Creators } = createActions({
    requestContato: ['CONT_STR_NOME', 'CONT_STR_EMAIL', 'CONT_STR_END', 'CONT_STR_DESC', 'CONT_INT_APTOS']
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
        CONTATO: action.data.CONTATO
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
    [Types.REQUEST_CONTATO]: request,
    SUCCESS_CONTATO: success,
    FAILURE_CONTATO: failure
});
