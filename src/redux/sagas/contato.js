import { put, call } from 'redux-saga/effects';

import api from '../api';

export function* getContato(action) {
    const { CONT_STR_NOME, CONT_STR_EMAIL, CONT_STR_END, CONT_STR_DESC, CONT_INT_APTOS } = action;
    const res = yield call(api.post, '/contato', {
        CONT_STR_NOME,
        CONT_STR_EMAIL,
        CONT_STR_END,
        CONT_STR_DESC,
        CONT_INT_APTOS
    });
    if (res.ok) {
        yield put({
            type: 'SUCCESS_CONTATO',
            data: {
                CONTATO: res.data.CONTATO
            }
        });
    } else {
        yield put({
            type: 'FAILURE_CONTATO',
            data: {
                ERROR: res.data.error
            }
        });
    }
}
