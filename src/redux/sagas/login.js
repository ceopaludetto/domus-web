import { put, call } from 'redux-saga/effects';

import api from '../api';

function saveToken(TOKEN) {
    localStorage.setItem('@DOMUS:TOKEN', TOKEN);
}

export function* getLogin(action) {
    const res = yield call(api.post, '/auth/login', {
        MOR_STR_LGN: action.MOR_STR_LGN,
        MOR_STR_PSW: action.MOR_STR_PSW
    });
    if (res.ok) {
        yield call(saveToken, res.data.TOKEN);
        yield put({
            type: 'SUCCESS_LOGIN',
            data: {
                MORADOR: res.data.MORADOR
            }
        });
    } else {
        yield put({
            type: 'FAILURE_LOGIN',
            data: {
                ERROR: res.data.error,
                ERROR_TYPE: res.data.errorType
            }
        });
    }
}

export function* getLogout(action) {
    localStorage.removeItem('@DOMUS:TOKEN');
    localStorage.removeItem('@DOMUS:LIGHT');
    localStorage.removeItem('@DOMUS:THEME');
    yield put({
        type: 'RESET_LOGIN'
    });
}

export function* getLoginToken(action) {
    const res = yield call(api.post, '/auth/token', {});
    if (res.ok) {
        yield call(saveToken, res.data.TOKEN);
        yield put({
            type: 'SUCCESS_LOGIN_TOKEN',
            data: {
                MORADOR: res.data.MORADOR
            }
        });
    } else {
        yield put({
            type: 'FAILURE_LOGIN_TOKEN',
            data: {
                ERROR: res.data.error
            }
        });
    }
}
