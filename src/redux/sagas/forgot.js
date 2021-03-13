import { put, call } from 'redux-saga/effects';

import api from '../api';

export function* getForgot(action) {
    const res = yield call(api.post, '/auth/forgot', {
        MOR_STR_LGN: action.MOR_STR_LGN
    });
    if (res.ok) {
        yield put({
            type: 'SUCCESS_FORGOT',
            data: {}
        });
    } else {
        yield put({
            type: 'FAILURE_FORGOT',
            data: {
                ERROR: res.data.error
            }
        });
    }
}
