import React, { Component, Fragment } from 'react';
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../Components/FormInput';
import FormButton from '../Components/FormButton';
import ErrorMessage from '../Components/ErrorMessage';
import { withFirebaseHOC } from '../Config';
import firebase from 'firebase';
import Toast from 'react-native-root-toast';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email')
});

class ForgotPassword extends Component {

  showToast = () => {
    let toast = Toast.show('Password Reset Email Sent!', {
      duration: Toast.durations.LONG,
    });
    
    // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 5000);
  }
  passwordReset = async(email) => {
    this.showToast();
    return firebase.auth().sendPasswordResetEmail(email)
  }

  handlePasswordReset = async (values, actions) => {

    const { email } = values;
  
    try {
  
      await this.passwordReset(email);
  
      console.log('Password reset email sent successfully');
  
      this.props.navigation.navigate('Login');
  
    } catch (error) {
  
      actions.setFieldError('general', error.message);
  
    }
  
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Forgot Password?</Text>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values, actions) => {
            this.handlePasswordReset(values, actions)
          }}
          validationSchema={validationSchema}>
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting, 
        
          }) => (
            <Fragment>
              <FormInput
                name='email'
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder='Enter email'
                autoCapitalize='none'
                iconName='ios-mail'
                iconColor='#2C384A'
                onBlur={handleBlur('email')}
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType='outline'
                  onPress={handleSubmit}
                  title='Send Email'
                  buttonColor='#039BE5'
                />
              </View>
              <ErrorMessage errorValue={errors.general} />
            </Fragment>
          )}
        </Formik>
        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Login') }}>
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold', justifyContent: 'center', marginLeft: 120, }}>Click Here To Go Back {"\n"}</Text>
                </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 150
  },
  text: {
    color: '#000',
    fontSize: 24,
    marginLeft: 100,
    bottom: 100,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 25
  }
});

export default withFirebaseHOC(ForgotPassword);

// import React, { Component } from 'react';
// import { Text, View } from 'react-native';

// class ForgotPassword extends Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Forgot Password Screen</Text>
//       </View>
//     );
//   }
// }

// export default ForgotPassword;