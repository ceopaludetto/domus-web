import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Loading from '../components/Loading';

const Authorized = props =>
    props.login.loadingToken ? (
        <Loading>Carregando...</Loading>
    ) : props.login.success ? (
        <Redirect from={props.path} to="/app" />
    ) : (
        <Route path={props.path} component={props.component} {...props} />
    );

const mapStateToProps = state => ({
    login: state.login
});

export default connect(mapStateToProps)(Authorized);
