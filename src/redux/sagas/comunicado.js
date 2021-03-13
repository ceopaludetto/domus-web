import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { makeToast } from '../../utils/toast';

import api from '../api';

export function* getNewComunicado(action) {
    const res = yield call(api.post, '/comunicados', {
        COMU_STR_TIT: action.COMU_STR_TIT,
        COMU_STR_DESC: action.COMU_STR_DESC
    });
    if (res.ok) {
        yield put({
            type: 'SUCCESS_COMUNICADO'
        });
        if (action.UNDO) {
            toast(
                ({ closeToast }) =>
                    makeToast(
                        `Comunicado adicionado!`,
                        action.UNDO('comunicado', { id: res.data.COMUNICADO.COMU_INT_ID }),
                        closeToast
                    ),
                {
                    toastId: res.data.COMUNICADO.COMU_INT_ID
                }
            );
        }
        yield put({
            type: 'REQUEST_COMUNICADO_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_COMUNICADO',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getEditComunicado(action) {
    const res = yield call(api.put, `/comunicados/${action.COMU_INT_ID}`, {
        COMU_STR_TIT: action.COMU_STR_TIT,
        COMU_STR_DESC: action.COMU_STR_DESC
    });
    if (res.ok) {
        yield put({
            type: 'SUCCESS_COMUNICADO'
        });
        if (action.UNDO) {
            toast(
                ({ closeToast }) =>
                    makeToast(
                        `Comunicado editado!`,
                        action.UNDO('comunicado', {
                            titulo: action.OLD_COMU_STR_TIT,
                            desc: action.OLD_COMU_STR_DESC,
                            id: res.data.COMUNICADO.COMU_INT_ID
                        }),
                        closeToast
                    ),
                {
                    toastId: res.data.COMUNICADO.COMU_INT_ID
                }
            );
        }
        yield put({
            type: 'REQUEST_COMUNICADO_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_COMUNICADO',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getDeleteComunicado(action) {
    const res = yield call(api.delete, `/comunicados/${action.COMU_INT_ID}`);
    if (res.ok) {
        yield put({
            type: 'SUCCESS_COMUNICADO'
        });
        if (action.UNDO) {
            toast(
                ({ closeToast }) =>
                    makeToast(
                        `Comunicado removido!`,
                        action.UNDO('comunicado', {
                            titulo: res.data.COMUNICADO.COMU_STR_TIT,
                            desc: res.data.COMUNICADO.COMU_STR_DESC,
                            id: res.data.COMUNICADO.COMU_INT_ID
                        }),
                        closeToast
                    ),
                {
                    toastId: res.data.COMUNICADO.COMU_INT_ID
                }
            );
        }
        yield put({
            type: 'REQUEST_COMUNICADO_LOAD'
        });
    } else {
        yield put({
            type: 'FAILURE_COMUNICADO',
            data: {
                ERROR: res.data.error
            }
        });
    }
}

export function* getComunicados(action) {
    const res = yield call(api.get, '/comunicados', {});
    if (res.ok) {
        yield put({
            type: 'SUCCESS_COMUNICADO_LOAD',
            data: res.data.COMUNICADOS
        });
    } else {
        yield put({
            type: 'FAILURE_COMUNICADO_LOAD',
            data: {
                ERROR: res.data.error
            }
        });
    }
}
