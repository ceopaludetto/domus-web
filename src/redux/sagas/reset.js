import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { push } from 'connected-react-router';

import api from '../api';

export function* getReset(action) {
    const res = yield call(api.post, '/auth/reset', {
        MOR_STR_PSW: action.MOR_STR_PSW,
        TOKEN: action.MOR_STR_PSWTOKEN
    });
    if (res.ok) {
        yield put({
            type: 'SUCCESS_RESET',
            data: {}
        });
        yield delay(2000);
        yield put(push('/auth/login'));
    } else {
        yield put({
            type: 'FAILURE_RESET',
            data: {
                ERROR: res.data.error
            }
        });
    }
}
