import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { makeToast } from '../../utils/toast';

import api from '../api';

export function* getDeleteMorador(action) {
    for (let i = 0; i < action.MORADORES.length; i++) {
        const res = yield call(api.delete, `/morador/${action.MORADORES[i]}`);
        if (res.ok) {
            yield put({
                type: 'SUCCESS_MORADOR'
            });
            if (action.UNDO) {
                toast(
                    ({ closeToast }) =>
                        makeToast(
                            `Bloco removido!`,
                            action.UNDO(res.data.MORADOR.MOR_STR_NOME, res.data.MORADOR.MOR_INT_ID),
                            closeToast
                        ),
                    {
                        toastId: res.data.MORADOR.MOR_INT_ID
                    }
                );
            }
            yield put({
                type: 'REQUEST_MORADOR_LOAD'
            });
        } else {
            yield put({
                type: 'FAILURE_MORADOR',
                data: {
                    ERROR: res.data.error
                }
            });
        }
    }
}

export function* getMoradores(action) {
    const res = yield call(api.get, '/morador', {});
    if (res.ok) {
        yield put({
            type: 'SUCCESS_MORADOR_LOAD',
            data: res.data.MORADORES
        });
    } else {
        yield put({
            type: 'FAILURE_MORADOR_LOAD',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getMoradorId(action) {
    const res = yield call(api.get, `/morador/${action.MOR_INT_ID}`, {});
    if (res.ok) {
        yield put({
            type: 'SUCCESS_MORADOR_ID_LOAD',
            data: res.data.MORADOR
        });
    } else {
        yield put({
            type: 'FAILURE_MORADOR_ID_LOAD',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getMoradorPosts(action) {
    const res = yield call(api.get, `/post/morador/${action.MOR_INT_ID}`, {});
    if (res.ok) {
        yield put({
            type: 'SUCCESS_MORADOR_POSTS_LOAD',
            data: res.data.POSTS
        });
    } else {
        yield put({
            type: 'FAILURE_MORADOR_POSTS_LOAD',
            data: {
                ERROR: res.data.error
            }
        });
    }
}
