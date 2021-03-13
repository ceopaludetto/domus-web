import React from 'react';
import { Route as ReactRoute, Switch, Redirect } from 'react-router-dom';
import Message from './Message';

import Morador from './Morador';
import Find from './Find';

const Route = () => (
    <Switch>
        <ReactRoute path="/app/mensagens/:id" component={Morador} exact />
        <ReactRoute path="/app/mensagens" component={Find} exact />'
        <Redirect from="/app/mensagens/morador*" to="/app/mensagens" />
    </Switch>
);

const Messages = {
    Message,
    Route
};

export default Messages;
