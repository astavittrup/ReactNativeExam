import { API_KEY } from '@env';
import * as SecureStore from 'expo-secure-store';
import { Text } from 'react-native';
import User from "../../entities/user";

// cases for the reducer

export const LOGIN = 'LOGIN';
export const RESTORE_USER = 'RESTORE_USER';
export const LOGOUT = 'LOGOUT';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';


/// action create

export const login = (email, password) => {

    return async dispatch => {
        const response = await fetch (`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
            
        });
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          console.error("ERROR in test ", response);
        } else {
           dispatch({ type: LOGIN, payload: { email: data.email, idToken: data.idToken } })
        }
    }}

    export const restoreUser = (email, token) => {
      return { type: RESTORE_USER, payload: { email, idToken: token } };
  };


export const logout = () => {
  SecureStore.deleteItemAsync('email');
  SecureStore.deleteItemAsync('token');

  return { type: LOGOUT }
}