import React, { Component, Fragment } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars';
import {
    MdSettings,
    MdMessage,
    MdMenu,
    MdHome,
    MdLocalDining,
    MdPeople,
    MdDashboard,
    MdHelp,
    MdBusiness,
    MdLocationCity,
    MdMonetizationOn,
    MdLocalActivity,
    MdPerson,
    MdAssignmentInd
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';

import Toast from '../components/Grid/Toast';
import Typo from '../components/Typo/index';
import Form from '../components/Form/index';
import Sidebar from '../components/Dash/Sidebar';

import DashRoute from '../routes/dash';

const Wrapper = styled.div`
    background-color: ${props => props.theme.color.black};
    width: 100%;
    display: flex;
    align-items: center;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    height: 100vh;
    @media (max-width: ${props => props.theme.break[3].size - 1}px) {
        flex-direction: column;
    }
`;

const Center = styled(Typo.Link)`
    text-align: center;
    @media (max-width: ${props => props.theme.break[3].size}px) {
        flex: 1;
    }
`;

const StyledScroll = styled(Scrollbars)`
    div:nth-child(2),
    div:nth-child(3) {
        .thumb {
            border-radius: 4px;
            background-color: ${props => props.theme.color.black};
        }
    }
`;

class Dash extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            sidebarOpen: false
        };
    }
    handleToggle = () => this.setState(state => ({ open: !state.open }));
    handleClick = () => this.setState(state => ({ sidebarOpen: !state.sidebarOpen }));
    handleClose = () => this.setState({ open: false });
    renderThumb = ({ style, ...props }) => {
        return <div style={{ ...style }} className="thumb" {...props} />;
    };
    render() {
        return (
            <ThemeProvider theme={this.props.theme}>
                <Wrapper id="Dash">
                    <Sidebar.Padding>
                        <Sidebar.Container>
                            <Sidebar.Frame>
                                <Sidebar.Menu>
                                    <Form.Button rounded icon onClick={this.handleToggle}>
                                        <MdMenu size={20} />
                                    </Form.Button>
                                </Sidebar.Menu>
                                <Center to="/app/home">
                                    <Sidebar.Logo xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1020 1020">
                                        <path d="M889,408.87H610.21V510H657.8a21.83,21.83,0,0,1,21.76,21.76v62a21.83,21.83,0,0,1-21.76,21.76H610.21V716.6H657.8a21.83,21.83,0,0,1,21.76,21.76v61.95a21.83,21.83,0,0,1-21.76,21.76H610.21V998.24A21.85,21.85,0,0,1,595,1019a21.44,21.44,0,0,0,6.59,1H747.47V836.6a21.83,21.83,0,0,1,21.75-21.76h60.51a21.83,21.83,0,0,1,21.76,21.76V1020H889a21.83,21.83,0,0,0,21.75-21.76V430.62A21.82,21.82,0,0,0,889,408.87ZM851.49,593.71a21.83,21.83,0,0,1-21.76,21.76h-62A21.83,21.83,0,0,1,746,593.71v-62A21.83,21.83,0,0,1,767.78,510h62a21.83,21.83,0,0,1,21.76,21.76Z" />
                                        <path d="M592.46,0H121.64A21.83,21.83,0,0,0,99.88,21.76V998.24A21.83,21.83,0,0,0,121.64,1020H404.72V836.6a21.83,21.83,0,0,1,21.76-21.76H487a21.83,21.83,0,0,1,21.76,21.76V1020h83.71a21.42,21.42,0,0,0,6.58-1,21.85,21.85,0,0,0,15.17-20.73V21.76A21.83,21.83,0,0,0,592.46,0ZM305,800.31a21.83,21.83,0,0,1-21.76,21.76H221.33a21.83,21.83,0,0,1-21.76-21.76V738.36a21.83,21.83,0,0,1,21.76-21.76h61.95A21.83,21.83,0,0,1,305,738.36Zm0-206.6a21.83,21.83,0,0,1-21.76,21.76H221.33a21.83,21.83,0,0,1-21.76-21.76v-62A21.83,21.83,0,0,1,221.33,510h61.95A21.83,21.83,0,0,1,305,531.76Zm0-206.6a21.83,21.83,0,0,1-21.76,21.76H221.33a21.83,21.83,0,0,1-21.76-21.76V325.16a21.82,21.82,0,0,1,21.76-21.76h61.95A21.83,21.83,0,0,1,305,325.16Zm0-202.27a21.83,21.83,0,0,1-21.76,21.76H221.33a21.82,21.82,0,0,1-21.76-21.76V122.89a21.83,21.83,0,0,1,21.76-21.76h61.95A21.83,21.83,0,0,1,305,122.89ZM510.19,593.71a21.83,21.83,0,0,1-21.76,21.76H426.48a21.83,21.83,0,0,1-21.76-21.76v-62A21.83,21.83,0,0,1,426.48,510h61.95a21.83,21.83,0,0,1,21.76,21.76Zm0-206.6a21.83,21.83,0,0,1-21.76,21.76H426.48a21.83,21.83,0,0,1-21.76-21.76V325.16a21.83,21.83,0,0,1,21.76-21.76h61.95a21.82,21.82,0,0,1,21.76,21.76Zm0-202.27a21.82,21.82,0,0,1-21.76,21.76H426.48a21.83,21.83,0,0,1-21.76-21.76V122.89a21.83,21.83,0,0,1,21.76-21.76h61.95a21.83,21.83,0,0,1,21.76,21.76Z" />
                                    </Sidebar.Logo>
                                </Center>
                                <Sidebar.Collection open={this.state.open}>
                                    <StyledScroll
                                        renderThumbHorizontal={this.renderThumb}
                                        renderThumbVertical={this.renderThumb}>
                                        <Sidebar.Item to="/app/home" onClick={this.handleClose}>
                                            <MdHome />
                                            Home
                                        </Sidebar.Item>
                                        <Sidebar.Item to="/app/morador" onClick={this.handleClose}>
                                            <MdPerson />
                                            Moradores
                                        </Sidebar.Item>
                                        <Sidebar.Item to="/app/visita" onClick={this.handleClose}>
                                            <MdPeople />
                                            Visita
                                        </Sidebar.Item>
                                        <Sidebar.Item to="/app/reserva" onClick={this.handleClose}>
                                            <MdLocalDining />
                                            Reserva
                                        </Sidebar.Item>
                                        {this.props.login.data.MORADOR.MOR_BIT_SIN ? (
                                            <Sidebar.Item
                                                tag="span"
                                                menu
                                                onClick={this.handleClick}
                                                open={this.state.sidebarOpen}
                                                submenu={
                                                    <Fragment>
                                                        <Sidebar.Item
                                                            to="/app/assistencia"
                                                            variant="black"
                                                            onClick={this.handleClose}>
                                                            <MdHelp />
                                                            Assistência
                                                        </Sidebar.Item>
                                                        <Sidebar.Item
                                                            to="/app/apartamento"
                                                            variant="black"
                                                            onClick={this.handleClose}>
                                                            <MdLocationCity />
                                                            Apartamentos
                                                        </Sidebar.Item>
                                                        <Sidebar.Item
                                                            to="/app/bloco"
                                                            variant="black"
                                                            onClick={this.handleClose}>
                                                            <MdBusiness />
                                                            Blocos
                                                        </Sidebar.Item>
                                                        <Sidebar.Item
                                                            to="/app/despesa"
                                                            variant="black"
                                                            onClick={this.handleClose}>
                                                            <MdMonetizationOn />
                                                            Despesas
                                                        </Sidebar.Item>
                                                        <Sidebar.Item
                                                            to="/app/funcionario"
                                                            variant="black"
                                                            onClick={this.handleClose}>
                                                            <MdAssignmentInd />
                                                            Funcionários
                                                        </Sidebar.Item>
                                                        <Sidebar.Item
                                                            to="/app/local"
                                                            variant="black"
                                                            onClick={this.handleClose}>
                                                            <MdLocalActivity />
                                                            Locais
                                                        </Sidebar.Item>
                                                    </Fragment>
                                                }>
                                                <MdDashboard />
                                                Síndico
                                            </Sidebar.Item>
                                        ) : (
                                            ''
                                        )}
                                    </StyledScroll>
                                </Sidebar.Collection>
                                <Sidebar.Bottom>
                                    <Form.Button rounded icon tag={NavLink} to="/app/mensagens">
                                        <MdMessage size={20} />
                                    </Form.Button>
                                    <Typo.Link to="/app/perfil">
                                        <Sidebar.Avatar
                                            src={
                                                this.props.login.data.MORADOR.MOR_STR_IMG
                                                    ? `http://localhost:3001/static/morador/${
                                                          this.props.login.data.MORADOR.MOR_STR_IMG
                                                      }`
                                                    : require('../assets/person.jpg')
                                            }
                                        />
                                    </Typo.Link>
                                    <Form.Button rounded icon tag={NavLink} to="/app/configuracoes">
                                        <MdSettings size={20} />
                                    </Form.Button>
                                </Sidebar.Bottom>
                            </Sidebar.Frame>
                        </Sidebar.Container>
                    </Sidebar.Padding>
                    <Sidebar.Handling />
                    <DashRoute />
                    <Toast />
                </Wrapper>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    login: state.login
});

export default connect(mapStateToProps)(Dash);
