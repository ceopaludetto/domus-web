import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = {
    loading: false,
    loadingNew: false,
    success: false,
    successNew: false,
    failure: false,
    failureNew: false,
    data: {},
    visitas: []
};

export const { Types, Creators } = createActions({
    requestVisita: ['VSIT_STR_NOME', 'VSIT_DT_ENT', 'UNDO'],
    requestVisitaDelete: ['VISITAS', 'UNDO'],
    requestVisitaLoad: []
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
    visitas: [...action.data]
});

const loadFailure = (state = INITIAL_STATE, action) => ({
    ...state,
    loading: false,
    failure: true,
    visitas: []
});

export default createReducer(INITIAL_STATE, {
    [Types.REQUEST_VISITA]: request,
    [Types.REQUEST_VISITA_DELETE]: request,
    [Types.REQUEST_VISITA_LOAD]: load,
    SUCCESS_VISITA: success,
    FAILURE_VISITA: failure,
    SUCCESS_VISITA_LOAD: loadSuccess,
    FAILURE_VISITA_LOAD: loadFailure
});
