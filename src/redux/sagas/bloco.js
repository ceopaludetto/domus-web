import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { makeToast } from '../../utils/toast';

import api from '../api';

export function* getNewBloco(action) {
    const res = yield call(api.post, '/bloco', {
        BLO_STR_NOME: action.BLO_STR_NOME
    });
    if (res.ok) {
        yield put({
            type: 'SUCCESS_BLOCO'
        });
        if (action.UNDO) {
            toast(
                ({ closeToast }) => makeToast(`Bloco adicionado!`, action.UNDO(res.data.BLOCO.BLO_INT_ID), closeToast),
                {
                    toastId: res.data.BLOCO.BLO_INT_ID
                }
            );
        }
        yield put({
            type: 'REQUEST_BLOCO_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_BLOCO',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getEditBloco(action) {
    const res = yield call(api.put, `/bloco/${action.BLO_INT_ID}`, {
        BLO_STR_NOME: action.BLO_STR_NOME
    });
    if (res.ok) {
        yield put({
            type: 'SUCCESS_BLOCO'
        });
        if (action.UNDO) {
            toast(
                ({ closeToast }) =>
                    makeToast(
                        `Bloco editado!`,
                        action.UNDO(action.OLD_BLO_STR_NOME, res.data.BLOCO.BLO_INT_ID),
                        closeToast
                    ),
                {
                    toastId: res.data.BLOCO.BLO_INT_ID
                }
            );
        }
        yield put({
            type: 'REQUEST_BLOCO_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_BLOCO',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getDeleteBloco(action) {
    for (let i = 0; i < action.BLOCOS.length; i++) {
        const res = yield call(api.delete, `/bloco/${action.BLOCOS[i]}`);
        if (res.ok) {
            yield put({
                type: 'SUCCESS_BLOCO'
            });
            if (action.UNDO) {
                toast(
                    ({ closeToast }) =>
                        makeToast(
                            `Bloco removido!`,
                            action.UNDO(res.data.BLOCO.BLO_STR_NOME, res.data.BLOCO.BLO_INT_ID),
                            closeToast
                        ),
                    {
                        toastId: res.data.BLOCO.BLO_INT_ID
                    }
                );
            }
            yield put({
                type: 'REQUEST_BLOCO_LOAD'
            });
        } else {
            yield put({
                type: 'FAILURE_BLOCO',
                data: {
                    ERROR: res.data.error
                }
            });
        }
    }
}

export function* getBlocos(action) {
    const res = yield call(api.get, '/bloco', {});
    if (res.ok) {
        yield put({
            type: 'SUCCESS_BLOCO_LOAD',
            data: res.data.BLOCOS
        });
    } else {
        yield put({
            type: 'FAILURE_BLOCO_LOAD',
            data: {
                ERROR: res.data.error
            }
        });
    }
}
