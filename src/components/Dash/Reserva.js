import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import moment from '../../utils/moment';

import Container from './Container';
import Form from '../Form/index';
import Typo from '../Typo/index';

import { Creators as reservaActions } from '../../redux/ducks/reserva';
import { Creators as localActions } from '../../redux/ducks/local';

class Reserva extends Component {
    constructor() {
        super();
        this.state = {
            Qtde: '',
            Data: 0,
            DataTer: 0,
            Loc: -1,
            open: false
        };
    }
    componentWillMount() {
        this.props.actions.requestLocalLoad();
    }
    handleChange = prop => e => this.setState({ [prop]: e.target.value });
    handleCalendar = (x, y) => this.setState({ Data: x, DataTer: y });
    handleSubmit = () =>
        this.props.actions.requestReserva(
            this.state.Qtde,
            this.state.Data,
            this.state.DataTer,
            this.state.Loc,
            this.handleDeleteUndo
        );
    handleDeleteUndo = id => () => {
        this.props.actions.requestReservaDelete([id]);
        toast.dismiss(id);
    };
    render() {
        return (
            <Container>
                <Typo.Title variant="white">Reserva</Typo.Title>
                <Typo.SubTitle variant="primary">House Party?</Typo.SubTitle>
                <Form.Paper>
                    <Typo.Heading>Preencha o formulário</Typo.Heading>
                    <Typo.SubHeading>Escolha o local, o horário e a quantidade!</Typo.SubHeading>
                    <Typo.Label htmlFor="Qtde">Quantidade de pessoas</Typo.Label>
                    <Form.Control
                        helper
                        id="Qtde"
                        type="number"
                        value={this.state.Qtde}
                        onChange={this.handleChange('Qtde')}
                    />
                    <Typo.Bold margin>
                        O local selecionado suporta:{' '}
                        {this.state.Loc === -1
                            ? '0'
                            : this.props.local.locais.filter(l => l.LOC_INT_ID === Number(this.state.Loc))[0]
                                  .LOC_INT_QTDE}{' '}
                        pessoas
                    </Typo.Bold>
                    <Typo.Label htmlFor="Loc">Local</Typo.Label>
                    <Form.Select id="Loc" value={this.state.Loc} onChange={this.handleChange('Loc')}>
                        <option value={-1}>Selecione um local</option>
                        {this.props.local.locais.map(l => (
                            <option key={l.LOC_INT_ID} value={l.LOC_INT_ID}>
                                {l.LOC_STR_NOME}
                            </option>
                        ))}
                    </Form.Select>
                    <Typo.Label htmlFor="Data">Data de início e término</Typo.Label>
                    <Form.Calendar
                        range
                        onChange={this.handleCalendar}
                        value={`${moment(this.state.Data).format('DD/MM/YYYY [dás] HH:mm')} até ás ${moment(
                            this.state.DataTer
                        ).format('HH:mm')}`}
                    />
                    <Form.Button raised block loading={this.props.reserva.loadingNew} onClick={this.handleSubmit}>
                        Enviar
                    </Form.Button>
                </Form.Paper>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    reserva: state.reserva,
    local: state.local
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, reservaActions, localActions), dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reserva);
