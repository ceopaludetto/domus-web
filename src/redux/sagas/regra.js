import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { makeToast } from '../../utils/toast';

import api from '../api';

export function* getNewRegra(action) {
    const res = yield call(api.post, '/regra', {
        REG_STR_DESC: action.REG_STR_DESC
    });
    if (res.ok) {
        yield put({
            type: 'SUCCESS_REGRA'
        });
        if (action.UNDO) {
            toast(
                ({ closeToast }) =>
                    makeToast(`Regra adicionada!`, action.UNDO('regra', { id: res.data.REGRA.REG_INT_ID }), closeToast),
                {
                    toastId: res.data.REGRA.REG_INT_ID
                }
            );
        }
        yield put({
            type: 'REQUEST_REGRA_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_REGRA',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getEditRegra(action) {
    const res = yield call(api.put, `/regra/${action.REG_INT_ID}`, {
        REG_STR_DESC: action.REG_STR_DESC
    });
    if (res.ok) {
        yield put({
            type: 'SUCCESS_REGRA'
        });
        if (action.UNDO) {
            toast(
                ({ closeToast }) =>
                    makeToast(
                        `Regra editada!`,
                        action.UNDO('regra', {
                            desc: action.OLD_REG_STR_DESC,
                            id: res.data.REGRA.REG_INT_ID
                        }),
                        closeToast
                    ),
                {
                    toastId: res.data.REGRA.REG_INT_ID
                }
            );
        }
        yield put({
            type: 'REQUEST_REGRA_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_REGRA',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getDeleteRegra(action) {
    const res = yield call(api.delete, `/regra/${action.REG_INT_ID}`);
    if (res.ok) {
        yield put({
            type: 'SUCCESS_REGRA'
        });
        if (action.UNDO) {
            toast(
                ({ closeToast }) =>
                    makeToast(
                        `Regra removida!`,
                        action.UNDO('regra', { desc: res.data.REGRA.REG_STR_DESC, id: res.data.REGRA.REG_INT_ID }),
                        closeToast
                    ),
                {
                    toastId: res.data.REGRA.REG_INT_ID
                }
            );
        }
        yield put({
            type: 'REQUEST_REGRA_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_REGRA',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getRegras(action) {
    const res = yield call(api.get, '/regra', {});
    if (res.ok) {
        yield put({
            type: 'SUCCESS_REGRA_LOAD',
            data: res.data.REGRAS
        });
    } else {
        yield put({
            type: 'FAILURE_REGRA_LOAD',
            data: {
                ERROR: res.data.error
            }
        });
    }
}
