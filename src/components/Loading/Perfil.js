import React, { Fragment } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import Grid from '../Grid/index';

const Div = styled.div`
    max-width: 100%;
    height: ${props => props.height};
    width: ${props => props.width};
    margin-top: ${props => props.marginTop};
    position: relative;
    overflow: hidden;
    border-radius: ${props => (props.rounded ? '50%' : '8px')};
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

const Padding = styled.div`
    padding: 0 1rem;
`;

const Perfil = () => (
    <Fragment>
        <Grid.Row alignItems="center">
            <Padding width="100px" height="100px">
                <Div width="100px" height="100px" variant="white" rounded padding />
            </Padding>
            <Grid.Grow>
                <Div width="300px" height="56px" variant="white" />
                <Div width="400px" height="28px" marginTop="8px" variant="primary" />
            </Grid.Grow>
            <Padding>
                <Div width="68px" height="43px" marginTop="8px" variant="primary" padding />
            </Padding>
        </Grid.Row>
        <Grid.Row>
            <Grid.Col
                order={[{ break: 0, value: 1 }, { break: 4, value: -1 }]}
                size={[{ break: 0, value: 12 }, { break: 4, value: 7 }]}>
                <Div width="100%" height="500px" marginTop="48px" />
            </Grid.Col>
            <Grid.Col
                order={[{ break: 0, value: 0 }, { break: 4, value: 0 }]}
                size={[{ break: 0, value: 12 }, { break: 4, value: 5 }]}>
                <Div width="100%" height="300px" marginTop="48px" />
            </Grid.Col>
        </Grid.Row>
    </Fragment>
);

export default Perfil;
