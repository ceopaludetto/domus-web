import { all, takeLatest, takeEvery, fork } from 'redux-saga/effects';

import { getLogin, getLogout, getLoginToken } from './login';
import { getForgot } from './forgot';
import { getReset } from './reset';
import { getSettings, getSettingsPass } from './settings';
import { getPosts, getNewPost } from './post';
import { getContato } from './contato';
import { getAssistencia } from './assistencia';
import { getRegister } from './register';
import { getNewVotacao, getEditVotacao, getDeleteVotacao, getVotacoes } from './votacao';
import { getNewRegra, getEditRegra, getDeleteRegra, getRegras } from './regra';
import { getNewVoto, getEditVoto, getDeleteVoto, getVotos } from './voto';
import { getNewComunicado, getEditComunicado, getDeleteComunicado, getComunicados } from './comunicado';
import { getNewBloco, getEditBloco, getDeleteBloco, getBlocos } from './bloco';
import {
    getNewApartamento,
    getNewApartamentoGen,
    getEditApartamento,
    getDeleteApartamento,
    getApartamentos
} from './apartamento';
import { getNewDespesa, getEditDespesa, getDeleteDespesa, getDespesas } from './despesa';
import { getNewLocal, getEditLocal, getDeleteLocal, getLocais } from './local';
import { getCondominio, getCondominioToken } from './condominio';
import { getNewFuncionario, getEditFuncionario, getDeleteFuncionario, getFuncionarios } from './funcionario';
import { getNewVisita, getDeleteVisita, getVisitas } from './visita';
import { getNewReserva, getDeleteReserva, getReservas } from './reserva';
import { getDeleteMorador, getMoradores, getMoradorId, getMoradorPosts } from './morador';
import { getMessage, getMessages } from './message';
import { flow } from './socket';
import { uploadSaga } from './upload';

export default function* root() {
    yield fork(flow);
    yield fork(uploadSaga);
    yield all([
        takeLatest('REQUEST_LOGIN', getLogin),
        takeLatest('REQUEST_LOGOUT', getLogout),
        takeLatest('REQUEST_LOGIN_TOKEN', getLoginToken),
        takeLatest('REQUEST_FORGOT', getForgot),
        takeLatest('REQUEST_RESET', getReset),
        takeLatest('REQUEST_SETTINGS', getSettings),
        takeLatest('REQUEST_SETTINGS_PASS', getSettingsPass),
        takeLatest('REQUEST_POST', getNewPost),
        takeLatest('REQUEST_POST_LOAD', getPosts),
        takeLatest('REQUEST_CONTATO', getContato),
        takeLatest('REQUEST_ASSISTENCIA', getAssistencia),
        takeLatest('REQUEST_REGISTER', getRegister),
        takeLatest('REQUEST_VOTACAO', getNewVotacao),
        takeLatest('REQUEST_VOTACAO_EDIT', getEditVotacao),
        takeLatest('REQUEST_VOTACAO_DELETE', getDeleteVotacao),
        takeLatest('REQUEST_VOTACAO_LOAD', getVotacoes),
        takeLatest('REQUEST_REGRA', getNewRegra),
        takeLatest('REQUEST_REGRA_EDIT', getEditRegra),
        takeLatest('REQUEST_REGRA_DELETE', getDeleteRegra),
        takeLatest('REQUEST_REGRA_LOAD', getRegras),
        takeLatest('REQUEST_COMUNICADO', getNewComunicado),
        takeLatest('REQUEST_COMUNICADO_EDIT', getEditComunicado),
        takeLatest('REQUEST_COMUNICADO_DELETE', getDeleteComunicado),
        takeLatest('REQUEST_COMUNICADO_LOAD', getComunicados),
        takeLatest('REQUEST_VOTO', getNewVoto),
        takeLatest('REQUEST_VOTO_EDIT', getEditVoto),
        takeLatest('REQUEST_VOTO_DELETE', getDeleteVoto),
        takeLatest('REQUEST_VOTO_LOAD', getVotos),
        takeLatest('REQUEST_BLOCO', getNewBloco),
        takeLatest('REQUEST_BLOCO_EDIT', getEditBloco),
        takeLatest('REQUEST_BLOCO_DELETE', getDeleteBloco),
        takeLatest('REQUEST_BLOCO_LOAD', getBlocos),
        takeLatest('REQUEST_APARTAMENTO', getNewApartamento),
        takeLatest('REQUEST_APARTAMENTO_GEN', getNewApartamentoGen),
        takeLatest('REQUEST_APARTAMENTO_EDIT', getEditApartamento),
        takeLatest('REQUEST_APARTAMENTO_DELETE', getDeleteApartamento),
        takeLatest('REQUEST_APARTAMENTO_LOAD', getApartamentos),
        takeLatest('REQUEST_DESPESA', getNewDespesa),
        takeLatest('REQUEST_DESPESA_EDIT', getEditDespesa),
        takeLatest('REQUEST_DESPESA_DELETE', getDeleteDespesa),
        takeLatest('REQUEST_DESPESA_LOAD', getDespesas),
        takeLatest('REQUEST_LOCAL', getNewLocal),
        takeLatest('REQUEST_LOCAL_EDIT', getEditLocal),
        takeLatest('REQUEST_LOCAL_DELETE', getDeleteLocal),
        takeLatest('REQUEST_LOCAL_LOAD', getLocais),
        takeLatest('REQUEST_FUNCIONARIO', getNewFuncionario),
        takeLatest('REQUEST_FUNCIONARIO_EDIT', getEditFuncionario),
        takeLatest('REQUEST_FUNCIONARIO_DELETE', getDeleteFuncionario),
        takeLatest('REQUEST_FUNCIONARIO_LOAD', getFuncionarios),
        takeLatest('REQUEST_CONDOMINIO', getCondominio),
        takeLatest('REQUEST_CONDOMINIO_TOKEN', getCondominioToken),
        takeLatest('REQUEST_VISITA', getNewVisita),
        takeLatest('REQUEST_VISITA_DELETE', getDeleteVisita),
        takeLatest('REQUEST_VISITA_LOAD', getVisitas),
        takeLatest('REQUEST_RESERVA', getNewReserva),
        takeLatest('REQUEST_RESERVA_DELETE', getDeleteReserva),
        takeLatest('REQUEST_RESERVA_LOAD', getReservas),
        takeLatest('REQUEST_MORADOR_DELETE', getDeleteMorador),
        takeLatest('REQUEST_MORADOR_LOAD', getMoradores),
        takeLatest('REQUEST_MORADOR_LOAD_ID', getMoradorId),
        takeLatest('REQUEST_MORADOR_LOAD_POSTS', getMoradorPosts),
        takeLatest('REQUEST_MESSAGE_LOAD', getMessages),
        takeEvery('RECEIVE_MESSAGE', getMessage)
    ]);
}
