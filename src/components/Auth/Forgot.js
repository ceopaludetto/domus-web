import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as forgotActions } from '../../redux/ducks/forgot';

import Form from '../Form/index';
import Typo from '../Typo/index';

class Forgot extends Component {
    constructor() {
        super();
        this.state = {
            Email: ''
        };
    }
    handleClick = () => {
        const { Email } = this.state;
        this.props.requestForgot(Email);
    };
    handleChange = prop => e => this.setState({ [prop]: e.target.value });
    render() {
        return (
            <Fragment>
                <Typo.Heading>Esqueceu sua senha?</Typo.Heading>
                <Typo.SubHeading>Recuperar</Typo.SubHeading>
                {this.props.forgot.success ? (
                    <Fragment>
                        <Typo.Warn>E-mail enviado com successo!</Typo.Warn>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Typo.Label
                            htmlFor="Email"
                            error={this.props.forgot.failure ? this.props.forgot.data.ERROR : ''}>
                            E-mail
                        </Typo.Label>
                        <Form.Control
                            id="Email"
                            helper
                            onChange={this.handleChange('Email')}
                            value={this.state.Email}
                            error={this.props.forgot.failure}
                        />
                        <Typo.Helper margin>
                            <Typo.Link to="/auth/login">Está perdido?</Typo.Link>
                        </Typo.Helper>
                        <Form.Button raised block onClick={this.handleClick} loading={this.props.forgot.loading}>
                            Solicitar Troca
                        </Form.Button>
                    </Fragment>
                )}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    forgot: state.forgot
});

const mapDispatchToProps = dispatch => bindActionCreators(forgotActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Forgot);
