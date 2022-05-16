import { View, Text, TextInput, Button } from 'react-native';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser, login } from './../store/actions/UserActions'
import * as SecureStore from 'expo-secure-store';


function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    async function load() {
        let emailFromSecureStore = await SecureStore.getItemAsync('email');
        let tokenFromSecureStore = await SecureStore.getItemAsync('token');
        if (emailFromSecureStore && tokenFromSecureStore) {
            console.log("success", emailFromSecureStore);
            dispatch(restoreUser(emailFromSecureStore, tokenFromSecureStore));
        } else {
            console.log("failure");
        }
    };

    return (
        <View>
            <Text>Please enter your credentials to login</Text>
            <TextInput placeholder='email'
                onChangeText={setEmail}
                value={email} />
            <TextInput placeholder='Password'
                onChangeText={setPassword}
                value={password} />
            <Button title="Login" onPress={() => dispatch(login(email, password))} />
        </View>
    );
}

export default LoginScreen;