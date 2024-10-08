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
} from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { addTask, editTask, setTask } from "../features/tasksSlice";
import TaskItems from "./../components/TaskItems";
import { loadFromLocalStorage } from "../features/storage";
import Translation from "../components/Translation";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import SwitchApp from "../components/SwitchApp";
import Task from "../components/Task";
import store from "../store";

export default function Index() {
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
    //       paddingTop: 50,
  },
});
