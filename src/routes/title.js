import React from 'react';
import { Route } from 'react-router-dom';

const Title = props => {
    document.title = props.title;
    return <Route path={props.path} component={props.component} {...props} />;
};

export default Title;
