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
      
    const loggedInUser = useSelector(state => state.users.loggedInUser);
    console.log('Logged in User', loggedInUser); 

    useEffect(() => {
       const fetchTask = async () => {
           if (loggedInUser) {
               try {
                   const userTasks = await AsyncStorage.getItem(`tasks_${loggedInUser.email}`);
                   const tasks = userTasks ? JSON.parse(userTasks) : [];
                   dispatch(setTask(tasks));
               } catch (error) {
                   console.log("Error fetching tasks: ", error);
               }
           }
       };
       fetchTask();
   }, [loggedInUser, dispatch]);

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
              Alert.alert(
                "Logout",
                "Are you sure you want to logout?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      
                      logoutApp();
                    },
                    style: "default"
                  }
                ],
                { cancelable: false }
              );
            };
            
            const logoutApp = () => {
              
              dispatch(logout()); 
              dispatch(setTask([])); 
              Alert.alert('Thank You for Using'); 
              setTimeout(() => {
                navigation.navigate('Login');
              }, 1000);
            };
            

       const handleSaveButton = async () => {

              const trimTitle = title.trim();
              const trimDescription = description.trim();

              if(!trimTitle && !trimDescription){
                Alert.alert('Please fill all the details');
                return;
              }

              // try {
              //   if (isEditMode) {
              //     dispatch(editTask({ id: taskToEdit.id, title, description }));
              //   } else {
              //           const newTask = {
              //                 id: Math.random().toString(),
              //                 title: title,
              //                 description: description,
              //           };
              //           dispatch(addTask(newTask));
              //   }
                if (!loggedInUser) {
                     Alert.alert('You need to be logged in to save tasks.');
                     return;
                 }

                 try {
                     let userTasks = await AsyncStorage.getItem(`tasks_${loggedInUser.email}`);
                     userTasks = userTasks ? JSON.parse(userTasks) : [];
             
                     const newTask = {
                         id: Math.random().toString(),
                         title: trimTitle,
                         description: trimDescription,
                     };
             
                     if (isEditMode) {
                         // Update the task
                         userTasks = userTasks.map(task => 
                             task.id === taskToEdit.id ? { ...task, title: trimTitle, description: trimDescription } : task
                         );
                     } else {
                         // Add new task
                         userTasks.push(newTask);
                     }
             
                     // Save updated tasks back to AsyncStorage
                     await AsyncStorage.setItem(`tasks_${loggedInUser.email}`, JSON.stringify(userTasks));
             
                     
                     dispatch(setTask(userTasks));
             
                    
                     setModalVisible(false);
                     Toast.show(isEditMode ? 'Task Updated Successfully' : 'Task Added Successfully', {
                         duration: Toast.durations.LONG,
                     });
                     setTitle('');
                     setDiscription('');
                 } catch (error) {
                     console.log("Error in saving: ", error);
                     Alert.alert('Error in Saving from our Side, Please try again later!!');
                 }
              // } catch (error) {
              //     console.log("Error in saving : ",error);
              //     Alert.alert('Error in Saving from our Side, Please try again later!!')
              // }

              
       };

       return (
              <View style={styles.centerdView}>
                     <Modal
                            transparent={true} 
                            animationType="slide" 
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
                                   justifyContent: "space-around",
                                   margin: 10,
                                   flexDirection: "row",
                                   alignItems: "center",
                            }}
                     >
                            <View>
                                   <Text
                                          style={{
                                                 fontSize: 40,
                                                 fontWeight: 'bold',
                                                 marginRight: 10,
                                          }}
                                   >ToDo App</Text>
                            </View>
                            <View>
                            <Button
                                   title="Add Task"
                                   style={{ height: 40 }}
                                   onPress={handelAddTask}
                            />
                            </View>
                            

                            <View style={{marginLeft:40}}>
                            <Button
                                   title="Log Out"
                                   style={{ height: 40 }}
                                   onPress={handelLogout}
                            />
                            </View>
                            
                            
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
              elevation: 5,
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
