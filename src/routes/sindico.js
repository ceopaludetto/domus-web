import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const Sindico = props => {
    document.title = props.title;
    return props.login.data.MORADOR.MOR_BIT_SIN ? (
        <Route path={props.path} component={props.component} {...props} />
    ) : (
        <Redirect from={props.path} to="/app/home" />
    );
};

const mapStateToProps = state => ({
    login: state.login
});

export default connect(mapStateToProps)(Sindico);
