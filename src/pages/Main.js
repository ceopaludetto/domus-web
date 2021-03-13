import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Container from '../components/Grid/Container';
import Navbar from '../components/Main/Navbar';
import Footer from '../components/Main/Footer';
import HomeRoute from '../routes/home';

const Wrapper = styled.div`
    background-color: ${props => props.theme.color[props.variant]};
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    width: 100%;
`;

const ModifiedContainer = styled(Container)`
    padding: 32px 16px;
`;

class Main extends Component {
    render() {
        return (
            <Fragment>
                <Wrapper variant={this.props.color}>
                    <Navbar variant={this.props.color} />
                    <ModifiedContainer>
                        <HomeRoute />
                    </ModifiedContainer>
                    <Footer variant={this.props.color} />
                </Wrapper>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    color: state.color
});

export default connect(mapStateToProps)(Main);
