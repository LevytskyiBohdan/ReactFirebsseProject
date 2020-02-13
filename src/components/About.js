import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';

class About extends React.Component {
    render() {
        return (<>
            <p>About</p>
        </>)
    }
}

const mapStateToProps = state => ({
    state,
});

const mapDispatchToProps = dispatch => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(About));