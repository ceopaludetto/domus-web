import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MdSearch } from 'react-icons/md';
import styled from 'styled-components';

import Container from './Container';
import Form from '../Form/index';
import Typo from '../Typo/index';
import Grid from '../Grid/index';
import Loading from '../Loading/index';

import { Creators as moradorActions } from '../../redux/ducks/morador';

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

const Item = styled(Grid.Row)`
    margin-top: ${props => (props.first ? '2.5rem' : '1rem')};
`;

const Center = styled(Grid.Padding)`
    display: flex;
    align-items: center;
`;

class Morador extends Component {
    constructor() {
        super();
        this.state = {
            search: '',
            open: false
        };
    }
    componentWillMount() {
        this.props.requestMoradorLoad();
    }
    handleChange = prop => e => this.setState({ [prop]: e.target.value });
    handleSearch = () => this.setState(state => ({ open: !state.open }));
    render() {
        const { search } = this.state;
        const moradores = this.props.morador.moradores;
        return (
            <Container>
                {this.props.morador.loading ? (
                    <Loading.Component />
                ) : (
                    <Fragment>
                        <Typo.Title variant="white">Moradores</Typo.Title>
                        <Typo.SubTitle variant="primary">Hora de interagir!</Typo.SubTitle>
                        <Form.Paper>
                            <Grid.Row alignItems="center">
                                <Grid.Grow>
                                    {this.state.open ? (
                                        <Form.Control
                                            helper
                                            onChange={this.handleChange('search')}
                                            value={this.state.search}
                                        />
                                    ) : (
                                        <Fragment>
                                            <Typo.Heading>Lista de moradores</Typo.Heading>
                                            <Typo.SubHeading helper>
                                                Clique no nome para visitar perfil!
                                            </Typo.SubHeading>
                                        </Fragment>
                                    )}
                                </Grid.Grow>
                                <Grid.Padding visible>
                                    <Form.Button rounded icon onClick={this.handleSearch}>
                                        <MdSearch />
                                    </Form.Button>
                                </Grid.Padding>
                            </Grid.Row>
                            {moradores
                                .filter(m => m.MOR_INT_ID !== this.props.login.data.MORADOR.MOR_INT_ID)
                                .filter(m => {
                                    if (search) {
                                        let rgx = `${search}`;
                                        let rg = new RegExp(rgx, 'gmi');
                                        return rg.test(m.MOR_STR_NOME);
                                    } else {
                                        return m;
                                    }
                                })
                                .map((m, i) => (
                                    <Item alignItems="center" first={i === 0} key={m.MOR_INT_ID}>
                                        <Center visible>
                                            <Avatar
                                                src={
                                                    m.MOR_STR_IMG
                                                        ? `http://localhost:3001/static/morador/${m.MOR_STR_IMG}`
                                                        : require('../../assets/person.jpg')
                                                }
                                            />
                                        </Center>
                                        <Grid.Grow>
                                            <Typo.Link variant="white" to={`/app/morador/${m.MOR_INT_ID}`} helper={1}>
                                                {m.MOR_STR_NOME}
                                            </Typo.Link>
                                            {m.MOR_BIT_SIN && (
                                                <Typo.Bold variant="primary" helper={1} table>
                                                    Síndico
                                                </Typo.Bold>
                                            )}
                                        </Grid.Grow>
                                    </Item>
                                ))}
                        </Form.Paper>
                    </Fragment>
                )}
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    morador: state.morador,
    login: state.login
});

const mapDispatchToProps = dispatch => bindActionCreators(moradorActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Morador);
