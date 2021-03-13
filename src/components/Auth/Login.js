import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import { Creators as loginActions } from '../../redux/ducks/login';

import Form from '../Form/index';
import Typo from '../Typo/index';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            Email: '',
            Pass: '',
            visibility: {
                Pass: false
            }
        };
    }
    handleClick = () => {
        const { Email, Pass } = this.state;
        this.props.requestLogin(Email, Pass);
    };
    handleChange = prop => e => this.setState({ [prop]: e.target.value });
    handleVisibility = prop => () => {
        this.setState(state => ({ visibility: { ...state.visibility, [prop]: !state.visibility[prop] } }));
    };
    render() {
        return (
            <Fragment>
                <Typo.Heading>Bem vindo de volta!</Typo.Heading>
                <Typo.SubHeading>Fazer Login</Typo.SubHeading>
                <Typo.Label
                    htmlFor="Email"
                    error={
                        this.props.login.failure && this.props.login.data.ERROR_TYPE === 1
                            ? this.props.login.data.ERROR
                            : ''
                    }>
                    E-mail
                </Typo.Label>
                <Form.Control
                    id="Email"
                    onChange={this.handleChange('Email')}
                    value={this.state.Email}
                    error={this.props.login.failure && this.props.login.data.ERROR_TYPE === 1}
                />
                <Typo.Label
                    htmlFor="Pass"
                    error={
                        this.props.login.failure && this.props.login.data.ERROR_TYPE === 2
                            ? this.props.login.data.ERROR
                            : ''
                    }>
                    Senha
                </Typo.Label>
                <Form.Control
                    id="Pass"
                    onChange={this.handleChange('Pass')}
                    value={this.state.Pass}
                    error={this.props.login.failure && this.props.login.data.ERROR_TYPE === 2}
                    type={this.state.visibility.Pass ? 'text' : 'password'}
                    append={
                        <Form.Button variant="white" icon rounded onClick={this.handleVisibility('Pass')}>
                            {this.state.visibility.Pass ? <MdVisibilityOff /> : <MdVisibility />}
                        </Form.Button>
                    }
                    helper
                />
                <Typo.Helper margin>
                    <Typo.Link to="/auth/esqueceu">Esqueceu sua senha?</Typo.Link>
                </Typo.Helper>
                <Form.Button raised block loading={this.props.login.loading} onClick={this.handleClick}>
                    Entrar
                </Form.Button>
                <Typo.Helper>
                    Não possui uma conta? <Typo.Link to="/auth/registro">Registre-se</Typo.Link>
                </Typo.Helper>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    login: state.login
});

const mapDispatchToProps = dispatch => bindActionCreators(loginActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
