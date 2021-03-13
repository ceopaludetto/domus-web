import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { makeToast } from '../../utils/toast';

import api from '../api';

export function* getNewDespesa(action) {
    const res = yield call(api.post, '/despesas', {
        DESP_STR_DESC: action.DESP_STR_DESC,
        DESP_NM_VAL: action.DESP_NM_VAL
    });
    console.log(res);
    if (res.ok) {
        yield put({
            type: 'SUCCESS_DESPESA'
        });
        if (action.UNDO) {
            toast(
                ({ closeToast }) =>
                    makeToast(`Despesa adicionada!`, action.UNDO(res.data.DESPESA.DESP_INT_ID), closeToast),
                {
                    toastId: res.data.DESPESA.DESP_INT_ID
                }
            );
        }
        yield put({
            type: 'REQUEST_DESPESA_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_DESPESA',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getEditDespesa(action) {
    const res = yield call(api.put, `/despesas/${action.DESP_INT_ID}`, {
        DESP_STR_DESC: action.DESP_STR_DESC,
        DESP_NM_VAL: action.DESP_NM_VAL
    });
    if (res.ok) {
        yield put({
            type: 'SUCCESS_DESPESA'
        });
        if (action.UNDO) {
            toast(
                ({ closeToast }) =>
                    makeToast(
                        `Despesa editada!`,
                        action.UNDO(action.OLD_DESP_STR_DESC, action.OLD_DESP_NM_VAL, res.data.DESPESA.DESP_INT_ID),
                        closeToast
                    ),
                {
                    toastId: res.data.DESPESA.DESP_INT_ID
                }
            );
        }
        yield put({
            type: 'REQUEST_DESPESA_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_DESPESA',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getDeleteDespesa(action) {
    for (let i = 0; i < action.DESPESAS.length; i++) {
        const res = yield call(api.delete, `/despesas/${action.DESPESAS[i]}`);
        if (res.ok) {
            yield put({
                type: 'SUCCESS_DESPESA'
            });
            if (action.UNDO) {
                toast(
                    ({ closeToast }) =>
                        makeToast(
                            `Despesa removida!`,
                            action.UNDO(
                                res.data.DESPESA.DESP_STR_DESC,
                                res.data.DESPESA.DESP_NM_VAL,
                                res.data.DESPESA.DESP_INT_ID
                            ),
                            closeToast
                        ),
                    {
                        toastId: res.data.DESPESA.DESP_INT_ID
                    }
                );
            }
            yield put({
                type: 'REQUEST_DESPESA_LOAD'
            });
        } else {
            yield put({
                type: 'FAILURE_DESPESA',
                data: {
                    ERROR: res.data.error
                }
            });
        }
    }
}

export function* getDespesas(action) {
    const res = yield call(api.get, '/despesas', {});
    if (res.ok) {
        yield put({
            type: 'SUCCESS_DESPESA_LOAD',
            data: res.data.DESPESAS
        });
    } else {
        yield put({
            type: 'FAILURE_DESPESA_LOAD',
            data: {
                ERROR: res.data.error
            }
        });
    }
}
