import { put, call } from 'redux-saga/effects';

import api from '../api';

export function* getRegister(action) {
    if (action.TOKEN) {
        const { MOR_STR_NOME, MOR_STR_LGN, MOR_STR_PSW, MOR_INT_PSWPORTA, MOR_STR_CEL } = action.MORADOR;
        const res = yield call(
            api.post,
            '/auth/register',
            {
                MOR_STR_NOME,
                MOR_STR_LGN,
                MOR_STR_PSW,
                MOR_STR_CEL,
                MOR_INT_PSWPORTA
            },
            { headers: { Authorization: `Bearer ${action.CONDOMINIO}` } }
        );
        if (res.ok) {
            yield put({
                type: 'SUCCESS_REGISTER',
                data: {
                    MORADOR: res.data.MORADOR
                }
            });
            yield put({
                type: 'REQUEST_LOGIN',
                MOR_STR_LGN,
                MOR_STR_PSW
            });
        } else {
            yield put({
                type: 'FAILURE_REGISTER',
                data: {
                    ERROR: res.data.error
                }
            });
        }
    } else {
        const { COND_STR_NOME, COND_STR_END, COND_INT_APTOS } = action.CONDOMINIO;
        const res = yield call(api.post, '/condominio', {
            COND_STR_NOME,
            COND_STR_END,
            COND_INT_APTOS
        });
        if (res.ok) {
            const { MOR_STR_NOME, MOR_STR_LGN, MOR_STR_PSW, MOR_INT_PSWPORTA, MOR_STR_CEL } = action.MORADOR;
            const resMor = yield call(
                api.post,
                '/auth/register',
                {
                    MOR_STR_NOME,
                    MOR_STR_LGN,
                    MOR_STR_PSW,
                    MOR_STR_CEL,
                    MOR_INT_PSWPORTA,
                    MOR_BIT_SIN: 1
                },
                { headers: { Authorization: `Bearer ${res.data.TOKEN}` } }
            );
            if (resMor.ok) {
                yield put({
                    type: 'SUCCESS_REGISTER',
                    data: {
                        MORADOR: resMor.data.MORADOR
                    }
                });
                yield put({
                    type: 'REQUEST_LOGIN',
                    MOR_STR_LGN,
                    MOR_STR_PSW
                });
            } else {
                yield put({
                    type: 'FAILURE_REGISTER',
                    data: {
                        ERROR: resMor.data.error
                    }
                });
            }
        } else {
            yield put({
                type: 'FAILURE_REGISTER',
                data: {
                    ERROR: res.data.error
                }
            });
        }
    }
}
