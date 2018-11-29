import React from 'react';
import { Provider } from 'react-redux';

import rootStore from './store';

import Container from './src/screens';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={rootStore}>
        <Container />
      </Provider>
    );
  };
};