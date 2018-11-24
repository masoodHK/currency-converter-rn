import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { rootStore, persistor } from './store';

import Container from './src/screens';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={rootStore}>
        <PersistGate loading={null} persistor={persistor}>
          <Container />
        </PersistGate>
      </Provider>
    );
  };
};