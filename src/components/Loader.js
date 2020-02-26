import React from 'react';
import PropTypes from 'prop-types';
import { Lines } from 'react-preloaders';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../css/Loader.css';

const Loader = (props) => {
    const [showPreloader, setPreloader] = React.useState(true);

    React.useEffect(() => {
        setPreloader(true)
    }, [
        props.pathname
    ])

    setTimeout(() => {
        setPreloader(false)

    }, 2000)
    
    return (!showPreloader ? props.children :
        (<div className="preloader">
            <div className="center d-flex flex-row align-items-center">
                <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                    <span className="text-muted d-inline-block ml-3">Loading...</span>
            </div>
        </div>)
    )
}




Loader.propTypes = {
    confirmAction: PropTypes.any,
}

const mapStateToProps = state => ({
    user: state.user,
    users: state.users,
    posts: state.posts,
    post: state.post,
    fileUpload: state.fileUpload,
    pathname: state.router.location.pathname,
});

export default withRouter(connect(mapStateToProps)(Loader));;