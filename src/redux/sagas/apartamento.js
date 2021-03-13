import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { makeToast } from '../../utils/toast';

import api from '../api';

export function* getNewApartamento(action) {
    const res = yield call(api.post, '/apartamento', {
        APTO_INT_NUM: action.APTO_INT_NUM,
        APTO_INT_AND: action.APTO_INT_AND,
        BLO_INT_ID: action.BLO_INT_ID
    });
    if (res.ok) {
        yield put({
            type: 'SUCCESS_APARTAMENTO'
        });
        if (action.UNDO) {
            toast(
                ({ closeToast }) =>
                    makeToast(`Apartamento adicionado!`, action.UNDO(res.data.APARTAMENTO.APTO_INT_ID), closeToast),
                {
                    toastId: res.data.APARTAMENTO.APTO_INT_ID
                }
            );
        }
        yield put({
            type: 'REQUEST_APARTAMENTO_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_APARTAMENTO',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getNewApartamentoGen(action) {
    for (let i = 0; i < action.BLO_QTD; i++) {
        for (let i2 = 1; i2 <= action.AND_QTD; i2++) {
            for (let i3 = 1; i3 <= action.APTO_QTD / action.AND_QTD / action.BLO_QTD; i3++) {
                yield call(api.post, '/apartamento', {
                    APTO_INT_NUM: `${i2}${i3}`,
                    APTO_INT_AND: i2,
                    BLO_INT_ID: action.BLOCOS[i].BLO_INT_ID
                });
            }
        }
    }
    yield put({
        type: 'SUCCESS_APARTAMENTO'
    });
    yield put({
        type: 'REQUEST_APARTAMENTO_LOAD'
    });
}

export function* getEditApartamento(action) {
    const res = yield call(api.put, `/apartamento/${action.APTO_INT_ID}`, {
        APTO_INT_NUM: action.APTO_INT_NUM,
        APTO_INT_AND: action.APTO_INT_AND,
        BLO_INT_ID: action.BLO_INT_ID
    });
    if (res.ok) {
        yield put({
            type: 'SUCCESS_APARTAMENTO'
        });
        if (action.UNDO) {
            toast(
                ({ closeToast }) =>
                    makeToast(
                        `Apartamento editado!`,
                        action.UNDO(
                            action.OLD_APTO_INT_NUM,
                            action.OLD_APTO_INT_AND,
                            action.OLD_BLO_INT_ID,
                            res.data.APARTAMENTO.APTO_INT_ID
                        ),
                        closeToast
                    ),
                {
                    toastId: res.data.APARTAMENTO.APTO_INT_ID
                }
            );
        }
        yield put({
            type: 'REQUEST_APARTAMENTO_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_APARTAMENTO',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getDeleteApartamento(action) {
    for (let i = 0; i < action.APARTAMENTOS.length; i++) {
        const res = yield call(api.delete, `/apartamento/${action.APARTAMENTOS[i]}`);
        if (res.ok) {
            yield put({
                type: 'SUCCESS_APARTAMENTO'
            });
            if (action.UNDO) {
                toast(
                    ({ closeToast }) =>
                        makeToast(
                            `Apartamento removido!`,
                            action.UNDO(
                                res.data.APARTAMENTO.APTO_INT_NUM,
                                res.data.APARTAMENTO.APTO_INT_AND,
                                res.data.APARTAMENTO.BLO_INT_ID,
                                res.data.APARTAMENTO.APTO_INT_ID
                            ),
                            closeToast
                        ),
                    {
                        toastId: res.data.APARTAMENTO.APTO_INT_ID
                    }
                );
            }
            yield put({
                type: 'REQUEST_APARTAMENTO_LOAD'
            });
        } else {
            yield put({
                type: 'FAILURE_APARTAMENTO',
                data: {
                    ERROR: res.data.error
                }
            });
        }
    }
}

export function* getApartamentos(action) {
    const res = yield call(api.get, '/apartamento', {});
    if (res.ok) {
        yield put({
            type: 'SUCCESS_APARTAMENTO_LOAD',
            data: res.data.APARTAMENTOS
        });
    } else {
        yield put({
            type: 'FAILURE_APARTAMENTO_LOAD',
            data: {
                ERROR: res.data.error
            }
        });
    }
}
