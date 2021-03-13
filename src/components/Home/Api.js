import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as colorActions } from '../../redux/ducks/color';

import Typo from '../Typo/index';
import Form from '../Form/index';
import Grid from '../Grid/index';

class Api extends Component {
    componentWillMount() {
        this.props.requestBlack();
    }
    render() {
        return (
            <Fragment>
                <Typo.Title variant="white" textAlign="left">
                    Api
                </Typo.Title>
                <Typo.SubTitle variant="primary" textAlign="left">
                    Quer criar seu próprio app?
                </Typo.SubTitle>
                <Grid.Row>
                    <Grid.Col size={[{ break: 0, value: 12 }]}>
                        <Form.Paper variant="primary">
                            <Typo.Heading variant="black">Instruções</Typo.Heading>
                            <Typo.SubHeading variant="white">Como começar!</Typo.SubHeading>
                            <Typo.Paragraph>
                                Para começar, será necessário noções básicas de requisições HTTP e de APIs. Nossa API
                                utiliza a biblioteca express e conta com autenticação de Json Web Tokens. Para o
                                registro de novos Moradores, é necessário um token provido nas requisições de condomínio
                                e para as demais requisições é necessário um token do mesmo formato, provido pelas
                                requisições de morador.
                            </Typo.Paragraph>
                        </Form.Paper>
                    </Grid.Col>
                    <Grid.Col
                        size={[{ break: 0, value: 12 }]}
                        margin={[{ break: 0, side: [{ name: 'top', value: '1rem' }] }]}>
                        <Form.Paper>
                            <Typo.Heading variant="white">Lista de rotas</Typo.Heading>
                            <Typo.SubHeading>Não se perca por favor!</Typo.SubHeading>
                        </Form.Paper>
                    </Grid.Col>
                </Grid.Row>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(colorActions, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(Api);
