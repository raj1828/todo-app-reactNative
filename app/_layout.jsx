import { Stack } from "expo-router";
import { Provider } from "react-redux"
import store from '../store';

export default function RootLayout() {
       return (
              <Provider store={store}>
                     <Stack>
                            <Stack.Screen options={{ headerShown: false }} name="index" />
                     </Stack>
              </Provider>

       );
}
