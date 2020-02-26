import React from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as userActions from './actions/user';
import Header from './components/Header';
import ModalView from './views/ModalView';
import routes from './router'
import './App.css';
import Loader from './components/Loader';

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './store/index';

const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <>
        <Provider store={store}>
            <ConnectedRouter history={history}>
              
              <Loader>
                <ModalView />
                <Header />
                {routes}
              </Loader>

            </ConnectedRouter>
        </Provider>
      </>
    );
  }
};

// const mapDispatchToProps = dispatch => ({
//   userActions: bindActionCreators(userActions, dispatch),
// });

export default App;
