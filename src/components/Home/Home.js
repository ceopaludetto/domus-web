import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as colorActions } from '../../redux/ducks/color';

class Home extends Component {
    componentWillMount() {
        this.props.requestWhite();
    }
    render() {
        return <h2>teste</h2>;
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(colorActions, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(Home);
