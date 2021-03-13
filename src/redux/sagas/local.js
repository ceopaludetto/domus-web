import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { makeToast } from '../../utils/toast';

import api from '../api';

export function* getNewLocal(action) {
    const res = yield call(api.post, '/locais', {
        LOC_STR_NOME: action.LOC_STR_NOME,
        LOC_STR_DESC: action.LOC_STR_DESC,
        LOC_INT_QTDE: action.LOC_INT_QTDE
    });
    if (res.ok) {
        yield put({
            type: 'SUCCESS_LOCAL'
        });
        if (action.UNDO) {
            toast(
                ({ closeToast }) => makeToast(`Local adicionado!`, action.UNDO(res.data.LOCAL.LOC_INT_ID), closeToast),
                {
                    toastId: res.data.LOCAL.LOC_INT_ID
                }
            );
        }
        yield put({
            type: 'REQUEST_LOCAL_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_LOCAL',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getEditLocal(action) {
    const res = yield call(api.put, `/locais/${action.LOC_INT_ID}`, {
        LOC_STR_NOME: action.LOC_STR_NOME,
        LOC_STR_DESC: action.LOC_STR_DESC,
        LOC_INT_QTDE: action.LOC_INT_QTDE
    });
    if (res.ok) {
        yield put({
            type: 'SUCCESS_LOCAL'
        });
        if (action.UNDO) {
            toast(
                ({ closeToast }) =>
                    makeToast(
                        `Local editado!`,
                        action.UNDO(
                            action.OLD_LOC_STR_NOME,
                            action.OLD_LOC_STR_DESC,
                            action.OLD_LOC_INT_QTDE,
                            res.data.LOCAL.LOC_INT_ID
                        ),
                        closeToast
                    ),
                {
                    toastId: res.data.LOCAL.LOC_INT_ID
                }
            );
        }
        yield put({
            type: 'REQUEST_LOCAL_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_LOCAL',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getDeleteLocal(action) {
    for (let i = 0; i < action.LOCAIS.length; i++) {
        const res = yield call(api.delete, `/locais/${action.LOCAIS[i]}`);
        if (res.ok) {
            yield put({
                type: 'SUCCESS_LOCAL'
            });
            if (action.UNDO) {
                toast(
                    ({ closeToast }) =>
                        makeToast(
                            `Local removido!`,
                            action.UNDO(
                                res.data.LOCAL.LOC_STR_NOME,
                                res.data.LOCAL.LOC_STR_DESC,
                                res.data.LOCAL.LOC_INT_QTDE,
                                res.data.LOCAL.LOC_INT_ID
                            ),
                            closeToast
                        ),
                    {
                        toastId: res.data.LOCAL.LOC_INT_ID
                    }
                );
            }
            yield put({
                type: 'REQUEST_LOCAL_LOAD'
            });
        } else {
            yield put({
                type: 'FAILURE_LOCAL',
                data: {
                    ERROR: res.data.error
                }
            });
        }
    }
}

export function* getLocais(action) {
    const res = yield call(api.get, '/locais', {});
    if (res.ok) {
        yield put({
            type: 'SUCCESS_LOCAL_LOAD',
            data: res.data.LOCAIS
        });
    } else {
        yield put({
            type: 'FAILURE_LOCAL_LOAD',
            data: {
                ERROR: res.data.error
            }
        });
    }
}
