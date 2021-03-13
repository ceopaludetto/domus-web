import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { MdFavoriteBorder, MdAdd, MdCheck, MdClose, MdEdit, MdDelete, MdInfo, MdRemove } from 'react-icons/md';
import moment from '../../utils/moment';
import styled from 'styled-components';

import { Creators as postActions } from '../../redux/ducks/post';
import { Creators as votacaoActions } from '../../redux/ducks/votacao';
import { Creators as regraActions } from '../../redux/ducks/regra';
import { Creators as votoActions } from '../../redux/ducks/voto';
import { Creators as comunicadoActions } from '../../redux/ducks/comunicado';

import Container from './Container';

import Grid from '../Grid/index';
import Form from '../Form/index';
import Typo from '../Typo/index';
import Loading from '../Loading/index';

const Bottom = styled.div`
    display: flex;
    align-items: center;
    margin-top: 1rem;
`;

const Row = styled(Grid.Row)`
    margin-top: ${props => (props.first ? '1.5rem' : '0.75rem')};
    &:hover {
        div:nth-child(2) {
            opacity: 1;
        }
    }
`;

const Margin = styled.div`
    margin-top: 1.5rem;
`;

const ButtonInfo = styled(Form.Button)`
    margin-right: 0.5rem;
`;

const ButtonRegra = styled.span`
    display: inline-block;
    padding: 12px;
    font-size: 0.875rem;
    margin-right: 0.5rem;
    box-sizing: border-box;
    line-height: 0.7;
    font-weight: 600;
    border-radius: 50%;
    border: none;
    position: relative;
    color: ${props => props.theme.color[props.variant]};
`;

ButtonRegra.defaultProps = {
    variant: 'primary'
};

