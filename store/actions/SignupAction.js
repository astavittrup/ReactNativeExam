import { API_KEY } from '@env';
import * as SecureStore from 'expo-secure-store';
import { Text } from 'react-native';
import { getUser } from "../actions/UserActions";
import User from "../../entities/user";

export const SIGNUP = 'SIGNUP';



export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                //key value pairs of data you want to send to server
                // ...
                email: email,
                password: password,
                // get token to verify user
                returnSecureToken: true
            })
        });
     
        const data = await response.json(); // json to javascript
        console.log(data);
        if (!response.ok) {
    console.log(response.message);
        } else {
            // await SecureStore.setItemAsync('email', data.email);
            // await SecureStore.setItemAsync('token', data.idToken);
           
            dispatch({ type: SIGNUP, payload: { email: data.email, idToken: data.idToken } })
        }
    };
};



  