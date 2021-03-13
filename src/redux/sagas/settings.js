import { put, call } from 'redux-saga/effects';

import api from '../api';

export function* getSettings(action) {
    const res = yield call(api.put, `/morador/${action.MORADOR.MOR_INT_ID}`, {
        MOR_INT_PSWPORTA: action.MORADOR.MOR_INT_PSWPORTA,
        MOR_STR_CEL: action.MORADOR.MOR_STR_CEL,
        MOR_STR_NOME: action.MORADOR.MOR_STR_NOME
    });
    if (res.ok) {
        const reload = yield call(api.get, `/morador/${action.MORADOR.MOR_INT_ID}`);
        yield put({
            type: 'MORADOR_RELOAD',
            data: {
                MORADOR: reload.data.MORADOR
            }
        });
        yield put({
            type: 'SUCCESS_SETTINGS'
        });
        yield put({
            type: 'SUCCESS_LOGIN',
            data: {
                MORADOR: res.data.MORADOR
            }
        });
    } else {
        yield put({
            type: 'FAILURE_SETTINGS',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getSettingsPass(action) {
    const res = yield call(api.put, `/morador/${action.MORADOR.MOR_INT_ID}`, {
        MOR_STR_PSW: action.MORADOR.MOR_STR_PSW,
        MOR_STR_OLDPSW: action.MORADOR.MOR_OLDPSW
    });
    if (res.ok) {
        yield put({
            type: 'SUCCESS_SETTINGS_PASS',
            data: {
                MORADOR: res.data.MORADOR
            }
        });
    } else {
        yield put({
            type: 'FAILURE_SETTINGS_PASS',
            data: {
                ERROR: res.data.error
            }
        });
    }
}
