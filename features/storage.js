import AsyncStorage from '@react-native-async-storage/async-storage';

const storeTaskName = "tasks"
const storeUsers = "users"

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
              const tasks = jsonValue != null ? JSON.parse(jsonValue) : [];
              console.log('Loaded tasks:', tasks)
              return tasks;
       } catch (error) {
              console.log('Error fetching form Local Storage', error);
              return [];
       }
}

export const fetchNews = async (page = 1) => {
       try {
              const response = await fetch(
                     'https://newsapi.org/v2/everything?q=bitcoin&apiKey=c61220174ade46ccb8337e6219431c20'
              );
              const data = await response.json();
              return data.articles; // Return the articles from the response
       } catch (error) {
              console.error('Error fetching news:', error);
              return []; // Return an empty array in case of error
       }
};


export const saveUserToLocalStorage = async (users) => {
       try {

              const plainUsers = JSON.parse(JSON.stringify(users));
              const jsonValue = JSON.stringify(plainUsers);
              await AsyncStorage.setItem(storeUsers, jsonValue);
              console.log('User saved to AsyncStorage:', jsonValue);
       } catch (error) {
              console.log('Error in Save User : ', error)
       }
}

export const loadUserFromLocalStorage = async () => {
       try {
              const jsonValue = await AsyncStorage.getItem(storeUsers);
              console.log('Data retrieved from AsyncStorage:', jsonValue);
              const users = jsonValue != null ? JSON.parse(jsonValue) : [];
              return users;
       } catch (error) {
              console.log('Error in Retriving Users', error);
              return [];
       }
}
