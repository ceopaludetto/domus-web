import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as colorActions } from '../../redux/ducks/color';
import { Creators as contatoActions } from '../../redux/ducks/contato';
import { MdAdd } from 'react-icons/md';

import Typo from '../Typo/index';
import Form from '../Form/index';

class Contato extends Component {
    constructor() {
        super();
        this.state = {
            Checked: 0,
            Nome: '',
            Email: '',
            End: '',
            Apto: 0,
            Mensagem: ''
        };
    }
    componentWillMount() {
        this.props.actions.requestBlack();
    }
    handleAdd = () => this.setState(state => ({ Apto: Number(state.Apto) + 1 }));
    handleCheck = prop => () => this.setState({ Checked: prop, End: '', Apto: '' });
    handleChange = prop => e => this.setState({ [prop]: e.target.value });
    handleSubmit = () => {
        const { Nome, Email, End, Mensagem, Apto } = this.state;
        this.props.actions.requestContato(Nome, Email, End, Mensagem, Apto);
    };
    render() {
        return (
            <Fragment>
                <Typo.Title variant="white">Contato</Typo.Title>
                <Typo.SubTitle variant="primary">Converse conosco!</Typo.SubTitle>
                <Form.Paper>
                    <Typo.Label htmlFor="Nome" required>
                        Nome
                    </Typo.Label>
                    <Form.Control id="Nome" value={this.state.Nome} onChange={this.handleChange('Nome')} />
                    <Typo.Label htmlFor="Email" required>
                        E-mail
                    </Typo.Label>
                    <Form.Control id="Email" value={this.state.Email} onChange={this.handleChange('Email')} />
                    <Typo.Label>Motivo do Contato</Typo.Label>
                    <Form.Radio
                        text="Tenho um condomínio"
                        checked={this.state.Checked === 0}
                        onClick={this.handleCheck(0)}
                    />
                    <Form.Radio text="Interesse" checked={this.state.Checked === 1} onClick={this.handleCheck(1)} />
                    <Form.Radio text="Outro" checked={this.state.Checked === 2} onClick={this.handleCheck(2)} />
                    {this.state.Checked === 0 ? (
                        <Fragment>
                            <Typo.Label htmlFor="End">Endereço</Typo.Label>
                            <Form.Control id="End" value={this.state.End} onChange={this.handleChange('End')} />
                            <Typo.Label htmlFor="Apto">Número de apartamentos</Typo.Label>
                            <Form.Control
                                id="Apto"
                                type="number"
                                value={this.state.Apto}
                                onChange={this.handleChange('Apto')}
                                append={
                                    <Form.Button variant="white" rounded icon onClick={this.handleAdd}>
                                        <MdAdd />
                                    </Form.Button>
                                }
                            />
                        </Fragment>
                    ) : (
                        ''
                    )}
                    <Typo.Label htmlFor="Mensagem" required>
                        Mensagem
                    </Typo.Label>
                    <Form.Control
                        id="Mensagem"
                        tag="textarea"
                        counter={1}
                        value={this.state.Mensagem}
                        onChange={this.handleChange('Mensagem')}
                        maxLength={500}
                    />
                    <Form.Button block raised onClick={this.handleSubmit} loading={this.props.contato.loading}>
                        Enviar
                    </Form.Button>
                </Form.Paper>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    contato: state.contato
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, colorActions, contatoActions), dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Contato);
