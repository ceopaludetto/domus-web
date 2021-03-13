import React, { Fragment } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

const Div = styled.div`
    max-width: 100%;
    height: ${props => props.height};
    width: ${props => props.width};
    margin-top: ${props => props.marginTop};
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    background: linear-gradient(
        -45deg,
        ${props => props.theme.color[props.variant]},
        ${props => darken(0.025, props.theme.color[props.variant])}
    );
    opacity: 0.6;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
`;

Div.defaultProps = {
    variant: 'back'
};

const Component = () => (
    <Fragment>
        <Div width="300px" height="56px" variant="white" />
        <Div width="400px" height="28px" marginTop="8px" variant="primary" />
        <Div width="100%" height="500px" marginTop="48px" />
    </Fragment>
);

export default Component;
