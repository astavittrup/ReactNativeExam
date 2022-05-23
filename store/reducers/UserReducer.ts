import { LOGOUT, RESTORE_USER, SIGNUP, LOGIN, UPDATE_USER } from "../actions/UserActions";
import { useSelector } from 'react-redux';
import * as SecureStore from "expo-secure-store";


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

export interface Action {
    type: string;
    payload: any;
}


const userReducer = (state: UserState = initialState, action: Action) => {
    switch (action.type) {
        case SIGNUP:
            return { ...state, idToken: action.payload.idToken, email: action.payload.email }
        case RESTORE_USER:
            return { ...state, idToken: action.payload.idToken, email: action.payload.email }
            case LOGIN:
                return { ...state, idToken: action.payload.idToken, email: action.payload.email }

         case LOGOUT:
                return { ...state, idToken: undefined, email: undefined }

                case UPDATE_USER:
                    return {
                      ...state,
                      loggedInUser: {
                        // ...state.loggedInUser,
                        firstname: action.payload.firstname,
                        lastname: action.payload.lastname,
                        studyProgramme: action.payload.studyProgramme,
                      },
                      token: action.payload.token,
                    };
               
        
        
        default:
            return state; //does not do anything yet​   
    }
};

export default userReducer;