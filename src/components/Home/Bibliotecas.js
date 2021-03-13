import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as colorActions } from '../../redux/ducks/color';

import Typo from '../Typo/index';
import Form from '../Form/index';
import Grid from '../Grid/index';

const back = [
    {
        nome: 'Bcryptjs',
        desc: 'Optimized bcrypt in plain JavaScript with zero dependencies.',
        github: 'https://github.com/dcodeIO/bcrypt.js'
    },
    {
        nome: 'Body-parser',
        desc: 'Node.js body parsing middleware.',
        github: 'https://github.com/expressjs/body-parser'
    },
    {
        nome: 'Cors',
        desc: 'Node.js CORS middleware.',
        github: 'https://github.com/expressjs/cors'
    },
    {
        nome: 'Express',
        desc: 'Fast, unopinionated, minimalist web framework for node.',
        github: 'https://github.com/expressjs/express'
    },
    {
        nome: 'Ip',
        desc: 'IP address tools for node.js.',
        github: 'https://github.com/indutny/node-ip'
    },
    {
        nome: 'Jsonwebtoken',
        desc: 'JsonWebToken implementation for node.js.',
        github: 'https://github.com/auth0/node-jsonwebtoken'
    },
    {
        nome: 'Morgan',
        desc: 'HTTP request logger middleware for node.js.',
        github: 'https://github.com/expressjs/morgan'
    },
    {
        nome: 'Nodemailer',
        desc: 'Send e-mails with Node.JS – easy as cake!',
        github: 'https://github.com/nodemailer/nodemailer'
    },
    {
        nome: 'Nodemailer-express-handlebars',
        desc: 'A plugin for nodemailer that uses express-handlebars view engine to generate emails.',
        github: 'https://github.com/yads/nodemailer-express-handlebars'
    },
    {
        nome: 'Sequelize',
        desc: 'An easy-to-use multi SQL dialect ORM for Node.js.',
        github: 'https://github.com/sequelize/sequelize'
    },
    {
        nome: 'Socket.io',
        desc: 'Realtime application framework (Node.JS server).',
        github: 'https://github.com/socketio/socket.io'
    },
    {
        nome: 'Tedious',
        desc: 'Node TDS module for connecting to SQL Server databases.',
        github: 'https://github.com/tediousjs/tedious'
    }
];

const front = [
    {
        nome: 'Apisauce',
        desc: 'Axios + standardized errors + request/response transforms.',
        github: 'https://github.com/infinitered/apisauce'
    },
    {
        nome: 'Connected-React-Router',
        desc: 'A Redux binding for React Router v4.',
        github: 'https://github.com/supasate/connected-react-router'
    },
    {
        nome: 'Create-react-app',
        desc: 'Create React apps with no build configuration.',
        github: 'https://github.com/facebook/create-react-app'
    },
    {
        nome: 'History',
        desc: 'Manage session history with JavaScript.',
        github: 'https://github.com/ReactTraining/history'
    },
    {
        nome: 'Moment',
        desc: 'Parse, validate, manipulate, and display dates in javascript.',
        github: 'https://github.com/moment/moment/'
    },
    {
        nome: 'Polished',
        desc: 'A lightweight toolset for writing styles in JavaScript.',
        github: 'https://github.com/styled-components/polished'
    },
    {
        nome: 'Prop-types',
        desc: 'Runtime type checking for React props and similar objects.',
        github: 'https://github.com/facebook/prop-types'
    },
    { nome: 'Rc-slider', desc: 'React Slider', github: 'https://github.com/react-component/slider' },
    {
        nome: 'React',
        desc: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
        github: 'https://github.com/facebook/react'
    },
    {
        nome: 'React-dom',
        desc: 'This package serves as the entry point to the DOM and server renderers for React.',
        github: 'https://github.com/facebook/react/tree/master/packages/react-dom'
    },
    {
        nome: 'React-icons',
        desc: 'Svg react icons of popular icon packs.',
        github: 'https://github.com/react-icons/react-icons'
    },
    {
        nome: 'React-redux',
        desc: 'Official React bindings for Redux.',
        github: 'https://github.com/reduxjs/react-redux'
    },
    {
        nome: 'React-text-mask',
        desc: 'Input mask for React, Angular, Ember, Vue, & plain JavaScript.',
        github: 'https://github.com/text-mask/text-mask'
    },
    {
        nome: 'React-toastify',
        desc: 'React notification made easy.',
        github: 'https://github.com/fkhadra/react-toastify'
    },
    {
        nome: 'Redux',
        desc: 'Predictable state container for JavaScript apps.',
        github: 'https://github.com/reduxjs/redux'
    },
    {
        nome: 'Redux-saga',
        desc: 'An alternative side effect model for Redux apps.',
        github: 'https://github.com/redux-saga/redux-saga'
    },
    {
        nome: 'Reduxsauce',
        desc: 'Some aesthetic toppings for your Redux meal.',
        github: 'https://github.com/infinitered/reduxsauce'
    },
    {
        nome: 'Simplebar-react',
        desc:
            'Custom scrollbars vanilla javascript library with native scroll, done simple, lightweight, easy to use and cross-browser.',
        github: 'https://github.com/Grsmto/simplebar'
    },
    {
        nome: 'Socket.io-client',
        desc: 'Realtime application framework (client).',
        github: 'https://github.com/socketio/socket.io-client'
    },
    {
        nome: 'Styled-components',
        desc:
            'Visual primitives for the component age. Use the best bits of ES6 and CSS to style your apps without stress.',
        github: 'https://github.com/styled-components/styled-components'
    }
];

const Flex = styled(Typo.Heading)`
    display: flex;
    align-items: center;
    a {
        margin-left: 0.5rem;
    }
`;

class Bibliotecas extends Component {
    componentWillMount() {
        this.props.requestWhite();
    }
    render() {
        return (
            <Fragment>
                <Typo.Title variant="black">Bibliotecas</Typo.Title>
                <Typo.SubTitle variant="primary">Todas bibliotecas utilizadas.</Typo.SubTitle>
                <Grid.Row>
                    <Grid.Col size={[{ break: 0, value: 12 }]}>
                        <Form.Paper>
                            <Typo.SubTitle variant="white">Frontend</Typo.SubTitle>
                            {front.map((l, i) => (
                                <Fragment key={i}>
                                    <Flex variant="white">
                                        {l.nome} -
                                        <Typo.Link tag="a" href={l.github}>
                                            Github
                                        </Typo.Link>
                                    </Flex>
                                    <Typo.SubHeading>{l.desc}</Typo.SubHeading>
                                </Fragment>
                            ))}
                            <Typo.SubTitle variant="white">Backend</Typo.SubTitle>
                            {back.map((l, i) => (
                                <Fragment key={i}>
                                    <Flex variant="white">
                                        {l.nome} -
                                        <Typo.Link tag="a" href={l.github}>
                                            Github
                                        </Typo.Link>
                                    </Flex>
                                    <Typo.SubHeading>{l.desc}</Typo.SubHeading>
                                </Fragment>
                            ))}
                        </Form.Paper>
                    </Grid.Col>
                </Grid.Row>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(colorActions, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(Bibliotecas);
