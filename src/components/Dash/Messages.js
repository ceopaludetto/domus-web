import React from 'react';
import styled from 'styled-components';

import Grid from '../Grid/index';

import Messages from './Messages/index';

const Wrapper = styled.div`
    flex: 1;
    width: 100%;
    padding: 0 1rem;
    overflow: hidden;
    height: 100%;
    @media (max-width: ${props => props.theme.break[3].size}px) {
        padding: 0;
    }
`;

const Mensagens = () => (
    <Wrapper>
        <Grid.Container gutter full>
            <Grid.Row flexDirection="column" flexWrap="nowrap" full>
                <Messages.Route />
            </Grid.Row>
        </Grid.Container>
    </Wrapper>
);

export default Mensagens;
