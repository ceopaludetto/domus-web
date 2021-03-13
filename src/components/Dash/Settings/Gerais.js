import React, { Component, Fragment } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as settingsActions } from '../../../redux/ducks/settings';

import Typo from '../../Typo/index';
import Form from '../../Form/index';
import Grid from '../../Grid/index';

class Gerais extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: {
                Portao: false,
                Pass: false,
                NPass: false,
                RNPass: false
            },
            Nome: '',
            Portao: '',
            Tel: '',
            Pass: '',
            NPass: '',
            RNPass: '',
            PassError: '',
            NPassError: '',
            RNPassError: '',
            modal: false
        };
    }
    handleChange = prop => e => {
        this.setState({ [prop]: e.target.value });
    };
    handleVisibility = prop => () => {
        this.setState(state => ({ visibility: { ...state.visibility, [prop]: !state.visibility[prop] } }));
    };
    handleSubmitInfo = () => {
        const { MOR_STR_NOME, MOR_INT_PSWPORTA, MOR_STR_CEL, MOR_INT_ID } = this.props.login.data.MORADOR;
        let { Nome, Portao, Tel } = this.state;
        if (Nome === '') {
            Nome = MOR_STR_NOME;
        }
        if (Portao === '') {
            Portao = MOR_INT_PSWPORTA;
        }
        if (Tel === '') {
            Tel = MOR_STR_CEL;
        }
        const finalTel = Tel.replace('-', '')
            .replace(' ', '')
            .replace('(', '')
            .replace(')', '');
        this.props.requestSettings({ MOR_STR_NOME: Nome, MOR_INT_PSWPORTA: Portao, MOR_STR_CEL: finalTel, MOR_INT_ID });
    };
    handleSubmitPass = () => {
        const { MOR_INT_ID } = this.props.login.data.MORADOR;
        const { Pass, NPass, RNPass } = this.state;
        if (Pass === NPass) {
            this.setState({ NPassError: 'Senhas iguais!' });
        } else {
            this.setState({ NPassError: '' });
        }
        if (NPass !== RNPass) {
            this.setState({ RNPassError: 'As senhas não condizem!' });
        } else {
            this.setState({ RNPassError: '' });
        }
        this.props.requestSettingsPass({ MOR_INT_ID, MOR_STR_OLDPSW: Pass, MOR_STR_PSW: NPass });
    };
    handleModal = () => this.setState(state => ({ modal: !state.modal }));
    render() {
        return (
            <Fragment>
                <Grid.Row>
                    <Grid.Col size={[{ break: 0, value: 12 }]}>
                        <Form.Paper>
                            <Typo.Heading>Informações Gerais</Typo.Heading>
                            <Typo.SubHeading>Aquilo que todos veêm!</Typo.SubHeading>
                            <Typo.Label htmlFor="Nome">Nome</Typo.Label>
                            <Form.Control
                                id="Nome"
                                value={!!this.state.Nome ? this.state.Nome : this.props.login.data.MORADOR.MOR_STR_NOME}
                                onChange={this.handleChange('Nome')}
                            />
                            <Typo.Label htmlFor="Email">E-mail</Typo.Label>
                            <Form.Control id="Email" value={this.props.login.data.MORADOR.MOR_STR_LGN} disabled />
                            <Grid.Row>
                                <Grid.Col size={[{ break: 0, value: 12 }, { break: 3, value: 6 }]}>
                                    <Typo.Label htmlFor="Tel">Telefone</Typo.Label>
                                    <Form.Control
                                        id="Tel"
                                        value={
                                            !!this.state.Tel
                                                ? this.state.Tel
                                                : this.props.login.data.MORADOR.MOR_STR_CEL
                                        }
                                        onChange={this.handleChange('Tel')}
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
                                        helper
                                    />
                                    <Typo.Helper>
                                        <Typo.Link onClick={this.handleModal} tag="span">
                                            Por que isso é importante?
                                        </Typo.Link>
                                    </Typo.Helper>
                                </Grid.Col>
                                <Grid.Col size={[{ break: 0, value: 12 }, { break: 3, value: 6 }]}>
                                    <Typo.Label htmlFor="Portao">Senha do Portão</Typo.Label>
                                    <Form.Control
                                        id="Portao"
                                        helper
                                        prepend={this.props.login.data.MORADOR.CONDOMINIO.COND_STR_CARAC}
                                        value={
                                            !!this.state.Portao
                                                ? this.state.Portao
                                                : this.props.login.data.MORADOR.MOR_INT_PSWPORTA
                                        }
                                        onChange={this.handleChange('Portao')}
                                        type={this.state.visibility.Portao ? 'text' : 'password'}
                                        append={
                                            <Form.Button
                                                variant="white"
                                                icon
                                                rounded
                                                onClick={this.handleVisibility('Portao')}>
                                                {this.state.visibility.Portao ? <MdVisibilityOff /> : <MdVisibility />}
                                            </Form.Button>
                                        }
                                    />
                                    <Typo.Bold margin>Isso é realmente importante!</Typo.Bold>
                                </Grid.Col>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Col textAlign={[{ break: 0, value: 'right' }]}>
                                    <Form.Button
                                        raised
                                        block
                                        onClick={this.handleSubmitInfo}
                                        loading={this.props.settings.loading}>
                                        Alterar
                                    </Form.Button>
                                </Grid.Col>
                            </Grid.Row>
                        </Form.Paper>
                    </Grid.Col>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Col
                        size={[{ break: 0, value: 12 }, { break: 3, value: 6 }]}
                        margin={[{ break: 0, side: [{ name: 'top', value: '1rem' }] }]}>
                        <Form.Paper>
                            <Typo.Heading>Senha</Typo.Heading>
                            <Typo.SubHeading>Não passe ela à ninguém!</Typo.SubHeading>
                            <Typo.Label
                                htmlFor="Pass"
                                error={this.props.settings.failure ? this.props.settings.data.ERROR : ''}>
                                Senha Atual
                            </Typo.Label>
                            <Form.Control
                                id="Pass"
                                helper
                                type={this.state.visibility.Pass ? 'text' : 'password'}
                                value={this.state.Pass}
                                onChange={this.handleChange('Pass')}
                                error={this.props.settings.failure}
                                append={
                                    <Form.Button variant="white" icon rounded onClick={this.handleVisibility('Pass')}>
                                        {this.state.visibility.Pass ? <MdVisibilityOff /> : <MdVisibility />}
                                    </Form.Button>
                                }
                            />
                            <Typo.Helper margin>
                                <Typo.Link to="/auth/forgot">Esqueceu sua senha?</Typo.Link>
                            </Typo.Helper>
                            <Typo.Label htmlFor="NPass" error={!!this.state.NPassError ? this.state.NPassError : ''}>
                                Nova Senha
                            </Typo.Label>
                            <Form.Control
                                id="NPass"
                                type={this.state.visibility.NPass ? 'text' : 'password'}
                                value={this.state.NPass}
                                onChange={this.handleChange('NPass')}
                                error={!!this.state.NPassError}
                                append={
                                    <Form.Button variant="white" icon rounded onClick={this.handleVisibility('NPass')}>
                                        {this.state.visibility.NPass ? <MdVisibilityOff /> : <MdVisibility />}
                                    </Form.Button>
                                }
                            />
                            <Typo.Label htmlFor="RNPass" error={!!this.state.RNPassError ? this.state.RNPassError : ''}>
                                Repetir Nova Senha
                            </Typo.Label>
                            <Form.Control
                                id="RNPass"
                                type={this.state.visibility.RNPass ? 'text' : 'password'}
                                value={this.state.RNPass}
                                onChange={this.handleChange('RNPass')}
                                error={!!this.state.RNPassError}
                                append={
                                    <Form.Button variant="white" icon rounded onClick={this.handleVisibility('RNPass')}>
                                        {this.state.visibility.RNPass ? <MdVisibilityOff /> : <MdVisibility />}
                                    </Form.Button>
                                }
                            />
                            <Grid.Row>
                                <Grid.Col textAlign={[{ break: 0, value: 'right' }]}>
                                    <Form.Button
                                        raised
                                        block
                                        onClick={this.handleSubmitPass}
                                        loading={this.props.settings.loading}>
                                        Alterar
                                    </Form.Button>
                                </Grid.Col>
                            </Grid.Row>
                        </Form.Paper>
                    </Grid.Col>
                    <Grid.Col
                        size={[{ break: 0, value: 12 }, { break: 3, value: 6 }]}
                        margin={[{ break: 0, side: [{ name: 'top', value: '1rem' }] }]}>
                        <Form.Paper variant="primary">
                            <Typo.Heading variant="black">Dicas de senha</Typo.Heading>
                            <Typo.SubHeading variant="white">Passem elas à todos!</Typo.SubHeading>
                            <Typo.List.Unordered helper>
                                <Typo.List.Item inverted>Pelo menos oito caracteres!</Typo.List.Item>
                                <Typo.List.Item inverted>Pelo menos um número!</Typo.List.Item>
                                <Typo.List.Item inverted>Um caractere deve ser maiúsculo!</Typo.List.Item>
                                <Typo.List.Item inverted>Ideal que seja de fácil lembrança!</Typo.List.Item>
                            </Typo.List.Unordered>
                        </Form.Paper>
                    </Grid.Col>
                </Grid.Row>
                <Form.Modal title="Por que isso é importante?" open={this.state.modal} closeClick={this.handleModal}>
                    Por motivo nenhum
                </Form.Modal>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    login: state.login,
    settings: state.settings
});

const mapDispatchTopProps = dispatch => bindActionCreators(settingsActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchTopProps
)(Gerais);
