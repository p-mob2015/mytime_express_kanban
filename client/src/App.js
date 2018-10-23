import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import 'App.css';
import HomePage from 'pages/HomePage';
import BoardPage from 'pages/BoardPage';
import appReducer from 'store/reducers';
import trelloSaga from 'store/sagas';

const trelloMiddleware = createSagaMiddleware();
const store = createStore(appReducer, applyMiddleware(trelloMiddleware));
trelloMiddleware.run(trelloSaga);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/board/:id" component={BoardPage} />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
