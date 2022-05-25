import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Screen1 from "./../screens/Screen1";
import HomeScreen from "./../screens/HomeScreen";
import DiscoverScreen from "./../screens/DiscoverScreen";
import SignupScreen from "./../screens/SignupScreen";
import LoginScreen from "./../screens/LoginScreen";
import ProfileScreen from "./../screens/ProfileScreen";
import EditProfileScreen from "./../screens/EditProfileScreen";


import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const NavigationComponent = ({ navigation }) => {

 const token = useSelector(state => state.user.idToken)

 return (
        <NavigationContainer >
          
            {token !== undefined ? (
                // Show the app with all navigation

                <Tab.Navigator>
            
                        <Tab.Screen name="Chat" component={Screen1}/>
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Discover" component={DiscoverScreen} />
                   <Tab.Screen name="Menu" component={MenuStack} />
                    
{/*                   
                         <Tab.Screen name="Profile" component={ProfileScreen}></Tab.Screen>
                         <Tab.Screen name="EditProfile" component={EditProfileScreen}></Tab.Screen> */}
                </Tab.Navigator>
            ) : (

           
           // show a stack navigator with only signup and login screens.
           <Stack.Navigator>
           <Stack.Screen name="Signup" component={SignupScreen} />
           <Stack.Screen name="Login" component={LoginScreen} />
       </Stack.Navigator>

            
        )}
        </NavigationContainer >
    );
}


function MenuStack() {


        return (
            <Stack.Navigator>
                <Stack.Screen name="Profile" component={ProfileScreen}></Stack.Screen>
                <Stack.Screen name="EditProfile" component={EditProfileScreen}></Stack.Screen>
            </Stack.Navigator>
    )
}





export default NavigationComponent;