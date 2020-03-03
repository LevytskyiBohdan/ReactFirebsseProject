import React from 'react';
import { connect } from 'react-redux';
import { reduxLoaderActions } from 'redux-state-loader';
import '../css/Loader.css';

const registerAction = reduxLoaderActions.registerLoader({
    id: 'loader',
    startActions: [
        'USER_LOGIN',
        'USER_LOGOUT',
        'CREATE_USER',
        'EDIT_USER',
        'DELETE_USER',
        'GET_USER_POSTS',
        'GET_USER',
        'GET_USERS',
        'GET_POSTS',
        'CREATE_POST',
        'GET_POST',
        'EDIT_POST',
        'DELETE_POST',
        'FILE_UPLOAD',
        'GET_UPLOADED_FILES'

    ],
    stopActions: [
        'USER_LOGIN_SUCCESS',
        'USER_LOGIN_FAILURE',
        'USER_LOGOUT_SUCCESS',
        'USER_LOGOUT_FAILURE',
        'CREATE_USER_SUCCESS',
        'CREATE_USER_FAILURE',
        'EDIT_USER_SUCCESS',
        'EDIT_USER_FAILURE',
        'DELETE_USER_SUCCESS',
        'DELETE_USER_FAILURE',
        'GET_USER_POSTS_SUCCESS',
        'GET_USER_POSTS_FAILURE',
        'GET_USER_SUCCESS',
        'GET_USER_FAILURE',
        'GET_USERS_SUCCESS',
        'GET_USERS_FAILURE',
        'GET_POSTS_SUCCESS',
        'GET_POSTS_FAILURE',
        'CREATE_POST_SUCCESS',
        'CREATE_POST_FAILURE',
        'GET_POST_SUCCESS',
        'GET_POST_FAILURE',
        'EDIT_POST_SUCCESS',
        'EDIT_POST_FAILURE',
        'DELETE_POST_SUCCESS',
        'DELETE_POST_FAILURE',
        'FILE_UPLOAD_SUCCESS',
        'FILE_UPLOAD_FAILURE',
        'GET_UPLOADED_FILES_SUCCESS',
        'GET_UPLOADED_FILES_FAILURE',
    ],
});

const Loader = ({children, loaderAction, loader}) => {
    React.useEffect(() => {
        loaderAction()
    }, [])

    return (
        <div className="preloader">
            <div className={`${loader ? 'blur' : ''}`}>
                {children}
            </div>

            {loader && (
                <div className="spiner d-flex flex-row align-items-center">
                    <div className="spinner-border text-secondary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <span className="text-muted d-inline-block ml-3">Loading...</span>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    loader: state.reduxLoader.loaders.loader,
});

const mapDispatchToProps = dispatch => ({
    loaderAction: () => dispatch(registerAction),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);