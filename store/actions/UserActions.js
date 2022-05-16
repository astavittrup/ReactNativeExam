import * as SecureStore from 'expo-secure-store';
import LoginScreen from '../../screens/LoginScreen';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const RESTORE_USER = 'RESTORE_USER';
export const LOGOUT = "LOGOUT";


export const restoreUser = (email, token) => {
    return { type: RESTORE_USER, payload: { email, idToken: token } };
};

export const logout = () => {
    SecureStore.deleteItemAsync('email');
    SecureStore.deleteItemAsync('token');
    return { type: LOGOUT }
}

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDl9YBM32ozw7O0PP75nE52xpzWf_MZ4w4', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                //key value pairs of data you want to send to server
                // ...
                email: email,
                password: password,
                returnSecureToken: true
            })
        });


        

        // console.log(await response.json());

        const data = await response.json(); // json to javascript
        console.log(data);
        if (!response.ok) {
            //There was a problem..
        } else {
            // await SecureStore.setItemAsync('email', data.email);
            // await SecureStore.setItemAsync('token', data.idToken);
            dispatch({ type: SIGNUP, payload: { email: data.email, idToken: data.idToken } })
        }
    };
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDl9YBM32ozw7O0PP75nE52xpzWf_MZ4w4', {
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
            console.log("there was a problem with the login")
        } else {
            // await SecureStore.setItemAsync('email', data.email); // comment out to work in browser
            // await SecureStore.setItemAsync('token', data.idToken);  // comment out to work in browser
            dispatch({ type: LOGIN, payload: { email: data.email, idToken: data.idToken } })
        }
    }}

    