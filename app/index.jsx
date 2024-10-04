import { useState, useEffect } from "react";
import { Text, View, Button, Alert, StyleSheet, Modal, SafeAreaView, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask, setTask } from "../features/tasksSlice";
import { logout } from "../features/authSlice";
import TaskItems from './../components/TaskItems';
import {loadFromLocalStorage} from '../features/storage';
import Translation from '../components/Translation';
import Toast from 'react-native-root-toast';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';



export default function Index() {
       const [modalVisible, setModalVisible] = useState(false);
       const [isEditMode, setEditMode] = useState(false);
       const [taskToEdit, setTaskToEdit] = useState(null);
       const [title, setTitle] = useState('');
       const [description, setDiscription] = useState('');
       const navigation = useNavigation();
       const dispatch = useDispatch();
       // Access the loggedInUser correctly
    const loggedInUser = useSelector(state => state.users.loggedInUser);
    console.log('Logged in User', loggedInUser); 

       useEffect(() => {
              const fetchTask = async (task) => {
                     if(loggedInUser){
                            const userTasks = await AsyncStorage.getItem(`tasks_${loggedInUser.email}`);
                            const tasks = userTasks ? JSON.parse(userTasks) : [];
                            dispatch(setTask(tasks));
                     }
              };
              fetchTask();
       }, [ loggedInUser, dispatch]);

       const handelAddTask = () => {
              setModalVisible(true);
              setEditMode(false);
              setTitle('');
              setDiscription('');
       };

       const handleEditTask = (task) => {
              setModalVisible(true);
              setEditMode(true);
              setTaskToEdit(task);
              setTitle(task.title);
              setDiscription(task.description);
       }
       const handelLogout = () => {
              dispatch(logout());
              navigation.navigate('Login');
       };

       const handleSaveButton = async () => {

              const trimTitle = title.trim();
              const trimDescription = description.trim();

              if(!trimTitle && !trimDescription){
                Alert.alert('Please fill all the details');
                return;
              }

              try {
                if (isEditMode) {
                  dispatch(editTask({ id: taskToEdit.id, title, description }));
                } else {
                        const newTask = {
                              id: Math.random().toString(),
                              title: title,
                              description: description,
                        };
                        dispatch(addTask(newTask));
                }
                if (!loggedInUser) {
                     Alert.alert('You need to be logged in to save tasks.');
                     return;
                 }

                const userTask = await AsyncStorage.getItem(JSON.stringify(`tasks_${loggedInUser.email}`));
                const tasks = userTask ? JSON.parse(userTask) : [];

                if(isEditMode){
                     try {
                            const updatedTasks = tasks.map(task => {
                                   if(task.id === taskToEdit.id){
                                          return {...task, title, description};
                                   }
                                   return task;
                            })
                            await AsyncStorage.setItem(`tasks_${loggedInUser.email}`, updatedTasks);
                     } catch (error) {
                            console.log(error);
                     }
                }else{
                     try {
                            tasks.push(newTask);
                            await AsyncStorage.setItem(`tasks_${loggedInUser.email}`, JSON.stringify(tasks));
                     } catch (error) {
                            console.log(error);
                     }
                }

                  setModalVisible(false);
                  Toast.show('Task Added Successfully', {
                     duration: Toast.durations.LONG,
                   });
                  setTitle('');
                  setDiscription('');
              } catch (error) {
                  console.log("Error in saving : ",error);
                  Alert.alert('Error in Saving from our Side, Please try again later!!')
              }

              
       };

       return (
              <View style={styles.centerdView}>
                     <Modal
                            transparent={true} // Make the background transparent
                            animationType="slide" // Animation type
                            visible={modalVisible}
                     >
                            <SafeAreaView style={styles.safeArea}>
                                   <View style={styles.modalContainer}>
                                      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.modalTitle}>{isEditMode ? 'Edit Task' : 'Add Task'}</Text>
                                            <Button title="X" onPress={() => setModalVisible(false)} />
                                      </View>
                                          
                                          <Text style={styles.modalContent}>Title</Text>
                                          <TextInput
                                                 style={styles.modalInput}
                                                 placeholder="Enter Title"
                                                 value={title}
                                                 onChangeText={setTitle}
                                          />
                                          <Text style={styles.modalContent}>Description</Text>
                                          <TextInput
                                                 style={styles.modalInput}
                                                 placeholder="Enter Description"
                                                 value={description}
                                                 onChangeText={setDiscription}
                                          />

                                          <Button title={isEditMode ? "Update" : "Add Task"} onPress={handleSaveButton} />
                                   </View>
                            </SafeAreaView>
                     </Modal>
                     <View
                            style={{
                                   height: 60,
                                   justifyContent: "space-between",
                                   margin: 20,
                                   flexDirection: "row",
                                   alignItems: "center",
                            }}
                     >
                            <Text
                                   style={{
                                          fontSize: 40,
                                          fontWeight: 'bold',
                                          marginRight: 10,
                                   }}
                            >ToDo App</Text>

                            <Button
                                   title="Add Task"
                                   style={{ height: 40 }}
                                   onPress={handelAddTask}
                            />
                            <Button
                                   title="Log Out"
                                   style={{ height: 40 }}
                                   onPress={handelLogout}
                            />
                     </View>

                     <TaskItems onEditTask={handleEditTask} />
                     
                     <Translation/>     
                     
              </View>

       );
}

const styles = StyleSheet.create({
       safeArea: {
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
       },
       modalContainer: {
              width: '80%',
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 20,
              elevation: 5, // Android shadow effect
       },
       modalInput: {
              marginBottom: 10,
              borderWidth: 1,
              padding: 10,
       },
       modalTitle: {
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 10,
       },
       modalContent: {
              fontSize: 16,
              marginBottom: 8,
       },
       centerdView: {
              felx: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 22,
       },
       modalView: {
              margin: 20,
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 35,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                     width: 0,
                     height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
       },
       button: {
              borderRadius: 20,
              padding: 10,
              elevation: 2,
       },
       buttonOpen: {
              backgroundColor: '#F194FF',
       },
       buttonClose: {
              backgroundColor: '#2196F3',
       },
       textStyle: {
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
       },
       modalText: {
              marginBottom: 15,
              textAlign: 'center',
       },
})
