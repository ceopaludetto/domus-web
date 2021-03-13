import { put, call } from 'redux-saga/effects';

import api from '../api';

export function* getCondominio(action) {
    const res = yield call(api.put, `/condominio/${action.COND_INT_ID}`, {
        COND_STR_NOME: action.COND_STR_NOME,
        COND_STR_END: action.COND_STR_END,
        COND_STR_CARAC: action.COND_STR_CARAC,
        COND_INT_APTOS: action.COND_INT_APTOS
    });
    if (res.ok) {
        const reload = yield call(api.get, `/morador/${action.MOR_INT_ID}`);
        yield put({
            type: 'MORADOR_RELOAD',
            data: {
                MORADOR: reload.data.MORADOR
            }
        });
        yield put({
            type: 'SUCCESS_CONDOMINIO'
        });
    } else {
        yield put({
            type: 'FAILURE_CONDOMINIO',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getCondominioToken(action) {
    const res = yield call(api.get, `/condominio/${action.COND_INT_ID}`);
    console.log(res);
    if (res.ok) {
        yield put({
            type: 'SUCCESS_CONDOMINIO_TOKEN',
            data: {
                TOKEN: res.data.TOKEN
            }
        });
    } else {
        yield put({
            type: 'FAILURE_CONDOMINIO',
            data: {
                ERROR: res.data.error
            }
        });
    }
}
