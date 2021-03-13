import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as condominioActions } from '../../../redux/ducks/condominio';
import { MdReceipt } from 'react-icons/md';

import Typo from '../../Typo/index';
import Form from '../../Form/index';
import Grid from '../../Grid/index';

class Condominio extends Component {
    constructor(props) {
        super(props);
        this.component = React.createRef();
        this.state = {
            Nome: '',
            End: '',
            Aptos: 0,
            Carac: '',
            modal: false
        };
    }
    componentWillMount() {
        this.props.requestCondominioToken(this.props.login.data.MORADOR.CONDOMINIO.COND_INT_ID);
    }
    handleChange = prop => e => {
        this.setState({ [prop]: e.target.value });
    };
    handleCopy = () => {
        document.querySelector('#Link').select();
        document.execCommand('copy');
    };
    handleSubmitInfo = () => {
        const {
            COND_STR_NOME,
            COND_INT_APTOS,
            COND_STR_CARAC,
            COND_STR_END,
            COND_INT_ID
        } = this.props.login.data.MORADOR.CONDOMINIO;
        let { Nome, End, Aptos, Carac } = this.state;
        if (Nome === '') {
            Nome = COND_STR_NOME;
        }
        if (End === '') {
            End = COND_STR_END;
        }
        if (Aptos === '') {
            Aptos = COND_INT_APTOS;
        }
        if (Carac === '') {
            Carac = COND_STR_CARAC;
        }
        this.props.requestCondominio(Nome, End, Aptos, Carac, COND_INT_ID, this.props.login.data.MORADOR.MOR_INT_ID);
    };
    handleModal = () => this.setState(state => ({ modal: !state.modal }));
    render() {
        const Link = this.props.condominio.data.TOKEN ? this.props.condominio.data.TOKEN : '';
        return (
            <Fragment>
                <Grid.Row>
                    <Grid.Col size={[{ break: 0, value: 12 }]}>
                        <Form.Paper>
                            <Typo.Heading>Registro de moradores</Typo.Heading>
                            <Typo.SubHeading>Endereço de registro</Typo.SubHeading>
                            <Typo.Label htmlFor="Link">Link</Typo.Label>
                            <Form.Control
                                id="Link"
                                value={`http://localhost:3000/auth/registro/${Link}`}
                                append={
                                    <Form.Button variant="white" icon rounded onClick={this.handleCopy}>
                                        <MdReceipt />
                                    </Form.Button>
                                }
                                helper
                                readOnly
                            />
                            <Typo.Bold margin>Clique no ícone para copiar</Typo.Bold>
                        </Form.Paper>
                    </Grid.Col>
                    <Grid.Col
                        size={[{ break: 0, value: 12 }]}
                        margin={[{ break: 0, side: [{ name: 'top', value: '1rem' }] }]}>
                        <Form.Paper>
                            <Typo.Heading>Informações do Condomínio</Typo.Heading>
                            <Typo.SubHeading>Só síndicos por aqui!</Typo.SubHeading>
                            <Typo.Label htmlFor="Nome">Nome</Typo.Label>
                            <Form.Control
                                id="Nome"
                                value={
                                    !!this.state.Nome
                                        ? this.state.Nome
                                        : this.props.login.data.MORADOR.CONDOMINIO.COND_STR_NOME
                                }
                                onChange={this.handleChange('Nome')}
                            />
                            <Typo.Label htmlFor="End">Endereço</Typo.Label>
                            <Form.Control
                                id="End"
                                value={
                                    !!this.state.End
                                        ? this.state.End
                                        : this.props.login.data.MORADOR.CONDOMINIO.COND_STR_END
                                }
                                onChange={this.handleChange('End')}
                            />
                            <Grid.Row>
                                <Grid.Col size={[{ break: 0, value: 12 }, { break: 3, value: 6 }]}>
                                    <Typo.Label htmlFor="Aptos">Número de apartamentos</Typo.Label>
                                    <Form.Control
                                        id="Aptos"
                                        value={
                                            !!this.state.Aptos
                                                ? this.state.Aptos
                                                : this.props.login.data.MORADOR.CONDOMINIO.COND_INT_APTOS
                                        }
                                        onChange={this.handleChange('Aptos')}
                                        helper
                                    />
                                    <Typo.Bold margin>
                                        Isso define o número máximo de registros de apartamento!
                                    </Typo.Bold>
                                </Grid.Col>
                                <Grid.Col size={[{ break: 0, value: 12 }, { break: 3, value: 6 }]}>
                                    <Typo.Label htmlFor="Carac">Caractere especial do portão</Typo.Label>
                                    <Form.Control
                                        id="Carac"
                                        helper
                                        value={
                                            !!this.state.Carac
                                                ? this.state.Carac
                                                : this.props.login.data.MORADOR.CONDOMINIO.COND_STR_CARAC
                                        }
                                        onChange={this.handleChange('Carac')}
                                    />
                                    <Typo.Helper>
                                        <Typo.Link onClick={this.handleModal} tag="span">
                                            Por que isso é importante?
                                        </Typo.Link>
                                    </Typo.Helper>
                                </Grid.Col>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Col textAlign={[{ break: 0, value: 'right' }]}>
                                    <Form.Button
                                        raised
                                        block
                                        onClick={this.handleSubmitInfo}
                                        loading={this.props.condominio.loading}>
                                        Alterar
                                    </Form.Button>
                                </Grid.Col>
                            </Grid.Row>
                        </Form.Paper>
                    </Grid.Col>
                </Grid.Row>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    login: state.login,
    condominio: state.condominio
});

const mapDispatchTopProps = dispatch => bindActionCreators(condominioActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchTopProps
)(Condominio);
