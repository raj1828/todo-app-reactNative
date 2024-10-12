import { Provider } from "react-redux";
import store from "../store";
import Login from "../components/LoginPage";
import Register from "../components/RegisterPage";
import Index from "./index";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import NewsDetails from "../components/NewsDetails";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
       return (
              <Provider store={store}>
                     <GestureHandlerRootView style={{ flex: 1 }}>
                            <NavigationContainer independent={true}>
                                   <Stack.Navigator initialRouteName="Register">
                                          <Stack.Screen
                                                 name="Tasks"
                                                 options={({ navigation }) => ({
                                                        title: "TaskLingua",
                                                        headerRight: () => (
                                                               <TouchableOpacity
                                                                      onPress={() => {
                                                                             Alert.alert("Logout", "Are you sure you want to logout?", [
                                                                                    {
                                                                                           text: "Yes",
                                                                                           onPress: () => navigation.navigate("Login"),
                                                                                    },
                                                                                    {
                                                                                           text: "No",
                                                                                           onPress: () => console.log("Cancel Pressed"),
                                                                                    },
                                                                             ]);
                                                                      }}
                                                               >
                                                                      <Icon name="log-out-outline" size={25} color="#fff" />
                                                               </TouchableOpacity>
                                                        ),
                                                        headerStyle: {
                                                               backgroundColor: "#f4511e",
                                                        },
                                                        headerBackVisible: false,
                                                 })}
                                                 component={Index}
                                          />
                                          <Stack.Screen
                                                 name="Login"
                                                 options={{ headerShown: false }}
                                                 component={Login}
                                          />
                                          <Stack.Screen
                                                 name="Register"
                                                 options={{ headerShown: false }}
                                                 component={Register}
                                          />
                                          <Stack.Screen
                                                 name="NewsDetails"
                                                 component={NewsDetails}

                                                 options={({ navigation }) => ({
                                                        title: "NewsDetails",
                                                        headerLeft: () => (
                                                               <TouchableOpacity
                                                                      onPress={() => navigation.navigate('Tasks')}
                                                               >
                                                                      <Icon name="chevron-back-outline" size={25} color="#fff" />
                                                               </TouchableOpacity>
                                                        ),
                                                        headerStyle: {
                                                               backgroundColor: "#f4511e",
                                                        },
                                                        headerBackVisible: false,
                                                 })}
                                          />
                                   </Stack.Navigator>
                            </NavigationContainer>
                     </GestureHandlerRootView>
              </Provider>
       );
}
