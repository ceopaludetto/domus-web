import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as resetActions } from '../../redux/ducks/reset';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import Form from '../Form/index';
import Typo from '../Typo/index';

class Reset extends Component {
    constructor() {
        super();
        this.state = {
            Pass: '',
            RPass: '',
            error: '',
            visibility: {
                Pass: false,
                RPass: false
            }
        };
    }
    handleClick = () => {
        if (this.state.Pass === this.state.RPass) {
            const { Pass } = this.state;
            const { token } = this.props.match.params;
            this.props.requestReset(Pass, token);
        } else {
            this.setState({ error: 'As senhas não condizem.' });
        }
    };
    handleChange = prop => e => this.setState({ [prop]: e.target.value });
    handleVisibility = prop => () => {
        this.setState(state => ({ visibility: { ...state.visibility, [prop]: !state.visibility[prop] } }));
    };
    render() {
        return (
            <Fragment>
                <Typo.Heading>Esqueceu sua senha?</Typo.Heading>
                <Typo.SubHeading>Alterar</Typo.SubHeading>
                {this.props.reset.success ? (
                    <Fragment>
                        <Typo.Warn>Senha alterada com successo! Redirecionando...</Typo.Warn>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Typo.Label htmlFor="Pass" error={this.props.reset.failure ? this.props.reset.data.ERROR : ''}>
                            Senha
                        </Typo.Label>
                        <Form.Control
                            id="Pass"
                            onChange={this.handleChange('Pass')}
                            value={this.state.Pass}
                            error={this.props.reset.failure}
                            type={this.state.visibility.Pass ? 'text' : 'password'}
                            append={
                                <Form.Button variant="white" icon rounded onClick={this.handleVisibility('Pass')}>
                                    {this.state.visibility.Pass ? <MdVisibilityOff /> : <MdVisibility />}
                                </Form.Button>
                            }
                        />
                        <Typo.Label htmlFor="RPass" error={this.state.error}>
                            Repetir Senha
                        </Typo.Label>
                        <Form.Control
                            id="RPass"
                            onChange={this.handleChange('RPass')}
                            value={this.state.RPass}
                            error={this.state.error}
                            type={this.state.visibility.RPass ? 'text' : 'password'}
                            append={
                                <Form.Button variant="white" icon rounded onClick={this.handleVisibility('RPass')}>
                                    {this.state.visibility.RPass ? <MdVisibilityOff /> : <MdVisibility />}
                                </Form.Button>
                            }
                            helper
                        />
                        <Typo.Helper margin>
                            <Typo.Link to="/auth/login">Está perdido?</Typo.Link>
                        </Typo.Helper>
                        <Form.Button raised block onClick={this.handleClick} loading={this.props.reset.loading}>
                            Trocar senha
                        </Form.Button>
                    </Fragment>
                )}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    reset: state.reset
});

const mapDispatchToProps = dispatch => bindActionCreators(resetActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reset);
