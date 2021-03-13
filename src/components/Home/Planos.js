import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as colorActions } from '../../redux/ducks/color';

import Typo from '../Typo/index';
import Form from '../Form/index';
import Grid from '../Grid/index';

class Planos extends Component {
    componentWillMount() {
        this.props.requestPrimary();
    }
    render() {
        return (
            <Fragment>
                <Typo.Title variant="white">Planos</Typo.Title>
                <Typo.SubTitle>É hora das finanças!</Typo.SubTitle>
                <Grid.Row>
                    <Grid.Col size={[{ break: 0, value: 12 }, { break: 3, value: 4 }]}>
                        <Form.Paper variant="white">
                            <Typo.Heading variant="black">Plano Vizinhança</Typo.Heading>
                            <Typo.SubHeading>R$ 200,00</Typo.SubHeading>
                            <Typo.List.Unordered>
                                <Typo.List.Item>Até 90 apartamentos</Typo.List.Item>
                                <Typo.List.Item>Pequeno</Typo.List.Item>
                                <Typo.List.Item dashed>Mais de um síndico</Typo.List.Item>
                                <Typo.List.Item dashed>Preferência de atendimento</Typo.List.Item>
                                <Typo.List.Item dashed>Número ilimitado de portões</Typo.List.Item>
                            </Typo.List.Unordered>
                        </Form.Paper>
                    </Grid.Col>
                    <Grid.Col
                        size={[{ break: 0, value: 12 }, { break: 3, value: 4 }]}
                        margin={[
                            { break: 3, side: [{ name: 'top', value: '0px!important' }] },
                            { break: 0, side: [{ name: 'top', value: '1rem' }] }
                        ]}>
                        <Form.Paper variant="white">
                            <Typo.Heading variant="black">Plano Bairro</Typo.Heading>
                            <Typo.SubHeading>R$ 500,00</Typo.SubHeading>
                            <Typo.List.Unordered>
                                <Typo.List.Item>De 91 até 181 apartamentos</Typo.List.Item>
                                <Typo.List.Item>Médio</Typo.List.Item>
                                <Typo.List.Item>Mais de um síndico</Typo.List.Item>
                                <Typo.List.Item dashed>Preferência de atendimento</Typo.List.Item>
                                <Typo.List.Item dashed>Número ilimitado de portões</Typo.List.Item>
                            </Typo.List.Unordered>
                        </Form.Paper>
                    </Grid.Col>
                    <Grid.Col
                        size={[{ break: 0, value: 12 }, { break: 3, value: 4 }]}
                        margin={[
                            { break: 3, side: [{ name: 'top', value: '0px!important' }] },
                            { break: 0, side: [{ name: 'top', value: '1rem' }] }
                        ]}>
                        <Form.Paper variant="white">
                            <Typo.Heading variant="black">Plano Cidade</Typo.Heading>
                            <Typo.SubHeading>R$ 1000,00</Typo.SubHeading>
                            <Typo.List.Unordered>
                                <Typo.List.Item>200 ou mais apartamentos</Typo.List.Item>
                                <Typo.List.Item>Grande</Typo.List.Item>
                                <Typo.List.Item>Mais de um síndico</Typo.List.Item>
                                <Typo.List.Item>Preferência de atendimento</Typo.List.Item>
                                <Typo.List.Item>Número ilimitado de portões</Typo.List.Item>
                            </Typo.List.Unordered>
                        </Form.Paper>
                    </Grid.Col>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Col
                        size={[{ break: 0, value: 12 }]}
                        margin={[{ break: 0, side: [{ name: 'top', value: '2rem' }] }]}>
                        <Form.Paper>
                            <Typo.Heading variant="white">Qual plano escolher?</Typo.Heading>
                            <Typo.SubHeading>Indecisão é a semente da sabedoria</Typo.SubHeading>
                            <Typo.Paragraph>
                                O principal parâmetro a ser analizado, é o tamanho de seu condomínio, estruturas grandes
                                e complexas em seu número devem optar pelo Plano Cidade, porque ele comporta mais de 200
                                apartamentos. Outro parâmetro comum a se analisar, é o número de síndicos que seu
                                condomínio contém, já que condomínios de porte maior tendem a ter mais de um síndico, as
                                vezes separados por bloco ou por regiões.
                            </Typo.Paragraph>
                            <Typo.Paragraph>
                                O número de portões condiz também com o porte do condomínio. Condomínios que possuem o
                                porte grande, supostamente, possuem mais de um portão, necessitando então de mais
                                dispostivos Domus.
                            </Typo.Paragraph>
                            <Typo.Paragraph>
                                É importante ressaltar que o preço do plano deve ser cobrado conjuntamente com todos os
                                residentes do condomínio e que dessa forma, a fatura fique acessível a todos.
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
)(Planos);
