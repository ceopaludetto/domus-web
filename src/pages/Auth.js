import React, { Component } from 'react';
import styled from 'styled-components';

import Form from '../components/Form/index';

import AuthRoute from '../routes/auth';

const ModifiedPaper = styled(Form.Paper)`
    max-width: 500px;
    @media (max-width: 500px) {
        height: 100%;
        border-radius: 0;
    }
`;

export default class Auth extends Component {
    render() {
        return (
            <Form.Wrapper>
                <ModifiedPaper>
                    <AuthRoute />
                </ModifiedPaper>
            </Form.Wrapper>
        );
    }
}
