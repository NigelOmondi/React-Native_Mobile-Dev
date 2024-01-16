import 'react-native-screens';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoItemDetailsScreen from './TodoItemDetailsScreen';
import SecondScreen from './SecondScreen';

import { StyleSheet, 
         View, 
         Text, 
         Button } from 'react-native';


const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text style={{ marginVertical: 40, fontSize: 24 }}>
                Hello, Welcome to PenSoft!
            </Text>
            <Button title="Proceed"
            onPress={() => navigation.navigate('Tasks Board')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'black',
    },
});

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Tasks Board" component={SecondScreen} />
                <Stack.Screen name="TodoItemDetails" component={TodoItemDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
