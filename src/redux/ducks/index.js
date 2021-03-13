import { combineReducers } from 'redux';

import voto from './voto';
import post from './post';
import local from './local';
import bloco from './bloco';
import regra from './regra';
import color from './color';
import login from './login';
import reset from './reset';
import theme from './theme';
import upload from './upload';
import forgot from './forgot';
import visita from './visita';
import reserva from './reserva';
import despesa from './despesa';
import votacao from './votacao';
import loading from './loading';
import contato from './contato';
import morador from './morador';
import message from './message';
import register from './register';
import settings from './settings';
import condominio from './condominio';
import comunicado from './comunicado';
import assistencia from './assistencia';
import apartamento from './apartamento';
import funcionario from './funcionario';

const reducers = combineReducers({
    voto,
    post,
    local,
    bloco,
    regra,
    color,
    login,
    reset,
    theme,
    upload,
    forgot,
    visita,
    reserva,
    despesa,
    votacao,
    loading,
    contato,
    morador,
    message,
    register,
    settings,
    condominio,
    comunicado,
    assistencia,
    apartamento,
    funcionario
});

export default reducers;
