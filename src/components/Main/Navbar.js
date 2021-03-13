import React, { Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { darken } from 'polished';

import Form from '../Form/index';
import Link from '../Typo/Link';

const Nav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
`;

const NavItem = styled(Link)`
    font-size: 0.9rem;
    display: block;
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    margin-left: ${props => (props.brand ? '0' : '1.5rem')};
`;

const Logo = styled.svg`
    width: 36px;
    path {
        transition: fill 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        fill: ${props => props.theme.color[props.variant]};
        &:first-of-type {
            fill: ${props => darken(0.05, props.theme.color[props.variant])};
        }
    }
`;

const Align = styled.div`
    display: flex;
    align-items: center;
`;

const Navbar = props => (
    <Nav>
        <Align>
            <NavItem to="/home" title="Domus" brand={1}>
                <Logo
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1020 1020"
                    variant={props.variant === 'white' ? 'black' : 'white'}>
                    <path d="M889,408.87H610.21V510H657.8a21.83,21.83,0,0,1,21.76,21.76v62a21.83,21.83,0,0,1-21.76,21.76H610.21V716.6H657.8a21.83,21.83,0,0,1,21.76,21.76v61.95a21.83,21.83,0,0,1-21.76,21.76H610.21V998.24A21.85,21.85,0,0,1,595,1019a21.44,21.44,0,0,0,6.59,1H747.47V836.6a21.83,21.83,0,0,1,21.75-21.76h60.51a21.83,21.83,0,0,1,21.76,21.76V1020H889a21.83,21.83,0,0,0,21.75-21.76V430.62A21.82,21.82,0,0,0,889,408.87ZM851.49,593.71a21.83,21.83,0,0,1-21.76,21.76h-62A21.83,21.83,0,0,1,746,593.71v-62A21.83,21.83,0,0,1,767.78,510h62a21.83,21.83,0,0,1,21.76,21.76Z" />
                    <path d="M592.46,0H121.64A21.83,21.83,0,0,0,99.88,21.76V998.24A21.83,21.83,0,0,0,121.64,1020H404.72V836.6a21.83,21.83,0,0,1,21.76-21.76H487a21.83,21.83,0,0,1,21.76,21.76V1020h83.71a21.42,21.42,0,0,0,6.58-1,21.85,21.85,0,0,0,15.17-20.73V21.76A21.83,21.83,0,0,0,592.46,0ZM305,800.31a21.83,21.83,0,0,1-21.76,21.76H221.33a21.83,21.83,0,0,1-21.76-21.76V738.36a21.83,21.83,0,0,1,21.76-21.76h61.95A21.83,21.83,0,0,1,305,738.36Zm0-206.6a21.83,21.83,0,0,1-21.76,21.76H221.33a21.83,21.83,0,0,1-21.76-21.76v-62A21.83,21.83,0,0,1,221.33,510h61.95A21.83,21.83,0,0,1,305,531.76Zm0-206.6a21.83,21.83,0,0,1-21.76,21.76H221.33a21.83,21.83,0,0,1-21.76-21.76V325.16a21.82,21.82,0,0,1,21.76-21.76h61.95A21.83,21.83,0,0,1,305,325.16Zm0-202.27a21.83,21.83,0,0,1-21.76,21.76H221.33a21.82,21.82,0,0,1-21.76-21.76V122.89a21.83,21.83,0,0,1,21.76-21.76h61.95A21.83,21.83,0,0,1,305,122.89ZM510.19,593.71a21.83,21.83,0,0,1-21.76,21.76H426.48a21.83,21.83,0,0,1-21.76-21.76v-62A21.83,21.83,0,0,1,426.48,510h61.95a21.83,21.83,0,0,1,21.76,21.76Zm0-206.6a21.83,21.83,0,0,1-21.76,21.76H426.48a21.83,21.83,0,0,1-21.76-21.76V325.16a21.83,21.83,0,0,1,21.76-21.76h61.95a21.82,21.82,0,0,1,21.76,21.76Zm0-202.27a21.82,21.82,0,0,1-21.76,21.76H426.48a21.83,21.83,0,0,1-21.76-21.76V122.89a21.83,21.83,0,0,1,21.76-21.76h61.95a21.83,21.83,0,0,1,21.76,21.76Z" />
                </Logo>
            </NavItem>
            <NavItem variant={props.variant === 'white' ? 'black' : 'white'} title="Planos" to="/home/planos">
                Planos
            </NavItem>
            <NavItem variant={props.variant === 'white' ? 'black' : 'white'} title="Contato" to="/home/contato">
                Contato
            </NavItem>
            <NavItem variant={props.variant === 'white' ? 'black' : 'white'} title="Sobre" to="/home/sobre">
                Sobre
            </NavItem>
        </Align>
        <div>
            {!props.login.success ? (
                <Fragment>
                    <Form.Button
                        rounded
                        to={props.login.success ? '/app' : '/auth/registro'}
                        tag={Link}
                        variant={props.variant === 'white' ? 'black' : 'white'}>
                        Registro
                    </Form.Button>{' '}
                </Fragment>
            ) : (
                ''
            )}
            <Form.Button
                outline
                rounded
                to={props.login.success ? '/app' : '/auth/login'}
                tag={Link}
                variant={props.variant === 'white' ? 'black' : 'white'}>
                {props.login.success ? 'Abrir' : 'Entrar'}
            </Form.Button>
        </div>
    </Nav>
);

const mapStateToProps = state => ({
    login: state.login
});

export default connect(mapStateToProps)(Navbar);
