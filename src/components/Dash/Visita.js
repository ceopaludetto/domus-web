import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import moment from '../../utils/moment';

import Container from './Container';
import Form from '../Form/index';
import Typo from '../Typo/index';

import { Creators as visitaActions } from '../../redux/ducks/visita';

class Visita extends Component {
    constructor() {
        super();
        this.state = {
            Nome: '',
            Data: 0,
            open: false
        };
    }
    handleChange = prop => e => this.setState({ [prop]: e.target.value });
    handleCalendar = x => this.setState({ Data: x });
    handleSubmit = () => this.props.requestVisita(this.state.Nome, this.state.Data, this.handleDeleteUndo);
    handleDeleteUndo = id => () => {
        this.props.requestVisitaDelete([id]);
        toast.dismiss(id);
    };
    render() {
        return (
            <Container>
                <Typo.Title variant="white">Visita</Typo.Title>
                <Typo.SubTitle variant="primary">Reunião?</Typo.SubTitle>
                <Form.Paper>
                    <Typo.Heading>Preencha o formulário</Typo.Heading>
                    <Typo.SubHeading>Escolha a pessoa e o horário!</Typo.SubHeading>
                    <Typo.Label htmlFor="Nome">Nome do Visitante</Typo.Label>
                    <Form.Control id="Nome" value={this.state.Nome} onChange={this.handleChange('Nome')} />
                    <Typo.Label htmlFor="Data">Data de entrada</Typo.Label>
                    <Form.Calendar
                        onChange={this.handleCalendar}
                        value={moment(this.state.Data).format('DD/MM/YYYY [ás] HH:mm')}
                    />
                    <Form.Button raised block loading={this.props.visita.loadingNew} onClick={this.handleSubmit}>
                        Enviar
                    </Form.Button>
                </Form.Paper>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    visita: state.visita
});

const mapDispatchToProps = dispatch => bindActionCreators(visitaActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Visita);
