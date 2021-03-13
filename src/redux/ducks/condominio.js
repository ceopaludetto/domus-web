import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = {
    loading: false,
    success: false,
    failure: false,
    data: {}
};

export const { Types, Creators } = createActions({
    requestCondominio: [
        'COND_STR_NOME',
        'COND_STR_END',
        'COND_INT_APTOS',
        'COND_STR_CARAC',
        'COND_INT_ID',
        'MOR_INT_ID'
    ],
    requestCondominioToken: ['COND_INT_ID']
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
        TOKEN: action.data.TOKEN
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
    [Types.REQUEST_CONDOMINIO]: request,
    SUCCESS_CONDOMINIO: success,
    FAILURE_CONDOMINIO: failure,
    SUCCESS_CONDOMINIO_TOKEN: success
});
