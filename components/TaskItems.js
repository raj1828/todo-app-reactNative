import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, editTask } from '../features/tasksSlice';
import Toast from 'react-native-root-toast';
import Icon from "react-native-vector-icons/Ionicons";

const TaskItems = ({ onEditTask, functionProps, selectedFilter, name, search }) => {
       const tasks = useSelector(state => state.tasks);
       const dispatch = useDispatch();

       const [progress, setProgress] = useState(0);
       const [debouncedSearch, setDebouncedSearch] = useState(search);

       // Filter tasks based on selectedFilter
       const filteredTasks = tasks.filter(task =>
              selectedFilter === 'all' ? true : task.status === selectedFilter
       );

       // Search functionality with debouncing
       const searchTask = tasks.filter(task =>
              debouncedSearch.toLowerCase() === '' ? true : task.title.toLowerCase().includes(debouncedSearch.toLowerCase())
       );

       // Debounce the search input
       useEffect(() => {
              const handler = setTimeout(() => {
                     setDebouncedSearch(search);
              }, 300);

              return () => {
                     clearTimeout(handler);
              };
       }, [search]);

       // Update progress when tasks change
       useEffect(() => {
              const totalTask = tasks.length;
              const completedTasks = tasks.filter(task => task.status === 'completed');
              const progressRes = totalTask === 0 ? 0 : (completedTasks.length / totalTask);
              setProgress(progressRes);
              functionProps(progressRes);
       }, [tasks]);

       // Check if the task is new
       const isNewTask = (createdAt) => {
              const fiveMinutes = 1 * 60 * 1000;
              return new Date() - new Date(createdAt) < fiveMinutes;
       };

       // Toggle task status and update UI
       const toggleStatus = (task) => {
              const updatedTask = { ...task, status: task.status === 'completed' ? 'pending' : 'completed' };
              dispatch(editTask(updatedTask));
       };

       const renderTaskItems = ({ item, index }) => (
              <View style={{
                     width: '49%',
                     backgroundColor: isNewTask(item.createdAt) ? '#0096FF' : (item.status === 'completed' ? 'seagreen' : '#f4511e'),
                     padding: 15,
                     borderRadius: 10,
                     marginBottom: 15,
                     marginRight: 5,
                     shadowColor: '#000',
                     shadowOpacity: 0.2,
                     shadowOffset: { width: 0, height: 2 },
                     shadowRadius: 4,
                     elevation: 5,
              }}>
                     <Text style={styles.heading}>{ "Note:"}</Text>
                     <Text style={styles.title}>{item.title}</Text>
                     <Text style={styles.desc}>{item.description}</Text>
                     <View style={styles.statusView}>
                            <Text style={styles.status}>
                                   {item.status === 'completed' ? '✔ Completed' : '⏳ Pending'}
                            </Text>
                            <TouchableOpacity onPress={() => toggleStatus(item)} style={styles.statusBtn}>
                                   <Icon
                                          name={item.status === 'completed' ? 'checkmark-circle' : 'ellipse-outline'}
                                          size={25}
                                          color="#fff"
                                   />
                            </TouchableOpacity>
                     </View>

                     <View style={styles.actionBtn}>
                            <TouchableOpacity onPress={() => onEditTask(item)} style={styles.editBtn(item.status)}>
                                   <Icon name="create-outline" size={25} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                   onPress={() => {
                                          Alert.alert("Delete Task", "Are you sure you want to Delete?", [
                                                 {
                                                        text: "Yes", onPress: () => {
                                                               dispatch(deleteTask(item.id));
                                                               Toast.show('Task Deleted Successfully.', {
                                                                      duration: Toast.durations.LONG,
                                                               });
                                                        }
                                                 },
                                                 { text: "No", onPress: () => console.log("Cancel Pressed") }
                                          ]);
                                   }}
                                   style={styles.deleteBtn(item.status)}
                            >
                                   <Icon name="trash-outline" size={25} color="#fff" />
                            </TouchableOpacity>
                     </View>
              </View>
       );

       return (
              <FlatList
                     data={search ? searchTask : [...filteredTasks].reverse()}
                     renderItem={renderTaskItems}
                     keyExtractor={(item) => item.id.toString()}
                     contentContainerStyle={styles.mainContainer}
                     showsVerticalScrollIndicator={true}
                     numColumns={2}
                     style={{ width: '100%' }}
              />
       );
};

const styles = StyleSheet.create({
       mainContainer: {
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 10,
              marginBottom: 200,
              paddingBottom: 420,
       },
       heading: {
              fontSize: 16,
              fontWeight: 'bold',
              color: '#fff',
              marginBottom: 5,
       },
       title: {
              fontSize: 16,
              color: '#fff',
              marginBottom: 10,
       },
       desc: {
              fontSize: 14,
              color: '#fff',
              marginBottom: 10,
       },
       actionBtn: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
       },
       statusView: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
       },
       editBtn: (status) => ({
              backgroundColor: status === 'completed' ? '#62AB37' : '#dd2c00',
              padding: 10,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              width: '45%',
       }),
       deleteBtn: (status) => ({
              backgroundColor: status === 'completed' ? '#62AB37' : '#dd2c00',
              padding: 10,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              width: '45%',
       }),
});

export default TaskItems;
