import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as themeActions } from '../../../redux/ducks/theme';
import styled from 'styled-components';

import Typo from '../../Typo/index';
import Form from '../../Form/index';
import Grid from '../../Grid/index';

import { themes } from '../../../redux/ducks/theme';

const Color = styled.div`
    border-radius: 50%;
    width: 40px;
    height: 40px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    position: relative;
    background-color: ${props => props.color};
    cursor: pointer;
`;

const Colors = styled(Grid.Row)`
    padding: 0 1rem;
    margin-bottom: 1rem;
    div {
        margin-right: 0.5rem;
    }
`;

class Aplicacao extends Component {
    handleChecked = () => {
        this.props.requestLight(!this.props.theme.light);
    };
    handleChange = prop => () => {
        this.props.requestSwitch(prop);
    };
    render() {
        return (
            <Fragment>
                <Grid.Row>
                    <Grid.Col size={[{ break: 0, value: 12 }]}>
                        <Form.Paper>
                            <Typo.Heading>Cores</Typo.Heading>
                            <Typo.SubHeading>Cansado desse {this.props.theme.name} monótono?</Typo.SubHeading>
                            <Typo.Label>Cor Principal</Typo.Label>
                            <Colors>
                                {themes.map((t, i) => (
                                    <Color key={i} onClick={this.handleChange(i)} color={t.color} />
                                ))}
                            </Colors>
                            <Typo.Label>Tema Claro</Typo.Label>
                            <Form.Switch
                                checked={this.props.theme.light}
                                onClick={this.handleChecked}
                                text="Você é o cara da claridade?"
                            />
                        </Form.Paper>
                    </Grid.Col>
                </Grid.Row>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({ theme: state.theme });

const mapDispatchToProps = dispatch => bindActionCreators(themeActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Aplicacao);
