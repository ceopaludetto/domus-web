import React from 'react';
import styled from 'styled-components';

const LabelFrame = styled.label`
    font-size: 0.8rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    display: block;
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    color: ${props => (props.error ? props.theme.color.error : `${props.theme.color.white}70`)};
`;

const Required = styled.span`
    font-size: 0.9rem;
    color: ${props => (props.error ? props.theme.color.error : props.theme.color.primary)};
`;

const Error = styled.span`
    text-transform: none;
    font-style: italic;
    font-size: 0.7rem;
`;

const Label = props => (
    <LabelFrame {...props}>
        {props.children}
        {props.required && <Required error={props.error ? 1 : 0}> *</Required>}
        {props.error && <Error> - {props.error}</Error>}
    </LabelFrame>
);

export default Label;
