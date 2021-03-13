import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

const Frame = styled.div`
    display: flex;
    margin-bottom: 0.25rem;
    overflow: hidden;
    justify-content: ${props => (props.from ? 'flex-start' : 'flex-end')};
    padding: ${props => (props.from ? '0 1.5rem 0 0' : '0 0 0 1.5rem')};
`;

const Message = styled.div`
    padding: 0.5rem 1rem;
    border-radius: 4px;
    max-width: 60%;
    width: auto;
    word-wrap: break-word;
    color: ${props => (props.from ? props.theme.color.white : props.theme.color.black)};
    background-color: ${props => (props.from ? darken(0.1, props.theme.color.black) : props.theme.color.primary)};
`;

const From = props => (
    <Frame from={props.from ? 1 : 0}>
        <Message from={props.from ? 1 : 0}>{props.children}</Message>
    </Frame>
);

export default From;
