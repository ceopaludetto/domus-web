import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Authorized from './authorized';
import UnAuthorized from './unauthorized';

import Main from '../pages/Main';
import Dash from '../pages/Dash';
import Auth from '../pages/Auth';

const MainRoute = () => (
    <Switch>
        <Route path="/home" component={Main} />
        <Authorized path="/app" component={Dash} />
        <UnAuthorized path="/auth" component={Auth} />
        <Redirect from="*" to="/home" />
    </Switch>
);

export default MainRoute;
