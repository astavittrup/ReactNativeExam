import { API_KEY } from '@env';
import * as SecureStore from 'expo-secure-store';
import { Text } from 'react-native';

// cases for the reducer
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const RESTORE_USER = 'RESTORE_USER';
export const LOGOUT = "LOGOUT";
export const UPDATE_USER = "UPDATE_USER";





// variables firebase

const dbEndpoint = "https://reactnative-ce12d-default-rtdb.europe-west1.firebasedatabase.app/";
const authEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:`;



//refresh token and restore session 

// export const restoreUser = (email, token) => {
//     return { type: RESTORE_USER, payload: { email, idToken: token } };
// };


export const restoreUser = (signedInUser, idToken) => {
    console.log("restoreUser() || UserAction.js");
    //use redux thunk to make asyncrounous calls
    return async dispatch => {
      //Use the passed token for auth on the URL
      const response = await fetch(`${dbEndpoint}users/${signedInUser}.json?auth=${idToken}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const users = await response.json();
      //restore the user from db
        const loggedInUser = new User(
        users.id,
        users.firstname,
        users.lastname,
        users.email,
      );
      if (!response.ok) {
        console.error("ERROR in response (PostUserToDb) ", users);
      } else {
        console.log("response good (postUserToDb)");
        //Make sure a dispacth is called, otherwise function won't work => send to reducer (use passed token as token)
        dispatch({ type: LOGIN, payload: { loggedInUser, token: idToken } });
      }
    };
  };
  



//Update user
export const editUser = (firstname, lastname, uuid, idToken, email, event) => {
    console.log("editUser() || UserAction.js");
    //use redux thunk to make asyncrounous calls
    return async (dispatch, getState) => {
      //get token to authenticate the request
      const token = getState().user.token;
      //Use patch to only update the parameters sent end body
      const response = await fetch(`${dbEndpoint}users/${uuid}.json?auth=${token}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
    
        }),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        console.error("ERROR in response (editNotifications) ", response);
      } else {
        console.log("response good (editNotifications)");
        const loggedInUser = new User(uuid, firstname, lastname, email, event);
        //Set up secureStore, only user
        // setSecureStore("edit", loggedInUser); //Turn secureStore on again
        //Make sure a dispacth is called, otherwise function won't work => send to reducer
        dispatch({
          type: UPDATE_USER,
          payload: { firstname: firstname, lastname: lastname,token: idToken },
        });
      }
    };
  };
  





export const logout = () => {
    SecureStore.deleteItemAsync('email');
    SecureStore.deleteItemAsync('token');

    return { type: LOGOUT }
}




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
    console.log(API_KEY.trim().length);
    console.log((''+API_KEY).length );
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
        
        } else {
            // await SecureStore.setItemAsync('email', data.email); // comment out to work in browser
            // await SecureStore.setItemAsync('token', data.idToken);  // comment out to work in browser
            dispatch({ type: LOGIN, payload: { email: data.email, idToken: data.idToken } })
        }
    }}

    