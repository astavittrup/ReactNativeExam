import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/UserActions';
import { useSelector } from 'react-redux';
import Input from './../components/Input'
import { useState } from 'react';


const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    const username = useSelector(state => state.user.username);
    const [validUsername, setValidUsername] = useState(username !== '')

    const save = () => {
        // ** if the "form" is valid ** {
        // save data - we need access to text here...
        //} else {
        // display error message
        //}

    }


    return (
        <View>
            <Text>ProfileScreen</Text>
            <Input
                label="Username"
                inputValue={username}
                error="Username cannot be empty."
                valid={validUsername}
                setValid={setValidUsername}
            />
            <Input label="Hi" inputValue="" error="Cannot be empty" />

            <Button title="Save" onPress={save} />
            <Button title="Logout" onPress={() => dispatch(logout())} />
        </View>
    );
}

export default ProfileScreen;