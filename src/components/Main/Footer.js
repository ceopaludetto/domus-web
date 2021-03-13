import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

import Form from '../Form/index';
import Grid from '../Grid/index';
import Typo from '../Typo/index';

const Foot = styled.footer`
    width: 100%;
    position: relative;
`;

const Title = styled(Typo.Label)`
    font-size: 1rem;
    color: ${props => props.theme.color[props.variant]};
`;

const Item = styled(Typo.Link)`
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-size: 0.9rem;
    font-weight: 400;
    text-transform: uppercase;
    display: block;
    margin-bottom: 0.25rem;
`;

const Svg = styled.svg`
    width: 100%;
    path {
        transition: fill 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        fill: ${props => props.theme.color[props.variant]};
    }
    @media (max-width: ${props => props.theme.break[1].size}px) {
        height: 100px;
    }
`;

const Path = styled.path`
    transform-origin: 50% 50%;
    transform-box: fill-box;
    @media (min-width: ${props => props.theme.break[3].size}px) {
        &:nth-child(even) {
            animation: animate 8s ease infinite;
        }
        &:nth-child(odd) {
            animation: animateAlternate 8s ease infinite;
        }
    }
    @keyframes animate {
        0% {
            transform: translate(5px, -20px);
        }
        50% {
            transform: translate(0px, 0px);
        }
        100% {
            transform: translate(5px, -20px);
        }
    }
    @keyframes animateAlternate {
        0% {
            transform: translate(0px, 0px);
        }
        50% {
            transform: translate(0px, -10px);
        }
        100% {
            transform: translate(0px, 0px);
        }
    }
`;

const Wrapper = styled.div`
    background-color: ${props => props.theme.color[props.variant]};
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: -10px;
`;

const Content = styled(Grid.Row)`
    max-width: 1600px;
    width: 100%;
    padding: 0 16px;
`;

const Last = styled(Grid.Col)`
    padding: 1.5rem 0;
    @media (min-width: ${props => props.theme.break[3].size}px) {
        padding-bottom: 0;
    }
`;

const Logo = styled.svg`
    width: 70px;
    path {
        transition: fill 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        fill: ${props => props.theme.color[props.variant]};
        &:first-of-type {
            fill: ${props => darken(0.05, props.theme.color[props.variant])};
        }
    }
`;

