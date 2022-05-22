import React, { Component, Fragment } from 'react';
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';


export class Webview extends Component {
    render() {
        return (
          <SafeAreaView style={{ flex: 1 }}>
            <WebView 
              source={{ uri: 'https://thestudentmarketplace.netlify.app/' }} 
            />
          </SafeAreaView>
        );
      }
  };
  
  export default Webview;