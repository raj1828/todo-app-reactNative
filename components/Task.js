import { useState, useEffect } from "react";
import { Text, View, Button, Alert, StyleSheet, Modal, TouchableWithoutFeedback, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask, setTask } from "../features/tasksSlice";
import { logout } from "../features/authSlice";
import TaskItems from './../components/TaskItems';
import { loadFromLocalStorage } from '../features/storage';
import Toast from 'react-native-root-toast';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";
import { Dropdown } from "react-native-element-dropdown"
import DatePicker from 'react-native-date-picker'
import ProgressBar from 'react-native-progress/Bar';



const Task = () => {
       const [modalVisible, setModalVisible] = useState(false);
       const [isFilterModal, setIsFilterModal] = useState(false);
       const [isEditMode, setEditMode] = useState(false);
       const [taskToEdit, setTaskToEdit] = useState(null);
       const [selectedFilter, setSelectedFilter] = useState("all");
       const [title, setTitle] = useState('');
       const [description, setDiscription] = useState('all');
       const navigation = useNavigation();
       const dispatch = useDispatch();
       const [date, setDate] = useState(new Date())
       const tasks = useSelector(state => state.tasks.tasks);
       const [progress, setProgress] = useState(0)
       const [search, setSearch] = useState('');

       const handelProgressChange = (progressRes,) => {
              setProgress(progressRes);
       };

       const handelSearch = () => {
              // setSearch(search);
              Alert.alert("Search")
       };

       const filtersData = [
              { label: 'All Tasks', value: 'all' },
              { label: 'Completed Tasks', value: 'completed' },
              { label: 'Pending Tasks', value: 'pending' },
       ];

       const loggedInUser = useSelector(state => state.users.loggedInUser);
       console.log('Logged in User', loggedInUser);

       useEffect(() => {
              const fetchTask = async () => {
                     if (loggedInUser) {
                            try {
                                   const userTasks = await AsyncStorage.getItem(`tasks_${loggedInUser.email}`);
                                   const tasks = userTasks ? JSON.parse(userTasks) : [];
                                   // console.log(`Tasks: ${userTasks}`)

                                   dispatch(setTask(tasks));
                            } catch (error) {
                                   console.log("Error fetching tasks: ", error);
                            }
                     }
              };
              fetchTask();
       }, [loggedInUser, dispatch]);



       const handelFilter = () => {
              setIsFilterModal(false)
              console.log(selectedFilter)
       }

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

              if (!trimTitle) {
                     Alert.alert('Please add task title');
                     return;
              }

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
                            status: 'pending',
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

                     console.log(userTasks)
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
              <View>
                     <View style={styles.centerdView}>
                            <Modal
                                   transparent={true}
                                   animationType="slide"
                                   visible={modalVisible}
                            >
                                   <SafeAreaView style={styles.safeArea}>
                                          <View style={styles.modalContainer}>
                                                 <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                        <Text style={styles.modalTitle}>{isEditMode ? 'Edit Task' : 'Add Task'}</Text>
                                                        <Button color="#f4511e" title="X" style={{backgroundColor: "#f4511e", width:40, alignItems:"center", justifyContent:"center"}} onPress={() => setModalVisible(false)} />
                                                        {/* <TouchableOpacity title="X" style={{backgroundColor: "#f4511e",alignItems:"center", justifyContent: "center", width:40}} onPress={() => setModalVisible(false)} >
                                                               <Icon
                                                                        name="arrow-back-circle-outline"
                                                                        size={25}
                                                                        color="white"
                                                                        onPress={() => setModalVisible(false)}
                                                               />
                                                        </TouchableOpacity> */}
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

                                                 <Button color="#f4511e" title={isEditMode ? "Update" : "Add Task"} onPress={handleSaveButton} />
                                                 
                                          </View>
                                   </SafeAreaView>
                            </Modal>

                            {/* Filter Modal */}
                            <TouchableWithoutFeedback onPress={() => setIsFilterModal(false)}>
                                   <View>

                                          <Modal
                                                 transparent={true}
                                                 animationType="fade"
                                                 visible={isFilterModal}
                                          >
                                                 <SafeAreaView style={styles.modalArea}>
                                                        <View style={styles.filterModal}>

                                                               <Text style={styles.modalContent}>Filters:</Text>

                                                               <Dropdown
                                                                      data={filtersData}
                                                                      labelField="label"
                                                                      valueField="value"
                                                                      placeholder="Filters"
                                                                      value={selectedFilter}
                                                                      onChange={item => {
                                                                             setSelectedFilter(item.value);
                                                                      }}
                                                                      style={styles.dropdown}
                                                                      containerStyle={styles.dropdownContainer}
                                                               />


                                                               <Button title="Close" onPress={handelFilter} />
                                                        </View>
                                                 </SafeAreaView>
                                          </Modal>
                                   </View>

                            </TouchableWithoutFeedback>


                            <View
                                   style={styles.header}
                            >

                                   <TouchableOpacity
                                          title="Add Task"
                                          style={styles.addTask}
                                          onPress={handelAddTask}
                                   >

                                          <Icon name="add-circle-outline" size={28} color="#f4511e" />


                                   </TouchableOpacity>



                                   <TouchableOpacity onPress={() => setIsFilterModal(true)}>
                                          <Icon name="filter-outline" size={25} color="#f4511e" />
                                   </TouchableOpacity>



                                   {/* <View style={{marginLeft:40}}>
                             <Button
                                   title="Log Out"
                                   style={{ height: 40 }}
                                   onPress={handelLogout}
                            /> 
                            </View> */}


                            </View>
                            <ProgressBar style={styles.progressBar} progress={progress} width={350} height={20} color="seagreen" borderWidth={2} borderColor="#ddd"
                                   borderRadius={5} />

                            {/* Search Bar */}
                            <View style={{paddingHorizontal: 40 ,flexDirection: "row", justifyContent:"space-between", width: "100%", alignItems:"center"}}>
                                   <TextInput
                                                               style={{
                                                                      width: '100%',
                                                                      height: 40,
                                                                      borderColor: '#ddd',
                                                                      borderWidth: 1,
                                                                      borderRadius: 5,
                                                                      paddingHorizontal: 10,
                                                               }}
                                                               placeholder="Search Notes"
                                                               value={search}
                                                               onChangeText={setSearch}
                                                        />
                                   {/* <TouchableOpacity onPress={handelSearch}>
                                          <Icon name="search-outline" size={24} />
                                   </TouchableOpacity> */}
                            </View>

                            <TaskItems onEditTask={handleEditTask} functionProps={handelProgressChange} selectedFilter={selectedFilter} search= {search} name="s" />

                            {/* <Translation/>      */}

                     </View>
              </View>
       )
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
              // marginTop: 22,
              paddingBottom:110,
              backgroundColor: "#fff",
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
       addTask: {
              width: "25%",
              height: 50,
              backgroundColor: '#fff',
              borderRadius: 10,
              padding: 12,
              marginTop: 10,
              marginBottom: 10,
              alignItems: 'center',
              justifyContent: 'center',
       },
       header: {
              flexDirection: 'row',
              width: "100%",
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              backgroundColor: "#fff",
              alignItems: "center"
       },
       filter: {
              width: "25%",
              height: 50,
              backgroundColor: '#3498db',
              borderRadius: 10,
              padding: 12,
              marginTop: 10,
              marginBottom: 10,
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
       },
       filterModal: {
              height: '20%',
              width: '60%',
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 20,
              elevation: 5,
              marginTop: 20,
       },
       modalArea: {
              marginTop: 139,
              paddingHorizontal: 29,
              // position: 'absolute',
              // left: 0,
              flex: 1,
              // backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'start',
              alignItems: "flex-end",
       },
       dropdown: {
              fontSize: 10,
              height: 40,
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 10,
              width: "100%",
              marginBottom: 10,
       },
       progressBar: {
              borderRadius: 5,
              overflow: 'hidden',
              marginBottom: 8
       }
})

export default Task