const Footer = props => (
    <Foot>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1920 300"
            variant={props.variant === 'white' ? 'black' : 'white'}>
            <Path d="M-4.16,853.86a14.31,14.31,0,0,1-6.29-1.44l-53.84-26a14.45,14.45,0,0,1-7.4-8.32A14.49,14.49,0,0,1-71.07,807L185.3,276.07a14.68,14.68,0,0,1,13.16-8.22,14.41,14.41,0,0,1,6.28,1.44l53.85,26a14.59,14.59,0,0,1,6.78,19.43L9,845.64A14.67,14.67,0,0,1-4.16,853.86Z" />
            <Path d="M-175.21,847.59a14.23,14.23,0,0,1-6.28-1.44l-53.85-26a14.45,14.45,0,0,1-7.4-8.32,14.49,14.49,0,0,1,.62-11.12L14.25,269.8a14.69,14.69,0,0,1,13.16-8.22A14.41,14.41,0,0,1,33.69,263l53.85,26a14.57,14.57,0,0,1,6.78,19.43L-162.06,839.37A14.67,14.67,0,0,1-175.21,847.59Z" />
            <Path d="M246.48,832.63a14.31,14.31,0,0,1-6.29-1.44l-53.85-26a14.61,14.61,0,0,1-6.77-19.44L435.94,254.84a14.68,14.68,0,0,1,13.15-8.22,14.42,14.42,0,0,1,6.29,1.44l53.85,26A14.59,14.59,0,0,1,516,293.5L259.63,824.41A14.67,14.67,0,0,1,246.48,832.63Z" />
            <Path d="M126.38,742a14.31,14.31,0,0,1-6.29-1.44l-53.84-26a14.57,14.57,0,0,1-6.78-19.44l256.37-530.9A14.68,14.68,0,0,1,329,156a14.27,14.27,0,0,1,6.28,1.44l53.85,26a14.6,14.6,0,0,1,6.78,19.44L139.53,733.83A14.66,14.66,0,0,1,126.38,742Z" />
            <Path d="M168.08,825.83a14.32,14.32,0,0,1-6.29-1.45l-53.85-26a14.58,14.58,0,0,1-6.77-19.44L357.54,248a14.65,14.65,0,0,1,13.15-8.22,14.28,14.28,0,0,1,6.29,1.44l53.85,26a14.62,14.62,0,0,1,6.78,19.44L181.23,817.61A14.67,14.67,0,0,1,168.08,825.83Z" />
            <Path d="M-67.65,803.63a14.31,14.31,0,0,1-6.29-1.44l-53.84-26a14.45,14.45,0,0,1-7.4-8.32,14.49,14.49,0,0,1,.62-11.12L121.81,225.84A14.69,14.69,0,0,1,135,217.62a14.41,14.41,0,0,1,6.28,1.44l53.85,26a14.57,14.57,0,0,1,6.78,19.43L-54.5,795.41A14.67,14.67,0,0,1-67.65,803.63Z" />
            <Path d="M359.61,779.35a14.45,14.45,0,0,1-6.29-1.44l-53.85-26a14.58,14.58,0,0,1-6.77-19.44L549.07,201.56a14.68,14.68,0,0,1,13.15-8.22,14.42,14.42,0,0,1,6.29,1.44l53.85,26a14.63,14.63,0,0,1,6.78,19.44L372.76,771.13A14.67,14.67,0,0,1,359.61,779.35Z" />
            <Path d="M457.69,730a14.27,14.27,0,0,1-6.28-1.44l-53.85-26a14.6,14.6,0,0,1-6.78-19.44l256.38-530.9A14.65,14.65,0,0,1,660.31,144a14.31,14.31,0,0,1,6.29,1.44l53.84,26a14.6,14.6,0,0,1,6.78,19.44L470.85,721.83A14.69,14.69,0,0,1,457.69,730Z" />
            <Path d="M496.79,826.22a14.31,14.31,0,0,1-6.29-1.44l-53.84-26a14.57,14.57,0,0,1-6.78-19.44l256.37-530.9a14.67,14.67,0,0,1,13.16-8.22,14.27,14.27,0,0,1,6.28,1.44l53.85,26a14.6,14.6,0,0,1,6.78,19.44L509.94,818A14.65,14.65,0,0,1,496.79,826.22Z" />
            <Path d="M594.4,812.42a14.45,14.45,0,0,1-6.29-1.44l-53.84-26a14.57,14.57,0,0,1-6.78-19.44l256.37-530.9A14.67,14.67,0,0,1,797,226.41a14.27,14.27,0,0,1,6.28,1.44l53.85,26a14.6,14.6,0,0,1,6.78,19.44L607.55,804.2A14.67,14.67,0,0,1,594.4,812.42Z" />
            <Path d="M703.54,774.54a14.45,14.45,0,0,1-6.29-1.44l-53.84-26a14.61,14.61,0,0,1-6.78-19.44L893,196.75a14.68,14.68,0,0,1,13.15-8.22,14.42,14.42,0,0,1,6.29,1.44l53.85,26a14.57,14.57,0,0,1,6.78,19.44L716.69,766.32A14.67,14.67,0,0,1,703.54,774.54Z" />
            <Path d="M791.87,777.55a14.37,14.37,0,0,1-6.28-1.44l-53.85-26A14.61,14.61,0,0,1,725,730.67L981.33,199.76a14.69,14.69,0,0,1,13.16-8.22,14.41,14.41,0,0,1,6.28,1.44l53.85,26a14.61,14.61,0,0,1,6.78,19.44L805,769.33A14.69,14.69,0,0,1,791.87,777.55Z" />
            <Path d="M843.7,853.9a14.41,14.41,0,0,1-6.28-1.44l-53.85-26A14.6,14.6,0,0,1,776.79,807l256.38-530.9a14.67,14.67,0,0,1,13.15-8.22,14.31,14.31,0,0,1,6.29,1.44l53.84,26a14.6,14.6,0,0,1,6.78,19.44L856.86,845.68A14.68,14.68,0,0,1,843.7,853.9Z" />
            <Path d="M977.32,758.64A14.28,14.28,0,0,1,971,757.2l-53.85-26a14.58,14.58,0,0,1-6.78-19.44l256.38-530.91a14.67,14.67,0,0,1,13.15-8.22,14.45,14.45,0,0,1,6.29,1.44l53.85,26a14.6,14.6,0,0,1,6.77,19.43L990.47,750.42A14.67,14.67,0,0,1,977.32,758.64Z" />
            <Path d="M1085.78,725.73a14.28,14.28,0,0,1-6.29-1.44l-53.85-26a14.61,14.61,0,0,1-6.78-19.44L1289.31,118.8a14.66,14.66,0,0,1,13.15-8.22,14.28,14.28,0,0,1,6.29,1.44l53.85,26a14.6,14.6,0,0,1,6.78,19.44L1098.93,717.51A14.68,14.68,0,0,1,1085.78,725.73Z" />
            <Path d="M1173.93,729.94a14.23,14.23,0,0,1-6.28-1.44l-53.85-26a14.57,14.57,0,0,1-6.78-19.44L1391.2,94.57a14.67,14.67,0,0,1,13.16-8.22,14.27,14.27,0,0,1,6.28,1.44l53.85,26a14.57,14.57,0,0,1,6.78,19.44L1187.09,721.72A14.69,14.69,0,0,1,1173.93,729.94Z" />
            <Path d="M1261.69,733.49a14.29,14.29,0,0,1-6.29-1.45l-53.85-26a14.57,14.57,0,0,1-6.78-19.44l318.3-659.14a14.68,14.68,0,0,1,13.16-8.22,14.41,14.41,0,0,1,6.28,1.44l53.85,26a14.59,14.59,0,0,1,6.78,19.43l-318.3,659.15A14.68,14.68,0,0,1,1261.69,733.49Z" />
            <Path d="M1334.75,732.66a14.31,14.31,0,0,1-6.29-1.44l-53.84-26a14.6,14.6,0,0,1-6.78-19.44l276-571.59A14.67,14.67,0,0,1,1557,106a14.31,14.31,0,0,1,6.29,1.44l53.85,26a14.58,14.58,0,0,1,6.77,19.44l-276,571.59A14.65,14.65,0,0,1,1334.75,732.66Z" />
            <Path d="M1457.47,790.71a14.31,14.31,0,0,1-6.29-1.44l-53.84-26a14.6,14.6,0,0,1-6.78-19.44l256.37-530.91a14.67,14.67,0,0,1,13.15-8.21,14.28,14.28,0,0,1,6.29,1.44l53.85,26a14.57,14.57,0,0,1,6.78,19.44l-256.38,530.9A14.65,14.65,0,0,1,1457.47,790.71Z" />
            <Path d="M1366.23,816.32a14.23,14.23,0,0,1-6.28-1.44l-53.85-26a14.6,14.6,0,0,1-6.78-19.44l256.37-530.9a14.68,14.68,0,0,1,13.16-8.22,14.23,14.23,0,0,1,6.28,1.44l53.85,26a14.57,14.57,0,0,1,6.78,19.44L1379.38,808.1A14.65,14.65,0,0,1,1366.23,816.32Z" />
            <Path d="M1579.75,715.66a14.31,14.31,0,0,1-6.29-1.44l-53.84-26a14.6,14.6,0,0,1-6.78-19.44l276-571.59A14.67,14.67,0,0,1,1802,89a14.31,14.31,0,0,1,6.29,1.44l53.85,26a14.58,14.58,0,0,1,6.77,19.44l-276,571.59A14.65,14.65,0,0,1,1579.75,715.66Z" />
            <Path d="M1735.47,662.71a14.31,14.31,0,0,1-6.29-1.44l-53.84-26a14.6,14.6,0,0,1-6.78-19.44L1924.93,84.92a14.67,14.67,0,0,1,13.15-8.21,14.28,14.28,0,0,1,6.29,1.44l53.85,26a14.57,14.57,0,0,1,6.78,19.44l-256.38,530.9A14.65,14.65,0,0,1,1735.47,662.71Z" />
            <Path d="M1781.47,746.71a14.31,14.31,0,0,1-6.29-1.44l-53.84-26a14.6,14.6,0,0,1-6.78-19.44l256.37-530.91a14.67,14.67,0,0,1,13.15-8.21,14.28,14.28,0,0,1,6.29,1.44l53.85,26a14.57,14.57,0,0,1,6.78,19.44l-256.38,530.9A14.65,14.65,0,0,1,1781.47,746.71Z" />
            <Path d="M1859.47,752.71a14.31,14.31,0,0,1-6.29-1.44l-53.84-26a14.6,14.6,0,0,1-6.78-19.44l256.37-530.91a14.67,14.67,0,0,1,13.15-8.21,14.28,14.28,0,0,1,6.29,1.44l53.85,26a14.57,14.57,0,0,1,6.78,19.44l-256.38,530.9A14.65,14.65,0,0,1,1859.47,752.71Z" />
            <Path d="M1643.23,732.32a14.23,14.23,0,0,1-6.28-1.44l-53.85-26a14.6,14.6,0,0,1-6.78-19.44l256.37-530.9a14.68,14.68,0,0,1,13.16-8.22,14.23,14.23,0,0,1,6.28,1.44l53.85,26a14.57,14.57,0,0,1,6.78,19.44L1656.38,724.1A14.65,14.65,0,0,1,1643.23,732.32Z" />
        </Svg>
        <Wrapper variant={props.variant === 'white' ? 'black' : 'white'}>
            <Content>
                <Grid.Col>
                    <Grid.Row justifyContent="center">
                        <Grid.Col
                            size={[{ break: 0, value: 12 }, { break: 3, value: 2 }]}
                            textAlign={[{ break: 0, value: 'center' }, { break: 3, value: 'left' }]}>
                            <Link to="/home" title="Domus">
                                <Logo
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 1020 1020"
                                    variant={props.variant === 'primary' ? 'black' : 'primary'}>
                                    <path d="M889,408.87H610.21V510H657.8a21.83,21.83,0,0,1,21.76,21.76v62a21.83,21.83,0,0,1-21.76,21.76H610.21V716.6H657.8a21.83,21.83,0,0,1,21.76,21.76v61.95a21.83,21.83,0,0,1-21.76,21.76H610.21V998.24A21.85,21.85,0,0,1,595,1019a21.44,21.44,0,0,0,6.59,1H747.47V836.6a21.83,21.83,0,0,1,21.75-21.76h60.51a21.83,21.83,0,0,1,21.76,21.76V1020H889a21.83,21.83,0,0,0,21.75-21.76V430.62A21.82,21.82,0,0,0,889,408.87ZM851.49,593.71a21.83,21.83,0,0,1-21.76,21.76h-62A21.83,21.83,0,0,1,746,593.71v-62A21.83,21.83,0,0,1,767.78,510h62a21.83,21.83,0,0,1,21.76,21.76Z" />
                                    <path d="M592.46,0H121.64A21.83,21.83,0,0,0,99.88,21.76V998.24A21.83,21.83,0,0,0,121.64,1020H404.72V836.6a21.83,21.83,0,0,1,21.76-21.76H487a21.83,21.83,0,0,1,21.76,21.76V1020h83.71a21.42,21.42,0,0,0,6.58-1,21.85,21.85,0,0,0,15.17-20.73V21.76A21.83,21.83,0,0,0,592.46,0ZM305,800.31a21.83,21.83,0,0,1-21.76,21.76H221.33a21.83,21.83,0,0,1-21.76-21.76V738.36a21.83,21.83,0,0,1,21.76-21.76h61.95A21.83,21.83,0,0,1,305,738.36Zm0-206.6a21.83,21.83,0,0,1-21.76,21.76H221.33a21.83,21.83,0,0,1-21.76-21.76v-62A21.83,21.83,0,0,1,221.33,510h61.95A21.83,21.83,0,0,1,305,531.76Zm0-206.6a21.83,21.83,0,0,1-21.76,21.76H221.33a21.83,21.83,0,0,1-21.76-21.76V325.16a21.82,21.82,0,0,1,21.76-21.76h61.95A21.83,21.83,0,0,1,305,325.16Zm0-202.27a21.83,21.83,0,0,1-21.76,21.76H221.33a21.82,21.82,0,0,1-21.76-21.76V122.89a21.83,21.83,0,0,1,21.76-21.76h61.95A21.83,21.83,0,0,1,305,122.89ZM510.19,593.71a21.83,21.83,0,0,1-21.76,21.76H426.48a21.83,21.83,0,0,1-21.76-21.76v-62A21.83,21.83,0,0,1,426.48,510h61.95a21.83,21.83,0,0,1,21.76,21.76Zm0-206.6a21.83,21.83,0,0,1-21.76,21.76H426.48a21.83,21.83,0,0,1-21.76-21.76V325.16a21.83,21.83,0,0,1,21.76-21.76h61.95a21.82,21.82,0,0,1,21.76,21.76Zm0-202.27a21.82,21.82,0,0,1-21.76,21.76H426.48a21.83,21.83,0,0,1-21.76-21.76V122.89a21.83,21.83,0,0,1,21.76-21.76h61.95a21.83,21.83,0,0,1,21.76,21.76Z" />
                                </Logo>
                            </Link>
                        </Grid.Col>
                        <Grid.Col
                            size={[{ break: 0, value: 6 }, { break: 3, value: 2 }]}
                            textAlign={[{ break: 0, value: 'center' }, { break: 3, value: 'left' }]}
                            margin={[
                                { break: 0, side: [{ name: 'top', value: '1rem' }] },
                                { break: 3, side: [{ name: 'top', value: '0' }] }
                            ]}>
                            <Title variant={props.variant === 'primary' ? 'black' : 'primary'}>Produto</Title>
                            <Item
                                to="/home/funcionalidades"
                                title="Funcionalidades"
                                variant={props.variant === 'primary' ? 'black' : 'primary'}>
                                Funcionalidades
                            </Item>
                            <Item
                                to="/home/planos"
                                title="Planos"
                                variant={props.variant === 'primary' ? 'black' : 'primary'}>
                                Planos
                            </Item>
                        </Grid.Col>
                        <Grid.Col
                            size={[{ break: 0, value: 6 }, { break: 3, value: 2 }]}
                            textAlign={[{ break: 0, value: 'center' }, { break: 3, value: 'left' }]}
                            margin={[
                                { break: 0, side: [{ name: 'top', value: '1rem' }] },
                                { break: 3, side: [{ name: 'top', value: '0' }] }
                            ]}>
                            <Title variant={props.variant === 'primary' ? 'black' : 'primary'}>Empresa</Title>
                            <Item
                                to="/home/sobre"
                                title="Sobre"
                                variant={props.variant === 'primary' ? 'black' : 'primary'}>
                                Sobre
                            </Item>
                            <Item
                                to="/home/contato"
                                title="Contato"
                                variant={props.variant === 'primary' ? 'black' : 'primary'}>
                                Contato
                            </Item>
                        </Grid.Col>
                        <Grid.Col
                            size={[{ break: 0, value: 6 }, { break: 3, value: 2 }]}
                            textAlign={[{ break: 0, value: 'center' }, { break: 3, value: 'left' }]}
                            margin={[
                                { break: 0, side: [{ name: 'top', value: '1rem' }] },
                                { break: 3, side: [{ name: 'top', value: '0' }] }
                            ]}>
                            <Title variant={props.variant === 'primary' ? 'black' : 'primary'}>Recursos</Title>
                            <Item
                                to="/home/diretrizes"
                                title="Diretrizes"
                                variant={props.variant === 'primary' ? 'black' : 'primary'}>
                                Diretrizes
                            </Item>
                            <Item
                                to="/home/termos"
                                title="Termos"
                                variant={props.variant === 'primary' ? 'black' : 'primary'}>
                                Termos
                            </Item>
                            <Item
                                to="/home/privacidade"
                                title="Privacidade"
                                variant={props.variant === 'primary' ? 'black' : 'primary'}>
                                Privacidade
                            </Item>
                        </Grid.Col>
                        <Grid.Col
                            size={[{ break: 0, value: 6 }, { break: 3, value: 2 }]}
                            textAlign={[{ break: 0, value: 'center' }, { break: 3, value: 'left' }]}
                            margin={[
                                { break: 0, side: [{ name: 'top', value: '1rem' }] },
                                { break: 3, side: [{ name: 'top', value: '0' }] }
                            ]}>
                            <Title variant={props.variant === 'primary' ? 'black' : 'primary'}>Desenvolvedores</Title>
                            <Item
                                to="/home/api"
                                title="API"
                                variant={props.variant === 'primary' ? 'black' : 'primary'}>
                                API
                            </Item>
                            <Item
                                to="/home/bibliotecas"
                                title="Bibliotecas"
                                variant={props.variant === 'primary' ? 'black' : 'primary'}>
                                Bibliotecas
                            </Item>
                        </Grid.Col>
                    </Grid.Row>
                </Grid.Col>
                <Last size={[{ break: 0, value: 12 }]} margin={[{ break: 0, side: [{ name: 'top', value: '2rem' }] }]}>
                    <Grid.Row>
                        <Grid.Col
                            size={[{ break: 0, value: 12 }, { break: 3, value: 6 }]}
                            textAlign={[{ break: 0, value: 'center' }, { break: 3, value: 'left' }]}>
                            <Typo.Heading variant={props.variant === 'white' ? 'white' : 'black'}>
                                {props.login.success
                                    ? 'Bem vindo(a) de volta!'
                                    : 'Pronto(a) para experimentar nosso sistema?'}
                            </Typo.Heading>
                            <Typo.SubHeading>Vamos logo!</Typo.SubHeading>
                        </Grid.Col>
                        <Grid.Col
                            size={[{ break: 0, value: 12 }, { break: 3, value: 6 }]}
                            textAlign={[{ break: 0, value: 'center' }, { break: 3, value: 'right' }]}>
                            <Form.Button
                                raised
                                rounded
                                to={props.login.success ? '/app' : '/auth/login'}
                                tag={Link}
                                variant={props.variant === 'primary' ? 'black' : 'primary'}>
                                {props.login.success ? 'Abrir' : 'Entrar'}
                            </Form.Button>
                        </Grid.Col>
                    </Grid.Row>
                </Last>
            </Content>
        </Wrapper>
    </Foot>
);

const mapStateToProps = state => ({
    login: state.login
});

export default connect(mapStateToProps)(Footer);
