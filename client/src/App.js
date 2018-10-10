import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import rootReducer from './reducers';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Root from './components/Root';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state ={
      theme: 'light'
    };
  }

  changeTheme = (theme) => {
    this.setState({theme: theme})
  }

  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={createMuiTheme({
          palette: {
            type: this.state.theme,
          },
        })}>
          <Root changeTheme={this.changeTheme} />
        </MuiThemeProvider>
      </Provider>
    );
  }
}
