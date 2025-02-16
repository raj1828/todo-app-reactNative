import { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  Alert,
  StyleSheet,
  Modal,
  SafeAreaView,
  TextInput,
  BackHandler, 
} from "react-native";
import { Provider } from "react-redux";
import store from "../store";
import SwitchApp from "../components/SwitchApp";
import { useNavigation } from "expo-router";

export default function Index() {
  const navigation = useNavigation(); 

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Logout or Exit", "Do you want to logout? or exit app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            //  AsyncStorage.clear(); 
            navigation.navigate('Login');
          },
        },
        {
          text: "Exit",
          onPress: () => {
            //  AsyncStorage.clear(); 
            BackHandler.exitApp();
          },
        },
      ]);
      return true; // Prevent default back action
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Cleanup on unmount
  }, [navigation]);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainView}>
          <SwitchApp />
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
});
