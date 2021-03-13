import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = {
    loading: false,
    success: false,
    failure: false,
    data: {}
};

export const { Types, Creators } = createActions({
    requestRegister: ['CONDOMINIO', 'MORADOR', 'TOKEN']
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
        MORADOR: action.data.MORADOR
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
    [Types.REQUEST_REGISTER]: request,
    SUCCESS_REGISTER: success,
    FAILURE_REGISTER: failure
});
