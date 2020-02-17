import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import '../css/about.css';

class About extends React.Component {
    render() {
        return (<>
            <div className="container-fluid about">
                <div className="row">
                    <div className="col-12 top"></div>
                </div>
                <div className="row">
                    
                </div>
            </div>
        </>)
    }
}

const mapStateToProps = state => ({
    state,
});

const mapDispatchToProps = dispatch => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(About));