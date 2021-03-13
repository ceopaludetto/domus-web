import React from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

import Paper from './Paper';
import Button from './Button';

const Back = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    justify-content: center;
    align-items: center;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.5);
    display: ${props => (props.open ? 'flex' : 'none')};
    ${props => (props.open ? 'animation: back 0.25s ease 0s;' : '')};
    @keyframes back {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;

const Frame = styled(Paper)`
    padding: 0;
    max-width: 500px;
    overflow: hidden;
    ${props => (props.open ? 'animation: animate 0.25s ease 0s;' : '')};
    @keyframes animate {
        0% {
            transform: scale(0);
        }
        75% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }
`;

const Title = styled.div`
    padding: 20px 1rem;
    font-size: 1.25rem;
    font-weight: 700;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    color: ${props => props.theme.color.white};
    background-color: ${props => props.theme.color.black};
`;

const Body = styled.div`
    padding: 20px 1rem;
    font-size: 1rem;
    font-weight: 400;
    color: ${props => props.theme.color.white};
`;

const Modal = props => (
    <Back open={props.open}>
        <Frame open={props.open}>
            {props.title ? (
                <Title>
                    {props.title}
                    <Button icon rounded onClick={props.closeClick}>
                        <MdClose size={24} />
                    </Button>
                </Title>
            ) : (
                ''
            )}
            <Body title={props.title ? 1 : 0}>{props.children}</Body>
        </Frame>
    </Back>
);

export default Modal;
