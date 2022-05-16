import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser, signup } from './../store/actions/UserActions'
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    // const token = useSelector(state => state.user.idToken)
    // const emailTest = useSelector(state => state.user.email)
    // console.log(token);
    // console.log(emailTest);

    async function load() {
        let emailFromSecureStore = await SecureStore.getItemAsync('email');
        let tokenFromSecureStore = await SecureStore.getItemAsync('token');
        if (emailFromSecureStore && tokenFromSecureStore) {
            console.log("success", emailFromSecureStore);
            dispatch(restoreUser(emailFromSecureStore, tokenFromSecureStore));
        } else {
            console.log("failure");
        }
    }
    // read from secure store
    useEffect(() => {
        // load(); // comment out in order to work in browser 
    }, [])


    return (
      <SafeAreaView style={styles.container}>
        <View>
            <Text style={styles.test}>Signup</Text>
            <TextInput 
             style={styles.textInput}
            placeholder='Enter your email'
                onChangeText={setEmail}
                value={email} />

            <TextInput 
             style={styles.textInput}
            placeholder='Enter your password'
                onChangeText={setPassword}
                value={password} />
<View style={styles.test}>
            <Button title="Signup" onPress={() => dispatch(signup(email, password))} />
           
          
            <Button 
            style={styles.textInput}
            title="Login Instead"
            color="#f194ff"
         onPress={() => navigation.navigate("Login")} />
             </View> 
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


export default SignupScreen;