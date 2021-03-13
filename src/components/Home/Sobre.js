import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as colorActions } from '../../redux/ducks/color';

import Typo from '../Typo/index';
import Form from '../Form/index';
import Grid from '../Grid/index';

class Sobre extends Component {
    componentWillMount() {
        this.props.requestWhite();
    }
    render() {
        return (
            <Fragment>
                <Typo.Title variant="black">Sobre</Typo.Title>
                <Typo.SubTitle variant="primary">Se informe!</Typo.SubTitle>
                <Grid.Row>
                    <Grid.Col size={[{ break: 0, value: 12 }]}>
                        <Form.Paper>
                            <Typo.Heading variant="white">História</Typo.Heading>
                            <Typo.SubHeading>Como surgimos</Typo.SubHeading>
                        </Form.Paper>
                    </Grid.Col>
                    <Grid.Col
                        size={[{ break: 0, value: 12 }]}
                        margin={[{ break: 0, side: [{ name: 'top', value: '1rem' }] }]}>
                        <Form.Paper variant="primary">
                            <Typo.Heading variant="black">Missão</Typo.Heading>
                            <Typo.SubHeading variant="white">Nossos objetivos</Typo.SubHeading>
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
)(Sobre);
