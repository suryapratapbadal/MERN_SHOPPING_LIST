import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import rootReducer from './reducers';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducer,  compose(applyMiddleware(thunk)));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <ShoppingList />
        </div>
      </Provider>
    );
  }
}

export default App;
