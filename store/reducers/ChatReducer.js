import { Chatroom } from "../../entities/Chatroom";
import { SUBTRACT, TOGGLE_HAPPY, ADD, ADD_CHATROOM, DELETE_CHATROOM, FETCH_CHATROOMS } from "../actions/ChatActions";

const initialState = {
    chatrooms: [],

};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CHATROOMS:
            return { ...state, chatrooms: action.payload }

        case ADD_CHATROOM:
            console.log(action.payload); // Should print out the chatroomName
            //state.chatrooms.push(chatroom); // mutate chatrroms array! Not Allowed!

            const chatroom = new Chatroom(action.payload.chatroomName, [], '', action.payload.id);
            
            const newChatroomArray = [...state.chatrooms, chatroom];
            return { ...state, chatrooms: newChatroomArray };

        case DELETE_CHATROOM:
            console.log(action.payload);
            return {
                ...state, chatrooms:
                    state.chatrooms.filter(chatroom => chatroom.id !== action.payload)
            }



        default:
            return state; //does not do anything yet​   
    }
};

export default chatReducer;