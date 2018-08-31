import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import rootReducer from './reducers';


import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Root from './components/Root';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <Root/>
      </Provider>
    );
  }
}
