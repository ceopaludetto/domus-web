import { put, call } from 'redux-saga/effects';

import api from '../api';

export function* getMessage(action) {
    if (action.data.OK) {
        yield put({
            type: 'SUCCESS_MESSAGE_NEW',
            data: [action.data.MENSAGEM]
        });
    } else {
        yield put({
            type: 'FAILURE_MESSAGE_NEW',
            data: action.data.ERROR
        });
    }
}

export function* getMessages(action) {
    const res = yield call(api.get, `/mensagem/${action.DEST}`);
    if (res.ok) {
        yield put({
            type: 'SUCCESS_MESSAGE',
            data: res.data.MENSAGENS
        });
    } else {
        yield put({
            type: 'FAILURE_MESSAGE',
            data: res.data.ERROR
        });
    }
}
