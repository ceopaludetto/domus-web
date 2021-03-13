import { put, call } from 'redux-saga/effects';

import api from '../api';

export function* getNewVoto(action) {
    const res = yield call(api.post, '/voto', {
        VOT_INT_ID: action.VOT_INT_ID,
        VOTO_BIT_OPCAO: action.VOTO_BIT_OPCAO
    });
    if (res.ok) {
        yield put({
            type: 'SUCCESS_VOTO'
        });
        yield put({
            type: 'REQUEST_VOTACAO_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_VOTO',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getEditVoto(action) {
    const res = yield call(api.put, `/voto/${action.VOTO_INT_ID}`, {
        VOTO_BIT_OPCAO: action.VOTO_BIT_OPCAO
    });
    if (res.ok) {
        yield put({
            type: 'SUCCESS_VOTO'
        });
        yield put({
            type: 'REQUEST_VOTACAO_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_VOTO',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getDeleteVoto(action) {
    const res = yield call(api.delete, `/voto/${action.VOTO_INT_ID}`);
    if (res.ok) {
        yield put({
            type: 'SUCCESS_VOTO'
        });
        yield put({
            type: 'REQUEST_VOTACAO_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_VOTO',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getVotos(action) {
    const res = yield call(api.get, '/voto/morador', {});
    if (res.ok) {
        yield put({
            type: 'SUCCESS_VOTO_LOAD',
            data: res.data.VOTOS
        });
    } else {
        yield put({
            type: 'FAILURE_VOTO_LOAD',
            data: {
                ERROR: res.data.error
            }
        });
    }
}
