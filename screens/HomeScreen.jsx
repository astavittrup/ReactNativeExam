import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text>I am HomeScreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
export default HomeScreen;