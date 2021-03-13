import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Home from '../components/Dash/Home';
import Bloco from '../components/Dash/Bloco';
import Local from '../components/Dash/Local';
import Perfil from '../components/Dash/Perfil';
import Visita from '../components/Dash/Visita';
import Morador from '../components/Dash/Morador';
import Reserva from '../components/Dash/Reserva';
import Despesa from '../components/Dash/Despesa';
import Settings from '../components/Dash/Settings';
import Messages from '../components/Dash/Messages';
import Moradores from '../components/Dash/Moradores';
import Apartamento from '../components/Dash/Apartamento';
import Assistencia from '../components/Dash/Assistencia';
import Funcionario from '../components/Dash/Funcionario';

import Sindico from './sindico';
import Title from './title';

const DashRoute = () => (
    <Switch>
        <Title path="/app/home" component={Home} exact title="Domus | Home" />
        <Title path="/app/perfil" component={Perfil} title="Domus | Perfil" />
        <Title path="/app/visita" component={Visita} title="Domus | Visita" />
        <Title path="/app/reserva" component={Reserva} title="Domus | Reserva" />
        <Title path="/app/morador" component={Moradores} exact title="Domus | Moradores" />
        <Title path="/app/morador/:id" component={Morador} title="Domus | Morador" />
        <Title path="/app/mensagens" component={Messages} title="Domus | Mensagens" />
        <Title path="/app/configuracoes" component={Settings} title="Domus | Configurações" />
        <Sindico path="/app/bloco" component={Bloco} title="Domus | Blocos" />
        <Sindico path="/app/local" component={Local} title="Domus | Locais" />
        <Sindico path="/app/despesa" component={Despesa} title="Domus | Despesas" />
        <Sindico path="/app/apartamento" component={Apartamento} title="Domus | Apartamentos" />
        <Sindico path="/app/assistencia" component={Assistencia} title="Domus | Assistência" />
        <Sindico path="/app/funcionario" component={Funcionario} title="Domus | Funcionário" />
        <Redirect from="/app*" to="/app/home" />
    </Switch>
);

export default DashRoute;
