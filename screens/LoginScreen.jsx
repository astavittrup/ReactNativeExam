import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser, login } from './../store/actions/UserActions'
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';



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
        <SafeAreaView style={styles.container}>
        <View>

            <Text style={styles.test}>Please enter your credentials to login
     
            </Text>
            
            <TextInput 
             style={styles.textInput}
            placeholder='email'
                onChangeText={setEmail}
                value={email} />
            <TextInput placeholder='Password'
             style={styles.textInput}
                onChangeText={setPassword}
                value={password} />

            <Button title="Login" 
            style={styles.textInput}
            color="#f194ff"
            onPress={() => dispatch(login(email, password))} />
        </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    test: {
        padding: 20,
    },

    textInput: {
        padding: 15,
        maxWidth: 250,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1
    },

});

export default LoginScreen;