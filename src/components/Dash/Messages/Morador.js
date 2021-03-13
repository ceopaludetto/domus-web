import ReactDOM from 'react-dom';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdSend, MdAttachFile } from 'react-icons/md';
import styled from 'styled-components';

import { Creators as messageActions } from '../../../redux/ducks/message';
import { Creators as moradorActions } from '../../../redux/ducks/morador';

import Container from '../Container';
import Messages from './index';
import Grid from '../../Grid/index';
import Form from '../../Form/index';
import Typo from '../../Typo/index';

const Paper = styled(Form.Paper)`
    padding: 24px 20px;
    position: relative;
    height: ${props => (props.full ? '100%' : 'auto')};
    @media (max-width: ${props => props.theme.break[3].size}px) {
        padding: 12px 10px;
    }
`;

const Grow = styled(Grid.Grow)`
    overflow: auto;
    width: 100%;
    flex: 1;
    padding-bottom: 1rem;
`;

const Padding = styled(Grid.Padding)`
    width: 100%;
    padding: 0;
`;

const PaddingWrap = styled(Grid.Padding)`
    width: 100%;
    flex-wrap: wrap;
`;

const Row = styled(Grid.Row)`
    margin: 0;
    width: 100%;
`;

class Morador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Text: ''
        };
    }
    componentWillMount() {
        this.props.actions.requestMessageLoad(
            Number(this.props.match.params.id),
            this.props.login.data.MORADOR.MOR_INT_ID
        );
        this.props.actions.requestMoradorLoadId(Number(this.props.match.params.id));
    }
    componentDidUpdate() {
        const { scroll } = this.refs;
        let dom = ReactDOM.findDOMNode(scroll);
        let child = dom.children[0];
        child.scrollTo(0, child.scrollHeight);
    }
    handleChange = prop => e => this.setState({ [prop]: e.target.value });
    handleMessage = () => {
        this.props.actions.requestMessage(
            this.state.Text,
            this.props.login.data.MORADOR.MOR_INT_ID,
            Number(this.props.match.params.id)
        );
        this.setState({ Text: '' });
    };
    render() {
        const messages = this.props.message.messages;
        const morador = this.props.login.data.MORADOR;
        const dest = this.props.morador.morador;
        return (
            <Fragment>
                <PaddingWrap no visible>
                    <Typo.Title variant="white">{dest.MOR_STR_NOME}</Typo.Title>
                    <Typo.SubTitle variant="primary">{dest.MOR_BIT_SIN ? 'Síndico' : 'Morador'}</Typo.SubTitle>
                </PaddingWrap>
                <Grow>
                    <Paper full>
                        <Container fluid inner no id="Container" ref="scroll">
                            {messages.filter((m, i) => i > i - 20).map((m, i) => (
                                <Messages.Message key={m.MSG_INT_ID} from={m.MOR_INT_ID !== morador.MOR_INT_ID}>
                                    {m.MSG_STR_DESC}
                                </Messages.Message>
                            ))}
                        </Container>
                    </Paper>
                </Grow>
                <Padding no visible>
                    <Row>
                        <Grid.Col size={[{ break: 0, value: 12 }]}>
                            <Paper>
                                <Grid.Row alignItems="center">
                                    <Grid.Grow>
                                        <Form.Control
                                            helper
                                            value={this.state.Text}
                                            onChange={this.handleChange('Text')}
                                            append={
                                                <Form.Button variant="white" icon rounded>
                                                    <MdAttachFile />
                                                </Form.Button>
                                            }
                                        />
                                    </Grid.Grow>
                                    <Grid.Padding no visible>
                                        <Form.Button icon rounded onClick={this.handleMessage}>
                                            <MdSend />
                                        </Form.Button>
                                    </Grid.Padding>
                                </Grid.Row>
                            </Paper>
                        </Grid.Col>
                    </Row>
                </Padding>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    message: state.message,
    morador: state.morador,
    login: state.login
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, messageActions, moradorActions), dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Morador);
