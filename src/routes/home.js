import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Api from '../components/Home/Api';
import Home from '../components/Home/Home';
import Sobre from '../components/Home/Sobre';
import Planos from '../components/Home/Planos';
import Contato from '../components/Home/Contato';
import Bibliotecas from '../components/Home/Bibliotecas';
import Funcionalidades from '../components/Home/Funcionalidades';

import Title from './title';

const HomeRoute = () => (
    <Switch>
        <Title path="/home" component={Home} exact title="Domus" />
        <Title path="/home/api" component={Api} exact title="Domus | API" />
        <Title path="/home/sobre" component={Sobre} exact title="Domus | Sobre" />
        <Title path="/home/planos" component={Planos} exact title="Domus | Planos" />
        <Title path="/home/contato" component={Contato} exact title="Domus | Contato" />
        <Title path="/home/bibliotecas" component={Bibliotecas} exact title="Domus | Bibliotecas" />
        <Title path="/home/funcionalidades" component={Funcionalidades} exact title="Domus | Funcionalidades" />
        <Redirect from="/home*" to="/home" />
    </Switch>
);

export default HomeRoute;
