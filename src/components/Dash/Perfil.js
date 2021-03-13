import React, { Component } from 'react';
import Editor from 'react-avatar-editor';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { MdCameraAlt } from 'react-icons/md';
import Slider from 'rc-slider';
import Circular from 'react-circular-progressbar';
import styled from 'styled-components';
import { darken } from 'polished';

import { Creators as loginActions } from '../../redux/ducks/login';
import { Creators as moradorActions } from '../../redux/ducks/morador';

import Form from '../Form/index';
import Typo from '../Typo/index';
import Grid from '../Grid/index';

const Padding = styled.div`
    padding: 0 1rem;
    height: 100%;
    flex: 1;
`;

const Avatar = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: relative;
    @media (max-width: ${props => props.theme.break[3].size}px) {
        width: 100px;
        height: 100px;
    }
`;

const Title = styled(Typo.Title)`
    text-align: center;
`;

const SubTitle = styled(Typo.SubTitle)`
    text-align: center;
`;

const Row = styled(Grid.Row)`
    height: 100%;
    align-items: center;
`;

const AvatarHandler = styled.div`
    height: 150px;
    width: 150px;
    display: inline-block;
    margin-bottom: 1rem;
    border-radius: 50%;
    position: relative;
    @media (max-width: ${props => props.theme.break[3].size}px) {
        width: 100px;
        height: 100px;
    }
    .CircularProgressbar {
        top: -5px;
        left: -5px;
        position: absolute;
    }
    &:hover {
        div {
            display: flex;
        }
    }
`;

const StyledCircular = styled(Circular)`
    width: calc(100% + 10px) !important;
    .CircularProgressbar-trail {
        stroke-opacity: 0 !important;
    }
    .CircularProgressbar-path {
        stroke: ${props => props.theme.color.primary}!important;
    }
`;

const Hover = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 50%;
    left: 0;
    top: 0;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: ${props => props.theme.color.primary}40;
    svg {
        fill: ${props => props.theme.color.primary};
        width: 30%;
        height: 30%;
    }
`;

const StyledSlider = styled(Slider)`
    margin: 1rem 0;
    .rc-slider-rail {
        background-color: ${props => props.theme.color.black};
    }
    .rc-slider-track {
        background-color: ${props => props.theme.color.primary};
    }
    .rc-slider-handle {
        border: none;
        outline: none;
        box-shadow: none !important;
        background-color: ${props => darken(0.1, props.theme.color.primary)};
    }
`;

class Perfil extends Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            file: null,
            scale: 1
        };
    }
    handleLogout = () => this.props.actions.requestLogout();
    handleInput = () => this.input.click();
    handleClose = () => this.setState({ modal: false, file: null });
    handleChange = e => {
        this.setState({ modal: true, file: e.target.files[0] });
    };
    handleSlide = v => this.setState({ scale: v });
    handleSubmit = () => {
        this.setState({ modal: false });
        if (this.editor) {
            const canv = this.editor.getImage();
            const img = canv.toDataURL();
            this.props.actions.requestMoradorImage(img, this.state.file.name, this.props.login.data.MORADOR.MOR_INT_ID);
        }
    };
    render() {
        const morador = this.props.login.data.MORADOR;
        return (
            <Padding>
                <Row>
                    <Grid.Col size={[{ break: 0, value: 12 }]}>
                        <Grid.Row justifyContent="center">
                            <Grid.Col size={[{ break: 0, value: 12 }]} textAlign={[{ break: 0, value: 'center' }]}>
                                <AvatarHandler onClick={this.handleInput}>
                                    <Avatar
                                        src={
                                            morador.MOR_STR_IMG
                                                ? `http://localhost:3001/static/morador/${morador.MOR_STR_IMG}`
                                                : require('../../assets/person.jpg')
                                        }
                                    />
                                    <StyledCircular percentage={this.props.upload.progress} strokeWidth={4} />
                                    <Hover>
                                        <MdCameraAlt />
                                    </Hover>
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        ref={ref => (this.input = ref)}
                                        onChange={this.handleChange}
                                    />
                                </AvatarHandler>
                                <Form.Modal
                                    title="Alterar imagem"
                                    open={this.state.modal}
                                    closeClick={this.handleClose}>
                                    <Editor
                                        ref={ref => (this.editor = ref)}
                                        image={this.state.file}
                                        border={0}
                                        width={300}
                                        height={300}
                                        borderRadius={150}
                                        scale={this.state.scale}
                                    />
                                    <StyledSlider min={1} max={2} onChange={this.handleSlide} step={0.01} />
                                    <Form.Button raised block onClick={this.handleSubmit}>
                                        Enviar
                                    </Form.Button>
                                </Form.Modal>
                            </Grid.Col>
                            <Grid.Col size={[{ break: 0, value: 12 }]}>
                                <Title variant="white">{morador.MOR_STR_NOME}</Title>
                                <SubTitle variant="primary">{morador.MOR_BIT_SIN ? 'Síndico' : 'Morador'}</SubTitle>
                            </Grid.Col>
                            <Grid.Col size={[{ break: 0, value: 12 }, { break: 3, value: 6 }]}>
                                <Grid.Row>
                                    <Grid.Col textAlign={[{ break: 0, value: 'center' }]}>
                                        <Form.Button rounded tag={Link} to="/app/configuracoes">
                                            Configurações
                                        </Form.Button>
                                    </Grid.Col>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Col
                                        textAlign={[{ break: 0, value: 'center' }]}
                                        margin={[{ break: 0, side: [{ name: 'top', value: '0.5rem' }] }]}>
                                        <Form.Button rounded onClick={this.handleLogout}>
                                            Sair
                                        </Form.Button>
                                    </Grid.Col>
                                </Grid.Row>
                            </Grid.Col>
                        </Grid.Row>
                    </Grid.Col>
                </Row>
            </Padding>
        );
    }
}

const mapStateToProps = state => ({
    login: state.login,
    upload: state.upload
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, loginActions, moradorActions), dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Perfil);
