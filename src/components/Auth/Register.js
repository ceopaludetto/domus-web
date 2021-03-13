import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAdd, MdVisibility, MdVisibilityOff, MdArrowBack } from 'react-icons/md';
import styled from 'styled-components';

import { Creators as registerActions } from '../../redux/ducks/register';

import Grid from '../Grid/index';
import Form from '../Form/index';
import Typo from '../Typo/index';

const Col = styled.div`
    padding: 0 1rem;
`;

const Row = styled(Grid.Row)`
    margin-bottom: ${props => (props.next ? '1.5rem' : '0')};
`;

const SubHeading = styled(Typo.SubHeading)`
    margin-bottom: ${props => (props.next ? '0' : '1.5rem')};
`;

const Control = styled(Form.Control)`
    -webkit-text-security: ${props => (props.typepass === 'password' ? 'disc' : 'none')};
`;

class Register extends Component {
    constructor() {
        super();
        this.state = {
            CondNome: '',
            CondEnd: '',
            CondAptos: 0,
            Nome: '',
            Email: '',
            Pass: '',
            Cel: '',
            Portao: '',
            visibility: {
                Pass: false,
                Portao: false
            },
            modal: {
                Aptos: false,
                Cel: false
            },
            next: false
        };
    }
    handleBack = () => this.setState({ next: false });
    handleNext = () => this.setState({ next: true });
    handleChange = prop => e => this.setState({ [prop]: e.target.value });
    handleAdd = () => this.setState(state => ({ CondAptos: state.CondAptos + 1 }));
    handleVisibility = prop => () =>
        this.setState(state => ({ visibility: { ...state.visibility, [prop]: !state.visibility[prop] } }));
    handleModal = prop => () => this.setState(state => ({ modal: { ...state.modal, [prop]: !state.modal[prop] } }));
    handleSubmit = () => {
        const { CondNome, CondEnd, CondAptos, Nome, Email, Pass, Cel, Portao } = this.state;
        const CONDOMINIO = {
            COND_STR_NOME: CondNome,
            COND_STR_END: CondEnd,
            COND_INT_APTOS: CondAptos
        };
        const MORADOR = {
            MOR_STR_NOME: Nome,
            MOR_STR_LGN: Email,
            MOR_STR_PSW: Pass,
            MOR_STR_CEL: Cel,
            MOR_INT_PSWPORTA: Portao
        };
        this.props.requestRegister(CONDOMINIO, MORADOR);
    };
    render() {
        return (
            <Fragment>
                <Row alignItems="center" next={this.state.next}>
                    {this.state.next ? (
                        <Col>
                            <Form.Button rounded icon onClick={this.handleBack}>
                                <MdArrowBack />
                            </Form.Button>
                        </Col>
                    ) : (
                        ''
                    )}
                    <Col>
                        <Typo.Heading>Vamos começar?</Typo.Heading>
                        <SubHeading next={this.state.next}>
                            Registro - {this.state.next ? 'Morador' : 'Condomínio'}
                        </SubHeading>
                    </Col>
                </Row>
                {this.state.next ? (
                    <Fragment>
                        <Typo.Label htmlFor="Nome">Nome</Typo.Label>
                        <Form.Control id="Nome" onChange={this.handleChange('Nome')} value={this.state.Nome} />
                        <Typo.Label htmlFor="Email">E-mail</Typo.Label>
                        <Form.Control id="Email" onChange={this.handleChange('Email')} value={this.state.Email} />
                        <Typo.Label htmlFor="Pass">Senha</Typo.Label>
                        <Form.Control
                            id="Pass"
                            onChange={this.handleChange('Pass')}
                            value={this.state.Pass}
                            type={this.state.visibility.Pass ? 'text' : 'password'}
                            append={
                                <Form.Button variant="white" icon rounded onClick={this.handleVisibility('Pass')}>
                                    {this.state.visibility.Pass ? <MdVisibilityOff /> : <MdVisibility />}
                                </Form.Button>
                            }
                        />
                        <Typo.Label htmlFor="Portao">Senha do Portão</Typo.Label>
                        <Control
                            id="Portao"
                            onChange={this.handleChange('Portao')}
                            value={this.state.Portao}
                            type="number"
                            typepass={this.state.visibility.Portao ? 'number' : 'password'}
                            append={
                                <Form.Button variant="white" icon rounded onClick={this.handleVisibility('Portao')}>
                                    {this.state.visibility.Portao ? <MdVisibilityOff /> : <MdVisibility />}
                                </Form.Button>
                            }
                            helper
                        />
                        <Typo.Bold margin>Apenas números</Typo.Bold>
                        <Typo.Label htmlFor="Cel">Celular</Typo.Label>
                        <Form.Control
                            id="Cel"
                            mask={[
                                '(',
                                /[1-9]/,
                                /\d/,
                                ')',
                                ' ',
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                '-',
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/
                            ]}
                            onChange={this.handleChange('Cel')}
                            value={this.state.Cel}
                            helper
                        />
                        <Typo.Helper margin>
                            <Typo.Link onClick={this.handleModal('Cel')} tag="span">
                                Por que isso é importante?
                            </Typo.Link>
                        </Typo.Helper>
                        <Form.Button raised block onClick={this.handleSubmit} loading={this.props.register.loading}>
                            Registrar
                        </Form.Button>
                        <Form.Modal
                            title="Por que isso é importante?"
                            open={this.state.modal.Cel}
                            closeClick={this.handleModal('Cel')}>
                            Seu celular é importante para poder recuperar sua conta e manter contato!
                        </Form.Modal>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Typo.Label htmlFor="CondNome">Nome do condomínio</Typo.Label>
                        <Form.Control
                            id="CondNome"
                            onChange={this.handleChange('CondNome')}
                            value={this.state.CondNome}
                        />
                        <Typo.Label htmlFor="CondEnd">Endereço</Typo.Label>
                        <Form.Control id="CondEnd" onChange={this.handleChange('CondEnd')} value={this.state.CondEnd} />
                        <Typo.Label htmlFor="CondAptos">Número de apartamentos</Typo.Label>
                        <Form.Control
                            id="CondAptos"
                            onChange={this.handleChange('CondAptos')}
                            value={this.state.CondAptos}
                            type="number"
                            append={
                                <Form.Button variant="white" icon rounded onClick={this.handleAdd}>
                                    <MdAdd />
                                </Form.Button>
                            }
                            helper
                        />
                        <Typo.Helper margin>
                            <Typo.Link onClick={this.handleModal('Aptos')} tag="span">
                                Por que isso é importante?
                            </Typo.Link>
                        </Typo.Helper>
                        <Form.Button raised block onClick={this.handleNext}>
                            Próximo
                        </Form.Button>
                        <Form.Modal
                            title="Por que isso é importante?"
                            open={this.state.modal.Aptos}
                            closeClick={this.handleModal('Aptos')}>
                            O número de apartamentos é necessário para determinar em qual plano o condomínio se
                            encontra. <br />
                            <br />
                            Quanto maior esse número, maior deve ser nosso suporte!
                        </Form.Modal>
                    </Fragment>
                )}
                <Typo.Helper>
                    Já possui uma conta? <Typo.Link to="/auth/login">Logue</Typo.Link>
                </Typo.Helper>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    register: state.register
});

const mapDispatchToProps = dispatch => bindActionCreators(registerActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
