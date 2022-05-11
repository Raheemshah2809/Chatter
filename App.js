import React from 'react';
import RootNavigator from './App/router';
import { RootSiblingParent } from 'react-native-root-siblings';
class App extends React.Component {
  render() {
    return (
      <RootSiblingParent>
        <RootNavigator />
      </RootSiblingParent>
    )
  }
}

export default App;
