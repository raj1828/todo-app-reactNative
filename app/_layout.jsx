import { Provider } from "react-redux";
import store from '../store';
import Login from '../components/LoginPage';
import Register from '../components/RegisterPage';
import Index from "./index";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
    return (
        <Provider store={store}>
            <NavigationContainer independent={true}>
                <Stack.Navigator initialRouteName="Register">
                    <Stack.Screen name="Tasks" options={{ headerShown: false }} component={Index} />
                    <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
                    <Stack.Screen name="Register" options={{ headerShown: false }} component={Register} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
