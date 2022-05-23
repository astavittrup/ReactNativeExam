import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Screen1 from "./../screens/Screen1";
// import Screen2 from "./../screens/Screen2";
// import Screen3 from "./../screens/Screen3";
import HomeScreen from "./../screens/HomeScreen";
import DiscoverScreen from "./../screens/DiscoverScreen";
import SignupScreen from "./../screens/SignupScreen";
import LoginScreen from "./../screens/LoginScreen";
import ProfileScreen from "./../screens/ProfileScreen";
import EditProfile from "../screens/EditProfileScreen";
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';



const NavigationComponent = ({ navigation }) => {

    const Stack = createNativeStackNavigator();

    const Tab = createBottomTabNavigator();

    const token = useSelector(state => state.user.idToken)

    console.log(token);

    return (
        <NavigationContainer >
            {token !== undefined ? (
                // Show the app with all navigation
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Discover" component={DiscoverScreen} />
                    {/* <Tab.Screen name="Chat" component={ChatStack} /> */}
                    {/* <Tab.Screen name="Menu" component={MenuStack} /> */}
                         <Stack.Screen name="Profile" component={ProfileScreen}></Stack.Screen>
            {/* <Stack.Screen name="EditProfile" component={EditProfile}></Stack.Screen> */}
                </Tab.Navigator>
            ) : (
                // show a stack navigator with only signup and login screens.
                <Tab.Navigator>
                    <Tab.Screen name="Signup" component={SignupScreen} />
                    <Tab.Screen name="Login" component={LoginScreen} />
                </Tab.Navigator>
            )}
        </NavigationContainer >
    );
}


function MenuStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen}></Stack.Screen>
            <Stack.Screen name="EditProfile" component={EditProfile}></Stack.Screen>
        </Stack.Navigator>
    )
}

// function ChatStack() {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen name="Screen1" component={Screen1} />
//             <Stack.Screen name="Screen2" component={Screen2} />
//             <Stack.Screen name="AndreScreen" component={Screen3} />
//         </Stack.Navigator>
//     );
// }



export default NavigationComponent;