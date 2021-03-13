import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Gerais from './Gerais';
import Aplicacao from './Aplicacao';
import Condominio from './Condominio';

import Sindico from '../../../routes/sindico';
import Title from '../../../routes/title';

const SettingsRoute = () => (
    <Switch>
        <Title path="/app/configuracoes/gerais" component={Gerais} title="Domus | Configurações | Gerais" />
        <Title path="/app/configuracoes/aplicacao" component={Aplicacao} title="Domus | Configurações | Aplicação" />
        <Sindico
            path="/app/configuracoes/condominio"
            component={Condominio}
            title="Domus | Configurações | Condomínio"
        />
        <Redirect from="/app/configuracoes*" to="/app/configuracoes/gerais" />
    </Switch>
);

export default SettingsRoute;
