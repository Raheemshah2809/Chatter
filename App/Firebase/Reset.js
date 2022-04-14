import Firebase from './firebaseConfig';
import { AsyncStorage } from 'react-native';

export const ForgotPassword = async (email) => {
    email => {
        return firebase.auth().sendPasswordResetEmail(email)
      }
}