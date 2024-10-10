import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../features/tasksSlice';
import Toast from 'react-native-root-toast';
import Icon from "react-native-vector-icons/Ionicons";
import { editTask } from '../features/tasksSlice';


const TaskItems = ({ onEditTask, functionProps }) => {
       const tasks = useSelector(state => state.tasks);
       console.log(tasks.length);
       const totalTask = tasks.length;
       const [mark, setMark] = useState('pending')
       const dispatch = useDispatch();
       const [progress, setProgress] = useState(0)
       console.log("Progress: ", progress)

       // progress
       const completedTask = tasks.filter(task => task.status === 'completed');
       

       useEffect(() => {
              const progressRes = totalTask === 0 ? 0 : (completedTask.length / totalTask);
              setProgress(progressRes);
              functionProps(progressRes);
       }, [tasks])
       
       

       const toggleStatus = (task) => {
              const id = task.id;
              console.log(id)
              const updatedTask = { ...task, status: task.status === 'completed' ? 'pending' : 'completed' };
              setMark(updatedTask.status === 'completed'? 'completed' : 'pending');
              dispatch(editTask(updatedTask));
              console.log(updatedTask)
              console.log("Completed Task:", tasks[task])   
              

       };

       const renderTaskItems = ({ item }) => (
              <View style={{width: '48%',
                     backgroundColor: item.status =='completed' ? 'seagreen' : '#f4511e',
                     padding: 15,
                     borderRadius: 10,
                     marginBottom: 15,
                     marginRight: 5,
                     shadowColor: '#000',
                     shadowOpacity: 0.2,
                     shadowOffset: { width: 0, height: 2 },
                     shadowRadius: 4,
                     elevation: 5,}}>
                     <Text style={styles.heading}>Note:</Text>
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
                            <TouchableOpacity onPress={() => onEditTask(item)} style={{backgroundColor: item.status == 'completed' ? '#62AB37' :'#dd2c00',
              padding: 10,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              width: '45%',}}>
                                   <Icon name="create-outline" size={25} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                   onPress={() => {
                                          dispatch(deleteTask(item.id));
                                          Toast.show('Task Deleted Successfully.', {
                                                 duration: Toast.durations.LONG,
                                          });
                                   }}
                                   style={{backgroundColor: item.status == 'completed' ? '#62AB37' :'#dd2c00',
                                          padding: 10,
                                          borderRadius: 5,
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          width: '45%',}}
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
              marginBottom: 200,
              paddingBottom: 420
              // margin:200
       },
       taskItem: {
              // width: '48%',
              // backgroundColor: mark =='completed' ? '#90EE90' : '#f4511e',
              // padding: 15,
              // borderRadius: 10,
              // marginBottom: 15,
              // marginRight: 5,
              // shadowColor: '#000',
              // shadowOpacity: 0.2,
              // shadowOffset: { width: 0, height: 2 },
              // shadowRadius: 4,
              // elevation: 5,
       },
       heading: {
              fontSize: 16,
              fontWeight: 'bold',
              color: '#fff',
              marginBottom: 5,
       },
       title: {
              fontSize: 14,
              color: '#fff',
              marginBottom: 10,
       },
       desc: {
              fontSize: 12,
              color: '#fff',
              marginBottom: 10,
       },
       actionBtn: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
       },
       iconButton: {
              // backgroundColor: '#dd2c00',
              // padding: 10,
              // borderRadius: 5,
              // alignItems: 'center',
              // justifyContent: 'center',
              // width: '45%',
       },
       statusView:{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
       },

});

export default TaskItems;
