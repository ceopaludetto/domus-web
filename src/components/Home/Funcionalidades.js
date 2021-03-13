import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as colorActions } from '../../redux/ducks/color';

import Typo from '../Typo/index';
import Form from '../Form/index';
import Grid from '../Grid/index';

class Funcionalidades extends Component {
    componentWillMount() {
        this.props.requestPrimary();
    }
    render() {
        return (
            <Fragment>
                <Typo.Title variant="white" textAlign="left">
                    Funcionalidades
                </Typo.Title>
                <Typo.SubTitle variant="black" textAlign="left">
                    Legal fera, mas pra que isso serve?.
                </Typo.SubTitle>
                <Grid.Row>
                    <Grid.Col size={[{ break: 0, value: 12 }]}>
                        <Form.Paper variant="white">
                            <Typo.Heading variant="black">Chega de planilhas!</Typo.Heading>
                            <Typo.SubHeading>É sério isso!</Typo.SubHeading>
                            <Typo.Paragraph variant="black">
                                Com o Domus você pode gerenciar todas aquelas burocracias chatas, como reservas,
                                visitas, blocos, apartamentos, locais, despesas, funcionários.
                            </Typo.Paragraph>
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
)(Funcionalidades);
