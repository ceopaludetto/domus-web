import React, { createElement, Fragment } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { darken } from 'polished';

import Grid from '../Grid/index';

const Padding = styled.div`
    width: 80%;
    max-width: 330px;
    padding: 1rem 15px;
    height: 100%;
    @media (max-width: ${props => props.theme.break[3].size - 1}px) {
        max-width: none;
        width: 100%;
        height: auto;
        padding: 1rem 0 0 0;
        position: fixed;
        z-index: 15;
    }
`;

const Handling = styled.div`
    max-width: none;
    width: 100%;
    height: 83px;
    padding: 1rem 0 0 0;
    @media (min-width: ${props => props.theme.break[3].size - 1}px) {
        display: none;
    }
`;

const Frame = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    background-color: ${props => props.theme.color.back};
    @media (max-width: ${props => props.theme.break[3].size}px) {
        flex-direction: row;
        flex-wrap: wrap;
    }
`;

const Logo = styled.svg`
    width: 30%;
    margin-bottom: 1rem;
    path {
        transition: fill 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        fill: ${props => props.theme.color.primary};
        &:first-of-type {
            fill: ${props => darken(0.05, props.theme.color.primary)};
        }
    }
    @media (max-width: ${props => props.theme.break[3].size}px) {
        height: 48px;
        width: auto;
        margin-bottom: 0;
    }
`;

const Collection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
    @media (max-width: ${props => props.theme.break[3].size - 1}px) {
        margin-top: ${props => (props.open ? '1rem' : '0')};
        height: ${props => (props.open ? 'auto' : '0')};
        max-height: 300px;
        overflow-y: auto;
        order: 12;
        flex: 0 0 100%;
    }
`;

const ItemFrame = styled(({ tag = NavLink, children, ...props }) => createElement(tag, props, children))`
    cursor: pointer;
    text-decoration: none;
    width: 100%;
    border-radius: 4px;
    min-height: 48px;
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    padding: 1rem;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
    font-weight: 700;
    letter-spacing: 1.1px;
    text-transform: uppercase;
    transition: box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    background-color: transparent;
    color: ${props => (props.variant === 'black' ? props.theme.color.black : props.theme.color.white)};
    svg {
        margin-right: 0.5rem;
    }
    &:hover {
        background-color: ${props => props.theme.color.white}30;
    }
    &:active,
    &:focus {
        background-color: ${props => props.theme.color.white}40;
    }
    &.active {
        background-color: ${props => props.theme.color[props.variant]};
        color: ${props => (props.variant === 'black' ? props.theme.color.white : props.theme.color.black)};
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    }
`;

ItemFrame.defaultProps = {
    variant: 'primary'
};

const MenuIcon = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-grow: 1;
    svg {
        margin-right: 0;
    }
`;

const SubMenu = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 0 1rem 1rem 2rem;
    a,
    span {
        &:last-of-type {
            margin-bottom: 0;
        }
    }
`;

const ItemFrameVariation = styled.div`
    text-decoration: none;
    width: 100%;
    border-radius: 4px;
    transition: ${props => (!props.open ? 'none' : 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms')};
    background-color: ${props => (props.open ? props.theme.color.primary : 'transparent')};
    svg {
        margin-right: 0.5rem;
    }
`;

const ItemFrameVariationHandler = styled.span`
    cursor: pointer;
    text-decoration: none;
    padding: 1rem;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
    font-weight: 700;
    letter-spacing: 1.1px;
    width: 100%;
    text-transform: uppercase;
    transition: ${props =>
        !props.open
            ? 'none'
            : 'box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'};
    background-color: transparent;
    color: ${props => (props.open ? props.theme.color.black : props.theme.color.white)};
    display: flex;
    align-items: center;
`;

const Item = props => (
    <Fragment>
        {props.menu ? (
            <ItemFrameVariation open={props.open ? 1 : 0}>
                <ItemFrameVariationHandler {...props} onClick={props.onClick} open={props.open ? 1 : 0}>
                    {props.children}
                    <MenuIcon>{props.open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</MenuIcon>
                </ItemFrameVariationHandler>
                {props.submenu && props.open ? <SubMenu>{props.submenu}</SubMenu> : ''}
            </ItemFrameVariation>
        ) : (
            <ItemFrame {...props}>{props.children}</ItemFrame>
        )}
    </Fragment>
);

const Bottom = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    @media (max-width: ${props => props.theme.break[3].size - 1}px) {
        padding: 0;
        justify-content: flex-end;
        a:nth-child(2) {
            order: 3;
            margin-right: 0;
        }
        a {
            margin-right: 0.25rem;
        }
    }
`;

const Menu = styled.div`
    display: none;
    text-align: left;
    align-items: center;
    @media (max-width: ${props => props.theme.break[3].size - 1}px) {
        display: flex;
    }
`;

const Avatar = styled.img`
    border-radius: 50%;
    height: 48px;
    width: 48px;
`;

const Container = styled(Grid.Container)`
    height: 100%;
    @media (min-width: ${props => props.theme.break[3].size}px) {
        padding: 0;
        max-width: none !important;
    }
`;

const Sidebar = {
    Collection,
    Container,
    Handling,
    Padding,
    Avatar,
    Bottom,
    Frame,
    Item,
    Menu,
    Logo
};

export default Sidebar;
