import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Container from './Container';
import Form from '../Form/index';
import Typo from '../Typo/index';

import { Creators as assistenciaActions } from '../../redux/ducks/assistencia';

class Assistencia extends Component {
    constructor() {
        super();
        this.state = {
            Titulo: '',
            Desc: '',
            checked: 0
        };
    }
    handleChange = prop => e => this.setState({ [prop]: e.target.value });
    handleChecked = prop => () => this.setState({ checked: prop });
    handleSubmit = () => {
        const { Titulo, Desc, checked } = this.state;
        this.props.requestAssistencia(Titulo, Desc, checked);
    };
    render() {
        return (
            <Container>
                <Typo.Title variant="white">Assistência</Typo.Title>
                <Typo.SubTitle variant="primary">Como posso ajudar?</Typo.SubTitle>
                <Form.Paper>
                    <Typo.Heading>Preencha o formulário</Typo.Heading>
                    <Typo.SubHeading>Responderemos no e-mail solicitante!</Typo.SubHeading>
                    <Typo.Label htmlFor="Titulo">Título</Typo.Label>
                    <Form.Control id="Titulo" value={this.state.Titulo} onChange={this.handleChange('Titulo')} />
                    <Typo.Label>Tipo</Typo.Label>
                    <Form.Radio
                        text="Dispositivo"
                        checked={this.state.checked === 'dispositivo'}
                        onClick={this.handleChecked('dispositivo')}
                    />
                    <Form.Radio
                        text="Aplicativo"
                        checked={this.state.checked === 'aplicativo'}
                        onClick={this.handleChecked('aplicativo')}
                    />
                    <Form.Radio
                        text="Aplicação Web"
                        checked={this.state.checked === 'aplicacao'}
                        onClick={this.handleChecked('aplicacao')}
                    />
                    <Typo.Label htmlFor="Desc">Descrição</Typo.Label>
                    <Form.Control
                        id="Desc"
                        value={this.state.Desc}
                        onChange={this.handleChange('Desc')}
                        tag="textarea"
                        counter={1}
                        maxLength={320}
                    />
                    <Form.Button raised block loading={this.props.assistencia.loading} onClick={this.handleSubmit}>
                        Enviar
                    </Form.Button>
                </Form.Paper>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    assistencia: state.assistencia
});

const mapDispatchToProps = dispatch => bindActionCreators(assistenciaActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Assistencia);
