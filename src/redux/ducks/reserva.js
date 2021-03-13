import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = {
    loading: false,
    loadingNew: false,
    success: false,
    successNew: false,
    failure: false,
    failureNew: false,
    data: {},
    reservas: []
};

export const { Types, Creators } = createActions({
    requestReserva: ['RES_INT_QTDE', 'RES_DT_CMC', 'RES_DT_TER', 'LOC_INT_ID', 'UNDO'],
    requestReservaDelete: ['RESERVAS', 'UNDO'],
    requestReservaLoad: []
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
    reservas: [...action.data]
});

const loadFailure = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    failure: true,
    reservas: []
});

export default createReducer(INITIAL_STATE, {
    [Types.REQUEST_RESERVA]: request,
    [Types.REQUEST_RESERVA_DELETE]: request,
    [Types.REQUEST_RESERVA_LOAD]: load,
    SUCCESS_RESERVA: success,
    FAILURE_RESERVA: failure,
    SUCCESS_RESERVA_LOAD: loadSuccess,
    FAILURE_RESERVA_LOAD: loadFailure
});
