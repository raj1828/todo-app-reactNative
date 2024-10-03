import React, { useState } from 'react'
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTask, editTask } from '../features/tasksSlice'
import Toast from 'react-native-root-toast';


const TaskItems = ({ onEditTask }) => {
       const tasks = useSelector(state => state.tasks);
       const dispatch = useDispatch();
       return (
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle= {styles.scrollContainer}>
                     <View style={styles.mainContainer}>
                     {
                            tasks.map(task => (
                                   <View key={task.id} style={styles.taskItem}>
                                          <Text style={styles.heading}>Note : </Text>
                                          <Text style={styles.heading}>{task.title}</Text>
                                          <Text style={styles.desc}>{task.description}</Text>
                                          <View style={styles.actionBtn}>
                                                 <Button style={styles.btn}
                                                        title="Edit"
                                                        onPress={() => onEditTask(task)}
                                                 />
                                                 <Button
                                                        style={styles.btn}
                                                        title="Delete"
                                                        onPress={() => {
                                                               dispatch(deleteTask(task.id))
                                                               Toast.show('Task Delete Successfully.', {
                                                                      duration: Toast.durations.LONG,
                                                                    }); 
                                                               }
                                                        } 
                                                 />
                                          </View>
                                   </View>
                            ))
                     }
              </View>
              </ScrollView>
              
       )
}

const styles = StyleSheet.create({
       mainContainer: {
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              padding: 10,
       },
       taskItem: {
              width: '48%',
              backgroundColor: '#f8f8f8',
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
              marginBottom: 5,
       },
       title: {
              fontSize: 14,
              color: '#333',
              marginBottom: 10,
       },
       desc: {
              fontSize: 12,
              color: '#666',
              marginBottom: 10,
       },
       actionBtn: {
              flexDirection: 'row',
              justifyContent: 'space-between',
       },
       btn: {
              flex: 1,
              marginHorizontal: 5,
       },
       scrollContainer:{
              width: 400
              // flex: 1,
              // padding: 10,
              // flexGrow: 1,
              // justifyContent: 'flex-start'
       }
})

export default TaskItems