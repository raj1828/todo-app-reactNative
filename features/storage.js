import AsyncStorage from '@react-native-async-storage/async-storage';

const storeTaskName = "tasks"

export const saveToLocalStorage = async (tasks) => {
    try {
        const jsonValue = JSON.stringify(tasks);
        await AsyncStorage.setItem(storeTaskName, jsonValue)
    } catch (error) {
        console.log('Error in Save Task : ', error)
    }
}

export const loadFromLocalStorage = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(storeTaskName);
        console.log('Data retrieved from AsyncStorage:', jsonValue);
        const tasks =  jsonValue != null ? JSON.parse(jsonValue) : [];
        console.log('Loaded tasks:', tasks)
        return tasks;
    } catch (error) {
        console.log('Error fetching form Local Storage', error);
        return [];
    }
}