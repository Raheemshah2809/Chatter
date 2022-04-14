
import React, { Component } from 'react'
import { Text, View,  TouchableOpacity} from 'react-native'

class ForgotPassword extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Page Coming Soon</Text>
        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Login') }}>
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>Click Here To Go Back</Text>
                </TouchableOpacity>
      </View>

      
    )
  }
}


export default ForgotPassword