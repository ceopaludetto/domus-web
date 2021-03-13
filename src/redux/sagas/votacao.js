import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { makeToast } from '../../utils/toast';

import api from '../api';

export function* getNewVotacao(action) {
    const res = yield call(api.post, '/votacao', {
        VOT_STR_TITULO: action.VOT_STR_TITULO,
        VOT_STR_DESC: action.VOT_STR_DESC
    });
    if (res.ok) {
        yield put({
            type: 'SUCCESS_VOTACAO'
        });
        console.log(action);
        if (action.UNDO) {
            toast(
                ({ closeToast }) =>
                    makeToast(
                        `Votacão adicionada!`,
                        action.UNDO('votacao', { id: res.data.VOTACAO.VOT_INT_ID }),
                        closeToast
                    ),
                {
                    toastId: res.data.VOTACAO.VOT_INT_ID
                }
            );
        }
        yield put({
            type: 'REQUEST_VOTACAO_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_VOTACAO',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getEditVotacao(action) {
    const res = yield call(api.put, `/votacao/${action.VOT_INT_ID}`, {
        VOT_STR_TITULO: action.VOT_STR_TITULO,
        VOT_STR_DESC: action.VOT_STR_DESC
    });
    if (res.ok) {
        yield put({
            type: 'SUCCESS_VOTACAO'
        });
        if (action.UNDO) {
            toast(
                ({ closeToast }) =>
                    makeToast(
                        `Votação editada!`,
                        action.UNDO('votacao', {
                            titulo: action.OLD_VOT_STR_TITULO,
                            desc: action.OLD_VOT_STR_DESC,
                            id: res.data.VOTACAO.VOT_INT_ID
                        }),
                        closeToast
                    ),
                {
                    toastId: res.data.VOTACAO.VOT_INT_ID
                }
            );
        }
        yield put({
            type: 'REQUEST_VOTACAO_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_VOTACAO',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getDeleteVotacao(action) {
    const res = yield call(api.delete, `/votacao/${action.VOT_INT_ID}`);
    if (res.ok) {
        yield put({
            type: 'SUCCESS_VOTACAO'
        });
        if (action.UNDO) {
            toast(
                ({ closeToast }) =>
                    makeToast(
                        `Votação removida!`,
                        action.UNDO('votacao', {
                            id: res.data.VOTACAO.VOT_INT_ID,
                            titulo: res.data.VOTACAO.VOT_STR_TITULO,
                            desc: res.data.VOTACAO.VOT_STR_DESC
                        }),
                        closeToast
                    ),
                {
                    toastId: res.data.VOTACAO.VOT_INT_ID
                }
            );
        }
        yield put({
            type: 'REQUEST_VOTACAO_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_VOTACAO',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getVotacoes(action) {
    const res = yield call(api.get, '/votacao', {});
    if (res.ok) {
        yield put({
            type: 'SUCCESS_VOTACAO_LOAD',
            data: res.data.VOTACOES
        });
    } else {
        yield put({
            type: 'FAILURE_VOTACAO_LOAD',
            data: {
                ERROR: res.data.error
            }
        });
    }
}
