import { Chatroom } from "../../entities/Chatroom";
export const ADD_CHATROOM = 'ADD_CHATROOM';
export const DELETE_CHATROOM = 'DELETE_CHATROOM';
export const FETCH_CHATROOMS = 'FETCH_CHATROOMS';



export const fetchChatrooms = () => {
    return async (dispatch: any, getState: any) => {
        const idToken = getState().user.idToken

        const response = await fetch(
            'https://reactnative-ce12d-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth='
            + idToken, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }); 


        const data = await response.json(); // json to javascript
        // console.log(data);
        if (!response.ok) {
            //There was a problem..
        } else {

            let chatrooms = [];
            for (const key in data) {
                let chatroom = new Chatroom(data[key].chatroomName, [], '', key)
                chatrooms.push(chatroom)
            }

            dispatch({ type: FETCH_CHATROOMS, payload: chatrooms })
        }
    };
}

export const addChatroom = (chatroomName: string) => {
    return async (dispatch: any, getState: any) => {
        const idToken = getState().user.idToken  //accessing token in the state
console.log(idToken)
        const response = await fetch(
            'https://reactnative-ce12d-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth='
            + idToken, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                //key value pairs of data you want to send to server
                // ...
                chatroomName: chatroomName,
                messages: ''
            })
        });


        const data = await response.json(); // json to javascript
        console.log("This is the data:", data);
        if (!response.ok) {
            //There was a problem..
        } else {
            dispatch({ type: ADD_CHATROOM, payload: { chatroomName, id: data.name } })
        }
    };
};

export const deleteChatroom = (id: string) => {
    return async (dispatch: any, getState: any) => {
        let idToken: string = getState().user.idToken

        const response = await fetch(
            'https://reactnative-ce12d-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/' + id + '.json/?auth='
            + idToken, {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });


        const data = await response.json(); // json to javascript
        console.log(data);
        if (!response.ok) {
            //There was a problem..
        } else {
            dispatch({ type: DELETE_CHATROOM, payload: id })
        }
    };
}