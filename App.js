/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Homepage from './src/screens/Homepage';
import Navigation from './src/navigation/Navigation';

const App = () => {
  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" /> */}
        <Navigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});

export default App;
