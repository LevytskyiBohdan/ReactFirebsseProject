import React from 'react';
import {
  BrowserRouter,
} from "react-router-dom";
import Header from './components/Header';
import ModalView from './views/ModalView';
import routes from './router'
import './App.css';
import Loader from './components/Loader';

import { Provider } from 'react-redux'
import configureStore, { history } from './store/index';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter history={history}>
        <Loader>
          <ModalView />
          <Header />
          {routes}
        </Loader>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
