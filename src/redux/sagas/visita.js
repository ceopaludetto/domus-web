import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { makeToast } from '../../utils/toast';

import api from '../api';

export function* getNewVisita(action) {
    const res = yield call(api.post, '/visita', {
        VSIT_STR_NOME: action.VSIT_STR_NOME,
        VSIT_DT_ENT: action.VSIT_DT_ENT
    });
    if (res.ok) {
        yield put({
            type: 'SUCCESS_VISITA'
        });
        if (action.UNDO) {
            toast(
                ({ closeToast }) =>
                    makeToast(`Visita adicionada!`, action.UNDO(res.data.VISITA.VSIT_INT_ID), closeToast),
                {
                    toastId: res.data.VISITA.VSIT_INT_ID
                }
            );
        }
        yield put({
            type: 'REQUEST_VISITA_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_VISITA',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getDeleteVisita(action) {
    for (let i = 0; i < action.VISITAS.length; i++) {
        const res = yield call(api.delete, `/visita/${action.VISITAS[i]}`);
        if (res.ok) {
            yield put({
                type: 'SUCCESS_VISITA'
            });
            if (action.UNDO) {
                toast(
                    ({ closeToast }) =>
                        makeToast(
                            `Visita removida!`,
                            action.UNDO(
                                res.data.VISITA.VSIT_STR_NOME,
                                res.data.VISITA.VSIT_DT_ENT,
                                res.data.VISITA.VSIT_INT_ID
                            ),
                            closeToast
                        ),
                    {
                        toastId: res.data.VISITA.VSIT_INT_ID
                    }
                );
            }
            yield put({
                type: 'REQUEST_VISITA_LOAD'
            });
        } else {
            yield put({
                type: 'FAILURE_VISITA',
                data: {
                    ERROR: res.data.error
                }
            });
        }
    }
}

export function* getVisitas(action) {
    const res = yield call(api.get, '/visita', {});
    if (res.ok) {
        yield put({
            type: 'SUCCESS_VISITA_LOAD',
            data: res.data.VISITAS
        });
    } else {
        yield put({
            type: 'FAILURE_VISITA_LOAD',
            data: {
                ERROR: res.data.error
            }
        });
    }
}
