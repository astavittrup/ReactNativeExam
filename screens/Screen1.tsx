import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App';
import {  addChatroom, deleteChatroom, fetchChatrooms } from '../store/actions/ChatActions';

const Screen1 = ({ navigation }: { navigation: any }) => {
    const [text, onChangeText] = useState('');
    // const [text, onChangeText] = useState('');

    // const isHappy = useSelector((state: RootState) => state.chat.isHappy); // subscribing to the store's chat slice/part
    // const numberOfIcecreams = useSelector((state: RootState) => state.chat.counter)
    const dispatch = useDispatch();
    const chatrooms = useSelector((state: RootState) => state.chat.chatrooms);

    useEffect(() => {
        dispatch(fetchChatrooms())
    }, []);

    // console.log("chatrooms", chatrooms);

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity>
            <Text>{item.title}</Text>
            <Button title="Delete this chatroom" onPress={() => dispatch(deleteChatroom(item.id))} />
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>
            <Text style={styles.test}>Chat</Text>
         




            <TextInput placeholder="Chatroom name"
                style={styles.input}
                onChangeText={onChangeText}
                value={text} />

            <Button 
            title='Add chatroom' onPress={() => dispatch(addChatroom(text))} />

            <FlatList data={chatrooms} renderItem={renderItem} />
        </View>
    );
}


const styles = StyleSheet.create({

test: {
color: 'blue',
fontSize: 30,
marginBottom: 10,
},

container: {    
      flex: 1,
    justifyContent: 'center',
    alignItems: 'center',


},


    input: {
        marginBottom: 10,
        padding: 15,
        maxWidth: 250,
      backgroundColor: '#FFB6C1',
    },

  
  });

export default Screen1;