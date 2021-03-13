import { put, call } from 'redux-saga/effects';

import api from '../api';

export function* getNewPost(action) {
    const res = yield call(api.post, '/post', {
        POST_STR_DESC: action.POST_STR_DESC
    });
    if (res.ok) {
        yield put({
            type: 'SUCCESS_POST'
        });
        yield put({
            type: 'REQUEST_POST_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_POST',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getPosts(action) {
    const res = yield call(api.get, '/post', {});
    if (res.ok) {
        yield put({
            type: 'SUCCESS_POST_LOAD',
            data: res.data.POSTS
        });
    } else {
        yield put({
            type: 'FAILURE_POST_LOAD',
            data: {
                ERROR: res.data.error
            }
        });
    }
}
