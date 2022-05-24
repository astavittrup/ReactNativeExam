import { LOGOUT, RESTORE_USER, LOGIN } from "../actions/UserActions";
import { SIGNUP } from "../actions/SignupAction";
import { useSelector } from 'react-redux';
import * as SecureStore from "expo-secure-store";

//set initial states as undefined
export interface UserState {
  idToken: string | undefined;
  email: string | undefined;
  username: string | undefined;
}


const initialState: UserState = {
  idToken: undefined,
  email: undefined,
  username: undefined
};

export interface Action {
  type: string;
  payload: any;
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP:
            return {
 //copy state to prevent mutation
              ...state, 
              idToken: action.payload.idToken, email: action.payload.email
               
              };
             
                
        case RESTORE_USER:
            return { ...state, idToken: action.payload.idToken, email: action.payload.email };


            case LOGIN:
                return { ...state, idToken: action.payload.idToken, email: action.payload.email }


         case LOGOUT:
                return { ...state, idToken: undefined, email: undefined }
        
        default:
            return state; //does not do anything    
    }
};

export default userReducer;