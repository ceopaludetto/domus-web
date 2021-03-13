import React, { Fragment } from 'react';
import styled from 'styled-components';

import Grid from '../../Grid/index';
import Form from '../../Form/index';
import Typo from '../../Typo/index';

const Paper = styled(Form.Paper)`
    position: relative;
    height: ${props => (props.full ? '100%' : 'auto')};
`;

const Grow = styled(Grid.Grow)`
    overflow: auto;
    width: 100%;
    flex: 1;
    padding-bottom: 1rem;
`;

const PaddingWrap = styled(Grid.Padding)`
    width: 100%;
    flex-wrap: wrap;
`;

const Image = () => (
    <Fragment>
        <PaddingWrap no visible>
            <Typo.Title variant="white">Mensagens</Typo.Title>
            <Typo.SubTitle variant="primary">Só no zipt zopt!</Typo.SubTitle>
        </PaddingWrap>
        <Grow>
            <Paper full>
                <Typo.Heading variant="white">Moradores</Typo.Heading>
                <Typo.SubHeading variant="primary">Encontre os online!</Typo.SubHeading>
            </Paper>
        </Grow>
    </Fragment>
);

export default Image;
