import { put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { makeToast } from '../../utils/toast';

import api from '../api';

export function* getAssistencia(action) {
    const { AST_STR_TIT, AST_STR_DESC, AST_STR_TIPO } = action;
    const res = yield call(api.post, '/assistencia', {
        AST_STR_TIT,
        AST_STR_DESC,
        AST_STR_TIPO
    });
    if (res.ok) {
        toast(({ closeToast }) => makeToast('Solicitação enviada', false, closeToast));
        yield put({
            type: 'SUCCESS_ASSISTENCIA',
            data: {
                ASSISTENCIA: res.data.ASSISTENCIA
            }
        });
    } else {
        yield put({
            type: 'FAILURE_ASSISTENCIA',
            data: {
                ERROR: res.data.error
            }
        });
    }
}
