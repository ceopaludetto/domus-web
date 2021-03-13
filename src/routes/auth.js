import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Login from '../components/Auth/Login';
import Reset from '../components/Auth/Reset';
import Forgot from '../components/Auth/Forgot';
import Register from '../components/Auth/Register';
import RegisterMorador from '../components/Auth/RegisterMorador';

import Title from './title';

const AuthRoute = () => (
    <Switch>
        <Title path="/auth/registro" component={Register} exact title="Domus | Registro" />
        <Title path="/auth/registro/:token" component={RegisterMorador} exact title="Domus | Registro" />
        <Title path="/auth/login" component={Login} exact title="Domus | Login" />
        <Title path="/auth/redefinir/:token" component={Reset} exact title="Domus | Redefinir" />
        <Title path="/auth/esqueceu" component={Forgot} exact title="Domus | Esqueceu" />
        <Redirect from="/auth*" to="/auth/login" />
    </Switch>
);

export default AuthRoute;
