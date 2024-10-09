import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../features/tasksSlice';
import Toast from 'react-native-root-toast';
import Icon from "react-native-vector-icons/Ionicons";
import { editTask } from '../features/tasksSlice';

const TaskItems = ({ onEditTask }) => {
       const tasks = useSelector(state => state.tasks);
       const dispatch = useDispatch();

       const toggleStatus = (task) => {
              const updatedTask = { ...task, status: task.status === 'completed' ? 'pending' : 'completed' };
              dispatch(editTask(updatedTask));
       };

       const renderTaskItems = ({ item }) => (
              <View style={styles.taskItem}>
                     <Text style={styles.heading}>Note:</Text>
                     <Text style={styles.title}>{item.title}</Text>
                     <Text style={styles.desc}>{item.description}</Text>
                     <Text style={styles.status}>
                            {item.status === 'completed' ? '✔ Completed' : '⏳ Pending'}
                     </Text>
                     <TouchableOpacity onPress={() => toggleStatus(item)} style={styles.iconButton}>
                            <Icon
                                   name={item.status === 'completed' ? 'checkmark-circle' : 'ellipse-outline'}
                                   size={25}
                                   color="#fff"
                            />
                     </TouchableOpacity>
                     <View style={styles.actionBtn}>
                            <TouchableOpacity onPress={() => onEditTask(item)} style={styles.iconButton}>
                                   <Icon name="create-outline" size={25} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                   onPress={() => {
                                          dispatch(deleteTask(item.id));
                                          Toast.show('Task Deleted Successfully.', {
                                                 duration: Toast.durations.LONG,
                                          });
                                   }}
                                   style={styles.iconButton}
                            >
                                   <Icon name="trash-outline" size={25} color="#fff" />
                            </TouchableOpacity>
                     </View>
              </View>
       );

       return (
              <FlatList
                     data={tasks}
                     renderItem={renderTaskItems}
                     keyExtractor={(item) => item.id.toString()}
                     contentContainerStyle={styles.mainContainer}
                     showsVerticalScrollIndicator={true}
                     numColumns={2}
              />
       );
}

const styles = StyleSheet.create({
       mainContainer: {
              flexDirection: 'column',
              // flexWrap: 'wrap',
              justifyContent: 'space-between',
              padding: 10,
       },
       taskItem: {
              width: '48%',
              backgroundColor: '#f4511e',  // Main background color
              padding: 15,
              borderRadius: 10,
              marginBottom: 15,
              marginRight: 5,
              shadowColor: '#000',
              shadowOpacity: 0.2,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 4,
              elevation: 5,
       },
       heading: {
              fontSize: 16,
              fontWeight: 'bold',
              color: '#fff', // White text for contrast
              marginBottom: 5,
       },
       title: {
              fontSize: 14,
              color: '#fff', // White text for contrast
              marginBottom: 10,
       },
       desc: {
              fontSize: 12,
              color: '#fff', // White text for contrast
              marginBottom: 10,
       },
       actionBtn: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
       },
       iconButton: {
              backgroundColor: '#dd2c00',  // Button background color
              padding: 10,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              width: '45%',
       },
});

export default TaskItems;
