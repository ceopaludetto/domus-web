import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MdFavoriteBorder } from 'react-icons/md';
import moment from '../../utils/moment';
import styled from 'styled-components';

import Container from './Container';
import Form from '../Form/index';
import Typo from '../Typo/index';
import Grid from '../Grid/index';
import Loading from '../Loading/index';

import { Creators as moradorActions } from '../../redux/ducks/morador';

const Avatar = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    @media (max-width: ${props => props.theme.break[3].size}px) {
        width: 75px;
        height: 75px;
    }
`;

const Bottom = styled.div`
    display: flex;
    align-items: center;
    margin-top: 1rem;
`;

const Sub = styled(Typo.SubTitle)`
    margin-bottom: 0;
`;

const Margin = styled(Grid.Row)`
    margin-top: 2.5rem;
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
        this.props.requestMoradorLoadId(this.props.match.params.id);
        this.props.requestMoradorLoadPosts(this.props.match.params.id);
    }
    handleChange = prop => e => this.setState({ [prop]: e.target.value });
    handleSearch = () => this.setState(state => ({ open: !state.open }));
    render() {
        const morador = this.props.morador.morador;
        const posts = this.props.morador.posts;
        return (
            <Container>
                {this.props.morador.loading ? (
                    <Loading.Perfil />
                ) : (
                    <Fragment>
                        <Grid.Row alignItems="center">
                            <Grid.Padding visible>
                                <Avatar
                                    src={
                                        morador.MOR_STR_IMG
                                            ? `http://localhost:3001/static/morador/${morador.MOR_STR_IMG}`
                                            : require('../../assets/person.jpg')
                                    }
                                />
                            </Grid.Padding>
                            <Grid.Grow>
                                <Typo.Title variant="white">{morador.MOR_STR_NOME}</Typo.Title>
                                <Sub variant="primary">{morador.MOR_BIT_SIN ? 'Síndico' : 'Morador'}</Sub>
                            </Grid.Grow>
                            <Grid.Padding visible>
                                <Form.Button>Seguir</Form.Button>
                            </Grid.Padding>
                        </Grid.Row>
                        <Margin>
                            <Grid.Col
                                order={[{ break: 0, value: 1 }, { break: 4, value: -1 }]}
                                size={[{ break: 0, value: 12 }, { break: 4, value: 7 }]}>
                                <Grid.Row>
                                    {posts
                                        ? posts.map((p, i) => (
                                              <Grid.Col
                                                  key={p.POST_INT_ID}
                                                  size={[{ break: 0, value: 12 }]}
                                                  margin={
                                                      i === 0
                                                          ? [
                                                                { break: 0, side: [{ name: 'top', value: '1rem' }] },
                                                                { break: 4, side: [{ name: 'top', value: '0' }] }
                                                            ]
                                                          : [{ break: 0, side: [{ name: 'top', value: '1rem' }] }]
                                                  }>
                                                  <Form.Paper>
                                                      <Typo.Heading>{p.MORADOR.MOR_STR_NOME}</Typo.Heading>
                                                      <Typo.SubHeading>
                                                          {moment(p.POST_DT_DATA).calendar()}
                                                      </Typo.SubHeading>
                                                      <Typo.SubHeading helper variant="white">
                                                          {p.POST_STR_DESC}
                                                      </Typo.SubHeading>
                                                      <Bottom>
                                                          <Form.Button icon rounded>
                                                              <MdFavoriteBorder />
                                                          </Form.Button>
                                                          <Form.Button icon>Comentários</Form.Button>
                                                      </Bottom>
                                                  </Form.Paper>
                                              </Grid.Col>
                                          ))
                                        : ''}
                                </Grid.Row>
                            </Grid.Col>
                            <Grid.Col
                                order={[{ break: 0, value: 0 }, { break: 4, value: 0 }]}
                                size={[{ break: 0, value: 12 }, { break: 4, value: 5 }]}>
                                <Form.Paper>
                                    <Typo.Heading>Informações gerais</Typo.Heading>
                                    <Typo.SubHeading>Stalkerzinho!</Typo.SubHeading>
                                    <Typo.List.Unordered helper>
                                        <Typo.List.Item variant="white">
                                            Email:{' '}
                                            <Typo.Link tag="a" href={`mailto:${morador.MOR_STR_LGN}`}>
                                                {morador.MOR_STR_LGN}
                                            </Typo.Link>
                                        </Typo.List.Item>
                                        <Typo.List.Item variant="white">Telefone: {morador.MOR_STR_CEL}</Typo.List.Item>
                                        <Typo.List.Item variant="white">
                                            Data de ingressão: {moment(morador.MOR_DT_ING).calendar()}
                                        </Typo.List.Item>
                                    </Typo.List.Unordered>
                                </Form.Paper>
                            </Grid.Col>
                        </Margin>
                    </Fragment>
                )}
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    morador: state.morador
});

const mapDispatchToProps = dispatch => bindActionCreators(moradorActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Morador);