class Home extends Component {
    constructor() {
        super();
        this.state = {
            Post: '',
            Voto: '',
            Desc: '',
            Regra: '',
            Titulo: '',
            ComuDesc: '',
            errorPost: '',
            errorVoto: '',
            errorDesc: '',
            errorRegra: '',
            errorTitulo: '',
            errorComuDesc: '',
            newVoto: false,
            newRegra: false,
            newComunicado: false,
            editVoto: false,
            editRegra: false,
            editComunicado: false,
            editVotoID: 0,
            editRegraID: 0,
            editComunicadoID: 0,
            open: 0,
            openVot: 0,
            openRegra: 0,
            openComu: 0,
            openComuDesc: 0
        };
    }
    componentWillMount() {
        if (!this.props.post.posts.length) this.props.actions.requestPostLoad();
        if (!this.props.votacao.votacoes.length) this.props.actions.requestVotacaoLoad();
        if (!this.props.regra.regras.length) this.props.actions.requestRegraLoad();
        if (!this.props.comunicado.comunicados.length) this.props.actions.requestComunicadoLoad();
    }
    handleChange = prop => e => this.setState({ [prop]: e.target.value });
    handleDeleteUndo = (prop, value) => () => {
        if (prop === 'regra') {
            this.props.actions.requestRegraDelete(value.id);
            toast.dismiss(value.id);
        }
        if (prop === 'votacao') {
            this.props.actions.requestVotacaoDelete(value.id);
            toast.dismiss(value.id);
        }
        if (prop === 'comunicado') {
            this.props.actions.requestComunicadoDelete(value.id);
            toast.dismiss(value.id);
        }
    };
    handleAddUndo = (prop, value) => () => {
        if (prop === 'regra') {
            this.props.actions.requestRegra(value.desc);
            toast.dismiss(value.id);
        }
        if (prop === 'votacao') {
            this.props.actions.requestVotacao(value.titulo, value.desc);
            toast.dismiss(value.id);
        }
        if (prop === 'comunicado') {
            this.props.actions.requestComunicado(value.titulo, value.desc);
            toast.dismiss(value.id);
        }
    };
    handleEditUndo = (prop, value) => () => {
        if (prop === 'regra') {
            this.props.actions.requestRegraEdit(value.desc, value.id);
            toast.dismiss(value.id);
        }
        if (prop === 'votacao') {
            this.props.actions.requestVotacaoEdit(value.titulo, value.desc, value.id);
            toast.dismiss(value.id);
        }
        if (prop === 'comunicado') {
            this.props.actions.requestComunicadoEdit(value.titulo, value.desc, value.id);
            toast.dismiss(value.id);
        }
    };
    handleSubmit = prop => () => {
        if (prop === 'post') {
            if (this.state.Post.trim() !== '') {
                this.props.actions.requestPost(this.state.Post);
            } else {
                this.setState({ errorPost: 'Escreva alguma coisa!' });
            }
        }
        if (prop === 'voto') {
            if (this.state.Voto.trim() === '') {
                this.setState({ errorVoto: 'Escreva alguma coisa!' });
            }
            if (this.state.Desc.trim() === '') {
                this.setState({ errorDesc: 'Escreva alguma coisa!' });
            }
            if (this.state.Desc.trim() !== '' && this.state.Voto.trim() !== '') {
                this.props.actions.requestVotacao(this.state.Voto, this.state.Desc, this.handleDeleteUndo);
                this.setState({ Voto: '', Desc: '', newVoto: false });
            }
        }
        if (prop === 'editVoto') {
            if (this.state.Voto.trim() === '') {
                this.setState({ errorVoto: 'Escreva alguma coisa!' });
            }
            if (this.state.Desc.trim() === '') {
                this.setState({ errorDesc: 'Escreva alguma coisa!' });
            }
            if (this.state.Desc.trim() !== '' && this.state.Voto.trim() !== '') {
                const votacao = this.props.votacao.votacoes.filter(x => x.VOT_INT_ID === this.state.editVotoID)[0];
                this.props.actions.requestVotacaoEdit(
                    this.state.Voto,
                    this.state.Desc,
                    this.state.editVotoID,
                    this.handleEditUndo,
                    votacao.VOT_STR_TITULO,
                    votacao.VOT_STR_DESC
                );
                this.setState({ Voto: '', Desc: '', newVoto: false, editVoto: false, editVotoID: 0 });
            }
        }
        if (prop === 'regra') {
            if (this.state.Regra.trim() === '') {
                this.setState({ errorRegra: 'Escreva alguma coisa!' });
            } else {
                this.props.actions.requestRegra(this.state.Regra, this.handleDeleteUndo);
                this.setState({ Regra: '', newRegra: false });
            }
        }
        if (prop === 'editRegra') {
            if (this.state.Regra.trim() === '') {
                this.setState({ errorRegra: 'Escreva alguma coisa!' });
            } else {
                const reg = this.props.regra.regras.filter(x => x.REG_INT_ID === this.state.editRegraID)[0];
                this.props.actions.requestRegraEdit(
                    this.state.Regra,
                    this.state.editRegraID,
                    this.handleEditUndo,
                    reg.REG_STR_DESC
                );
                this.setState({ Regra: '', newRegra: false, editRegra: false, editRegraID: 0 });
            }
        }
        if (prop === 'comunicado') {
            if (this.state.Titulo.trim() === '') {
                this.setState({ errorTitulo: 'Escreva alguma coisa!' });
            }
            if (this.state.ComuDesc.trim() === '') {
                this.setState({ errorComuDesc: 'Escreva alguma coisa!' });
            }
            if (this.state.Titulo.trim() !== '' && this.state.ComuDesc.trim() !== '') {
                this.props.actions.requestComunicado(this.state.Titulo, this.state.ComuDesc, this.handleDeleteUndo);
                this.setState({ Titulo: '', ComuDesc: '', newComunicado: false });
            }
        }
        if (prop === 'editComunicado') {
            if (this.state.Titulo.trim() === '') {
                this.setState({ errorTitulo: 'Escreva alguma coisa!' });
            }
            if (this.state.ComuDesc.trim() === '') {
                this.setState({ errorComuDesc: 'Escreva alguma coisa!' });
            }
            if (this.state.Titulo.trim() !== '' && this.state.ComuDesc.trim() !== '') {
                const comu = this.props.comunicado.comunicados.filter(
                    x => x.COMU_INT_ID === this.state.editComunicadoID
                )[0];
                this.props.actions.requestComunicadoEdit(
                    this.state.Titulo,
                    this.state.ComuDesc,
                    this.state.editComunicadoID,
                    this.handleEditUndo,
                    comu.COMU_STR_TIT,
                    comu.COMU_STR_DESC
                );
                this.setState({
                    Titulo: '',
                    ComuDesc: '',
                    newComunicado: false,
                    editComunicado: false,
                    editComunicadoID: 0
                });
            }
        }
    };
    handleVoto = prop => () => this.props.actions.requestVoto(prop.ID, prop.OPCAO);
    handleVotoEdit = prop => () => this.props.actions.requestVotoEdit(prop.ID, prop.OPCAO);
    handleVotoDelete = prop => () => this.props.actions.requestVotoDelete(prop);
    handleNew = (table, prop) => () => this.setState({ [table]: true, [prop]: false });
    handleEditVoto = prop => () =>
        this.setState({ newVoto: true, editVoto: true, Voto: prop.TITULO, Desc: prop.DESC, editVotoID: prop.ID });
    handleEditRegra = prop => () =>
        this.setState({ newRegra: true, editRegra: true, Regra: prop.DESC, editRegraID: prop.ID });
    handleEditComunicado = prop => () =>
        this.setState({
            newComunicado: true,
            editComunicado: true,
            Titulo: prop.TIT,
            ComuDesc: prop.DESC,
            editComunicadoID: prop.ID
        });
    handleDeleteVoto = prop => () => this.props.actions.requestVotacaoDelete(prop, this.handleAddUndo);
    handleDeleteRegra = prop => () => this.props.actions.requestRegraDelete(prop, this.handleAddUndo);
    handleDeleteComunicado = prop => () => this.props.actions.requestComunicadoDelete(prop, this.handleAddUndo);
    handleCancelVoto = () => this.setState({ newVoto: false, editVoto: false, Voto: '', Desc: '', editVotoID: 0 });
    handleCancelRegra = () => this.setState({ newRegra: false, editRegra: false, Regra: '', editRegraID: 0 });
    handleCancelComu = () =>
        this.setState({ newComunicado: false, editComunicado: false, Titulo: '', ComuDesc: '', editComunicadoID: 0 });
    handleModal = prop => () => this.setState({ open: prop });
    handleModalVot = prop => () => this.setState({ openVot: prop });
    handleModalRegra = prop => () => this.setState({ openRegra: prop });
    handleModalComunicado = prop => () => this.setState({ openComu: prop });
    handleModalComuDesc = prop => () => this.setState({ openComuDesc: prop });
    handleCloseModal = () => this.setState({ open: 0 });
    handleCloseModalVot = () => this.setState({ openVot: 0 });
    handleCloseModalRegra = () => this.setState({ openRegra: 0 });
    handleCloseModalComunicado = () => this.setState({ openComu: 0 });
    handleCloseModalComuDesc = () => this.setState({ openComuDesc: 0 });
    render() {
        const { MORADOR } = this.props.login.data;
        const {
            Post,
            Voto,
            Desc,
            Regra,
            Titulo,
            ComuDesc,
            errorPost,
            errorDesc,
            errorRegra,
            errorVoto,
            errorTitulo,
            errorComuDesc,
            newVoto,
            newRegra,
            newComunicado,
            editRegra,
            editVoto,
            editComunicado,
            open,
            openRegra,
            openVot,
            openComu,
            openComuDesc
        } = this.state;
        const posts = this.props.post.posts;
        const votacoes = this.props.votacao.votacoes;
        const comunicados = this.props.comunicado.comunicados;
        const regras = this.props.regra.regras;
        return (
            <Container>
                {this.props.post.loading &&
                this.props.votacao.loading &&
                this.props.comunicado.loading &&
                this.props.regra.loading ? (
                    <Loading.Component />
                ) : (
                    <Fragment>
                        <Typo.Title variant="white">Feed</Typo.Title>
                        <Typo.SubTitle variant="primary">De olho na grama do vizinho!</Typo.SubTitle>
                        <Grid.Row>
                            <Grid.Col
                                order={[{ break: 0, value: 1 }, { break: 4, value: -1 }]}
                                size={[{ break: 0, value: 12 }, { break: 4, value: 7 }]}>
                                <Grid.Row>
                                    <Grid.Col
                                        size={[{ break: 0, value: 12 }]}
                                        margin={[
                                            { break: 0, side: [{ name: 'top', value: '1rem' }] },
                                            { break: 4, side: [{ name: 'top', value: '0' }] }
                                        ]}>
                                        <Form.Paper>
                                            <Typo.Heading>Novo Post</Typo.Heading>
                                            <Typo.SubHeading>Comece com o básico!</Typo.SubHeading>
                                            <Typo.Label htmlFor="Post" error={errorPost ? errorPost : ''}>
                                                Escreva algo
                                            </Typo.Label>
                                            <Form.Control
                                                tag="textarea"
                                                maxLength={500}
                                                counter={1}
                                                id="Post"
                                                error={errorPost}
                                                value={Post}
                                                onChange={this.handleChange('Post')}
                                            />
                                            <Form.Button
                                                raised
                                                block
                                                onClick={this.handleSubmit('post')}
                                                loading={this.props.post.loadingNew}>
                                                Postar
                                            </Form.Button>
                                        </Form.Paper>
                                    </Grid.Col>
                                    {posts
                                        ? posts.map(p => (
                                              <Grid.Col
                                                  key={p.POST_INT_ID}
                                                  size={[{ break: 0, value: 12 }]}
                                                  margin={[{ break: 0, side: [{ name: 'top', value: '1rem' }] }]}>
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
                                <Grid.Row>
                                    <Grid.Col
                                        order={[{ break: 0, value: 1 }, { break: 4, value: -1 }]}
                                        size={[{ break: 0, value: 12 }]}
                                        margin={[
                                            { break: 0, side: [{ name: 'top', value: '1rem' }] },
                                            { break: 4, side: [{ name: 'top', value: '0' }] }
                                        ]}>
                                        <Form.Paper>
                                            <Grid.Row alignItems="center">
                                                <Grid.Grow>
                                                    <Typo.Heading>Votações</Typo.Heading>
                                                    <Typo.SubHeading helper>Votar é importante!</Typo.SubHeading>
                                                </Grid.Grow>
                                                <Grid.Padding visible>
                                                    {MORADOR.MOR_BIT_SIN && (
                                                        <Form.Button
                                                            rounded
                                                            icon
                                                            onClick={this.handleNew('newVoto', 'editVoto')}>
                                                            <MdAdd />
                                                        </Form.Button>
                                                    )}
                                                </Grid.Padding>
                                            </Grid.Row>
                                            {MORADOR.MOR_BIT_SIN &&
                                                newVoto && (
                                                    <Margin>
                                                        <Typo.Label htmlFor="Voto" error={errorVoto ? errorVoto : ''}>
                                                            Título
                                                        </Typo.Label>
                                                        <Form.Control
                                                            id="Voto"
                                                            value={Voto}
                                                            error={errorVoto}
                                                            helper
                                                            onChange={this.handleChange('Voto')}
                                                        />
                                                        <Typo.Bold margin>Votações duram uma semana!</Typo.Bold>
                                                        <Typo.Label htmlFor="Desc" error={errorDesc ? errorDesc : ''}>
                                                            Descrição
                                                        </Typo.Label>
                                                        <Form.Control
                                                            id="Desc"
                                                            tag="textarea"
                                                            maxLength={150}
                                                            counter={1}
                                                            value={Desc}
                                                            error={errorDesc}
                                                            onChange={this.handleChange('Desc')}
                                                        />
                                                        <Grid.Row>
                                                            <Grid.Grow>
                                                                <Form.Button
                                                                    block
                                                                    raised
                                                                    onClick={
                                                                        editVoto
                                                                            ? this.handleSubmit('editVoto')
                                                                            : this.handleSubmit('voto')
                                                                    }
                                                                    loading={this.props.votacao.loadingNew}>
                                                                    {editVoto ? 'Alterar' : 'Adicionar'}
                                                                </Form.Button>
                                                            </Grid.Grow>
                                                            <Grid.Padding visible>
                                                                <Form.Button onClick={this.handleCancelVoto}>
                                                                    Cancelar
                                                                </Form.Button>
                                                            </Grid.Padding>
                                                        </Grid.Row>
                                                    </Margin>
                                                )}
                                            {votacoes.map((v, i) => (
                                                <Fragment key={v.VOT_INT_ID}>
                                                    <Row flexWrap="nowrap" alignItems="center" first={i === 0}>
                                                        <Grid.Grow flex>
                                                            <ButtonInfo
                                                                rounded
                                                                icon
                                                                variant="white"
                                                                onClick={this.handleModalVot(v.VOT_INT_ID)}>
                                                                <MdInfo />
                                                            </ButtonInfo>
                                                            <Grid.Row flexDirection="column">
                                                                <Grid.Grow>
                                                                    <Typo.SubHeading helper variant="white">
                                                                        {v.VOT_STR_TITULO}
                                                                    </Typo.SubHeading>
                                                                </Grid.Grow>
                                                                <Grid.Grow>
                                                                    <Typo.Bold helper>
                                                                        {v.MORADOR.MOR_STR_NOME}
                                                                    </Typo.Bold>
                                                                </Grid.Grow>
                                                            </Grid.Row>
                                                        </Grid.Grow>
                                                        <Grid.Padding flex>
                                                            {MORADOR.MOR_BIT_SIN &&
                                                            MORADOR.MOR_INT_ID === v.MORADOR.MOR_INT_ID ? (
                                                                <Fragment>
                                                                    <Form.Button
                                                                        rounded
                                                                        icon
                                                                        variant="white"
                                                                        onClick={this.handleEditVoto({
                                                                            ID: v.VOT_INT_ID,
                                                                            TITULO: v.VOT_STR_TITULO,
                                                                            DESC: v.VOT_STR_DESC
                                                                        })}>
                                                                        <MdEdit />
                                                                    </Form.Button>
                                                                    <Form.Button
                                                                        rounded
                                                                        icon
                                                                        variant="white"
                                                                        onClick={this.handleModal(v.VOT_INT_ID)}>
                                                                        <MdDelete />
                                                                    </Form.Button>
                                                                    <Form.Modal
                                                                        title={`Excluir a votação '${
                                                                            v.VOT_STR_TITULO
                                                                        }'?`}
                                                                        open={open === v.VOT_INT_ID}
                                                                        closeClick={this.handleCloseModal}>
                                                                        <Form.Button
                                                                            raised
                                                                            block
                                                                            onClick={this.handleDeleteVoto(
                                                                                v.VOT_INT_ID
                                                                            )}>
                                                                            Excluir
                                                                        </Form.Button>
                                                                    </Form.Modal>
                                                                </Fragment>
                                                            ) : (
                                                                <Fragment>
                                                                    <Form.Button
                                                                        rounded
                                                                        icon
                                                                        variant={
                                                                            v.VOTOs.find(
                                                                                x =>
                                                                                    x.MOR_INT_ID ===
                                                                                        MORADOR.MOR_INT_ID &&
                                                                                    x.VOT_INT_ID === v.VOT_INT_ID &&
                                                                                    x.VOTO_BIT_OPCAO === true
                                                                            )
                                                                                ? 'primary'
                                                                                : 'white'
                                                                        }
                                                                        onClick={
                                                                            v.VOTOs.find(
                                                                                x =>
                                                                                    x.MOR_INT_ID ===
                                                                                        MORADOR.MOR_INT_ID &&
                                                                                    x.VOT_INT_ID === v.VOT_INT_ID
                                                                            )
                                                                                ? v.VOTOs.find(
                                                                                      x =>
                                                                                          x.MOR_INT_ID ===
                                                                                              MORADOR.MOR_INT_ID &&
                                                                                          x.VOT_INT_ID ===
                                                                                              v.VOT_INT_ID &&
                                                                                          x.VOTO_BIT_OPCAO === true
                                                                                  )
                                                                                    ? this.handleVotoDelete(
                                                                                          v.VOTOs.filter(
                                                                                              x =>
                                                                                                  x.VOT_INT_ID ===
                                                                                                      v.VOT_INT_ID &&
                                                                                                  x.MOR_INT_ID ===
                                                                                                      this.props.login
                                                                                                          .data.MORADOR
                                                                                                          .MOR_INT_ID
                                                                                          )[0].VOTO_INT_ID
                                                                                      )
                                                                                    : this.handleVotoEdit({
                                                                                          ID: v.VOTOs.filter(
                                                                                              x =>
                                                                                                  x.VOT_INT_ID ===
                                                                                                      v.VOT_INT_ID &&
                                                                                                  x.MOR_INT_ID ===
                                                                                                      this.props.login
                                                                                                          .data.MORADOR
                                                                                                          .MOR_INT_ID
                                                                                          )[0].VOTO_INT_ID,
                                                                                          OPCAO: true
                                                                                      })
                                                                                : this.handleVoto({
                                                                                      ID: v.VOT_INT_ID,
                                                                                      OPCAO: true
                                                                                  })
                                                                        }>
                                                                        <MdCheck />
                                                                    </Form.Button>
                                                                    <Form.Button
                                                                        rounded
                                                                        icon
                                                                        variant={
                                                                            v.VOTOs.find(
                                                                                x =>
                                                                                    x.MOR_INT_ID ===
                                                                                        MORADOR.MOR_INT_ID &&
                                                                                    x.VOTO_BIT_OPCAO === false
                                                                            )
                                                                                ? 'primary'
                                                                                : 'white'
                                                                        }
                                                                        onClick={
                                                                            v.VOTOs.find(
                                                                                x =>
                                                                                    x.MOR_INT_ID ===
                                                                                        MORADOR.MOR_INT_ID &&
                                                                                    x.VOT_INT_ID === v.VOT_INT_ID
                                                                            )
                                                                                ? v.VOTOs.find(
                                                                                      x =>
                                                                                          x.MOR_INT_ID ===
                                                                                              MORADOR.MOR_INT_ID &&
                                                                                          x.VOT_INT_ID ===
                                                                                              v.VOT_INT_ID &&
                                                                                          x.VOTO_BIT_OPCAO === false
                                                                                  )
                                                                                    ? this.handleVotoDelete(
                                                                                          v.VOTOs.filter(
                                                                                              x =>
                                                                                                  x.VOT_INT_ID ===
                                                                                                      v.VOT_INT_ID &&
                                                                                                  x.MOR_INT_ID ===
                                                                                                      this.props.login
                                                                                                          .data.MORADOR
                                                                                                          .MOR_INT_ID
                                                                                          )[0].VOTO_INT_ID
                                                                                      )
                                                                                    : this.handleVotoEdit({
                                                                                          ID: v.VOTOs.filter(
                                                                                              x =>
                                                                                                  x.VOT_INT_ID ===
                                                                                                      v.VOT_INT_ID &&
                                                                                                  x.MOR_INT_ID ===
                                                                                                      this.props.login
                                                                                                          .data.MORADOR
                                                                                                          .MOR_INT_ID
                                                                                          )[0].VOTO_INT_ID,
                                                                                          OPCAO: false
                                                                                      })
                                                                                : this.handleVoto({
                                                                                      ID: v.VOT_INT_ID,
                                                                                      OPCAO: false
                                                                                  })
                                                                        }>
                                                                        <MdClose />
                                                                    </Form.Button>
                                                                </Fragment>
                                                            )}
                                                        </Grid.Padding>
                                                    </Row>
                                                    <Form.Modal
                                                        title={`Votação '${v.VOT_STR_TITULO}'!`}
                                                        open={openVot === v.VOT_INT_ID}
                                                        closeClick={this.handleCloseModalVot}>
                                                        {v.VOT_STR_DESC}
                                                    </Form.Modal>
                                                </Fragment>
                                            ))}
                                        </Form.Paper>
                                    </Grid.Col>
                                    <Grid.Col
                                        order={[{ break: 0, value: 2 }, { break: 4, value: 0 }]}
                                        size={[{ break: 0, value: 12 }]}
                                        margin={[{ break: 0, side: [{ name: 'top', value: '1rem' }] }]}>
                                        <Form.Paper>
                                            <Grid.Row alignItems="center">
                                                <Grid.Grow>
                                                    <Typo.Heading>Comunicados</Typo.Heading>
                                                    <Typo.SubHeading helper>Mantenha-se informado!</Typo.SubHeading>
                                                </Grid.Grow>
                                                <Grid.Padding visible>
                                                    {MORADOR.MOR_BIT_SIN && (
                                                        <Form.Button
                                                            rounded
                                                            icon
                                                            onClick={this.handleNew('newComunicado', 'editComunicado')}>
                                                            <MdAdd />
                                                        </Form.Button>
                                                    )}
                                                </Grid.Padding>
                                            </Grid.Row>
                                            {MORADOR.MOR_BIT_SIN &&
                                                newComunicado && (
                                                    <Margin>
                                                        <Typo.Label
                                                            htmlFor="Titulo"
                                                            error={errorTitulo ? errorTitulo : ''}>
                                                            Título
                                                        </Typo.Label>
                                                        <Form.Control
                                                            id="Titulo"
                                                            value={Titulo}
                                                            error={errorTitulo}
                                                            helper
                                                            onChange={this.handleChange('Titulo')}
                                                        />
                                                        <Typo.Bold margin>Comunicados duram uma semana!</Typo.Bold>
                                                        <Typo.Label
                                                            htmlFor="ComuDesc"
                                                            error={errorComuDesc ? errorComuDesc : ''}>
                                                            Descrição
                                                        </Typo.Label>
                                                        <Form.Control
                                                            id="ComuDesc"
                                                            tag="textarea"
                                                            maxLength={600}
                                                            counter={1}
                                                            value={ComuDesc}
                                                            error={errorComuDesc}
                                                            onChange={this.handleChange('ComuDesc')}
                                                        />
                                                        <Grid.Row>
                                                            <Grid.Grow>
                                                                <Form.Button
                                                                    block
                                                                    raised
                                                                    onClick={
                                                                        editComunicado
                                                                            ? this.handleSubmit('editComunicado')
                                                                            : this.handleSubmit('comunicado')
                                                                    }
                                                                    loading={this.props.comunicado.loadingNew}>
                                                                    {editComunicado ? 'Alterar' : 'Adicionar'}
                                                                </Form.Button>
                                                            </Grid.Grow>
                                                            <Grid.Padding visible>
                                                                <Form.Button onClick={this.handleCancelComu}>
                                                                    Cancelar
                                                                </Form.Button>
                                                            </Grid.Padding>
                                                        </Grid.Row>
                                                    </Margin>
                                                )}
                                            {comunicados.map((c, i) => (
                                                <Fragment key={c.COMU_INT_ID}>
                                                    <Row flexWrap="nowrap" alignItems="center" first={i === 0}>
                                                        <Grid.Grow flex>
                                                            <ButtonInfo
                                                                rounded
                                                                icon
                                                                variant="white"
                                                                onClick={this.handleModalComuDesc(c.COMU_INT_ID)}>
                                                                <MdInfo />
                                                            </ButtonInfo>
                                                            <Grid.Row>
                                                                <Grid.Grow>
                                                                    <Typo.SubHeading helper variant="white">
                                                                        {c.COMU_STR_TIT}
                                                                    </Typo.SubHeading>
                                                                </Grid.Grow>
                                                            </Grid.Row>
                                                        </Grid.Grow>
                                                        {MORADOR.MOR_BIT_SIN && (
                                                            <Grid.Padding>
                                                                <Form.Button
                                                                    rounded
                                                                    icon
                                                                    variant="white"
                                                                    onClick={this.handleEditComunicado({
                                                                        ID: c.COMU_INT_ID,
                                                                        TIT: c.COMU_STR_TIT,
                                                                        DESC: c.COMU_STR_DESC
                                                                    })}>
                                                                    <MdEdit />
                                                                </Form.Button>
                                                                <Form.Button
                                                                    rounded
                                                                    icon
                                                                    variant="white"
                                                                    onClick={this.handleModalComunicado(c.COMU_INT_ID)}>
                                                                    <MdDelete />
                                                                </Form.Button>
                                                            </Grid.Padding>
                                                        )}
                                                    </Row>
                                                    <Form.Modal
                                                        title={`Excluir o comunicado '${c.COMU_STR_TIT}'?`}
                                                        open={openComu === c.COMU_INT_ID}
                                                        closeClick={this.handleCloseModalComunicado}>
                                                        <Form.Button
                                                            raised
                                                            block
                                                            onClick={this.handleDeleteComunicado(c.COMU_INT_ID)}>
                                                            Excluir
                                                        </Form.Button>
                                                    </Form.Modal>
                                                    <Form.Modal
                                                        title={`Comunicado '${c.COMU_STR_TIT}'!`}
                                                        open={openComuDesc === c.COMU_INT_ID}
                                                        closeClick={this.handleCloseModalComuDesc}>
                                                        {c.COMU_STR_DESC}
                                                    </Form.Modal>
                                                </Fragment>
                                            ))}
                                        </Form.Paper>
                                    </Grid.Col>
                                    <Grid.Col
                                        order={[{ break: 0, value: 0 }, { break: 4, value: 1 }]}
                                        size={[{ break: 0, value: 12 }]}
                                        margin={[
                                            { break: 0, side: [{ name: 'top', value: '0' }] },
                                            { break: 4, side: [{ name: 'top', value: '1rem' }] }
                                        ]}>
                                        <Form.Paper>
                                            <Grid.Row alignItems="center">
                                                <Grid.Grow>
                                                    <Typo.Heading>Regras</Typo.Heading>
                                                    <Typo.SubHeading helper>Ler é importante!</Typo.SubHeading>
                                                </Grid.Grow>
                                                <Grid.Padding visible>
                                                    {MORADOR.MOR_BIT_SIN && (
                                                        <Form.Button rounded icon onClick={this.handleNew('newRegra')}>
                                                            <MdAdd />
                                                        </Form.Button>
                                                    )}
                                                </Grid.Padding>
                                            </Grid.Row>
                                            {MORADOR.MOR_BIT_SIN &&
                                                newRegra && (
                                                    <Margin>
                                                        <Typo.Label
                                                            htmlFor="Regra"
                                                            error={errorRegra ? errorRegra : ''}>
                                                            Nova regra
                                                        </Typo.Label>
                                                        <Form.Control
                                                            id="Regra"
                                                            helper
                                                            value={Regra}
                                                            onChange={this.handleChange('Regra')}
                                                            error={errorRegra}
                                                            append={
                                                                <Fragment>
                                                                    <Form.Button
                                                                        icon
                                                                        rounded
                                                                        variant="white"
                                                                        loading={this.props.regra.loadingNew}
                                                                        onClick={
                                                                            editRegra
                                                                                ? this.handleSubmit('editRegra')
                                                                                : this.handleSubmit('regra')
                                                                        }>
                                                                        <MdCheck />
                                                                    </Form.Button>
                                                                    <Form.Button
                                                                        icon
                                                                        rounded
                                                                        variant="white"
                                                                        onClick={this.handleCancelRegra}>
                                                                        <MdClose />
                                                                    </Form.Button>
                                                                </Fragment>
                                                            }
                                                        />
                                                    </Margin>
                                                )}
                                            {regras.map((r, i) => (
                                                <Fragment key={r.REG_INT_ID}>
                                                    <Row flexWrap="nowrap" alignItems="center" first={i === 0}>
                                                        <Grid.Grow flex>
                                                            <ButtonRegra variant="white">
                                                                <MdRemove />
                                                            </ButtonRegra>
                                                            <Grid.Row>
                                                                <Grid.Grow>
                                                                    <Typo.SubHeading helper variant="white">
                                                                        {r.REG_STR_DESC}
                                                                    </Typo.SubHeading>
                                                                </Grid.Grow>
                                                            </Grid.Row>
                                                        </Grid.Grow>
                                                        {MORADOR.MOR_BIT_SIN && (
                                                            <Grid.Padding>
                                                                <Form.Button
                                                                    rounded
                                                                    icon
                                                                    variant="white"
                                                                    onClick={this.handleEditRegra({
                                                                        ID: r.REG_INT_ID,
                                                                        DESC: r.REG_STR_DESC
                                                                    })}>
                                                                    <MdEdit />
                                                                </Form.Button>
                                                                <Form.Button
                                                                    rounded
                                                                    icon
                                                                    variant="white"
                                                                    onClick={this.handleModalRegra(r.REG_INT_ID)}>
                                                                    <MdDelete />
                                                                </Form.Button>
                                                            </Grid.Padding>
                                                        )}
                                                    </Row>
                                                    <Form.Modal
                                                        title={`Excluir a regra '${r.REG_STR_DESC}'?`}
                                                        open={openRegra === r.REG_INT_ID}
                                                        closeClick={this.handleCloseModalRegra}>
                                                        <Form.Button
                                                            raised
                                                            block
                                                            onClick={this.handleDeleteRegra(r.REG_INT_ID)}>
                                                            Excluir
                                                        </Form.Button>
                                                    </Form.Modal>
                                                </Fragment>
                                            ))}
                                        </Form.Paper>
                                    </Grid.Col>
                                </Grid.Row>
                            </Grid.Col>
                        </Grid.Row>
                    </Fragment>
                )}
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    post: state.post,
    login: state.login,
    votacao: state.votacao,
    comunicado: state.comunicado,
    regra: state.regra
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        Object.assign({}, postActions, votacaoActions, regraActions, votoActions, comunicadoActions),
        dispatch
    )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
