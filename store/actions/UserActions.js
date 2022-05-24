import { API_KEY } from '@env';
import * as SecureStore from 'expo-secure-store';
import { Text } from 'react-native';
import User from "../../entities/user";

// cases for the reducer

export const LOGIN = 'LOGIN';
export const RESTORE_USER = 'RESTORE_USER';
export const LOGOUT = 'LOGOUT';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';


// variables firebase

const dbEndpoint = "https://reactnative-ce12d-default-rtdb.europe-west1.firebasedatabase.app/";
const authEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:`;


/// action create

export const login = (email, password) => {
    // console.log(API_KEY.trim().length);
    // console.log((''+API_KEY).length );
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


export const restoreUser = (token, idToken) => {

  //use redux thunk to make asyncrounous calls
  return async dispatch => {
    //Use the passed token for auth on the URL
    const response = await fetch(`${dbEndpoint}users/${token}.json?auth=${idToken}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const users = await response.json();
    //restore the user from db
      const token = new User(
      users.id,
      users.firstname,
      users.lastname,
      users.email,
    );
    if (!response.ok) {
      console.error("ERROR in response test ", users);
    } else {
      console.log("response good (postUserToDb)");
    
      dispatch({ type: LOGIN, payload: { email: data.email, idToken: data.idToken } })
    }
  };
};



export const logout = () => {
  SecureStore.deleteItemAsync('email');
  SecureStore.deleteItemAsync('token');

  return { type: LOGOUT }
}