import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Container from './Container';
import Typo from '../Typo/index';
import SettingsRoute from './Settings/index';

const Settings = props => (
    <Container>
        <Typo.Title variant="white">Configurações</Typo.Title>
        <Typo.SubTitle variant="primary">Vamos arrumar a casa!</Typo.SubTitle>
        <Typo.Nav>
            <NavLink to="/app/configuracoes/gerais">Gerais</NavLink>
            {props.login.data.MORADOR.MOR_BIT_SIN ? (
                <NavLink to="/app/configuracoes/condominio">Condomínio</NavLink>
            ) : (
                ''
            )}
            <NavLink to="/app/configuracoes/aplicacao">Aplicação</NavLink>
        </Typo.Nav>
        <SettingsRoute />
    </Container>
);

const mapStateToProps = state => ({
    login: state.login
});

export default connect(mapStateToProps)(Settings);
