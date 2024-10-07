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

export const fetchTranslations = async (inputText, language) => {
       try {
              console.log(inputText);
              console.log(language);
              const data = await fetch(`https://api.mymemory.translated.net/get?q=${inputText}&langpair=en-GB|${language}`)
              const response = await data.json();
              
              const result = [];
              const translation = response.responseData.translatedText
              const match = response.responseData.match
              result.push({ text: translation, matches: match });
              return result;
       } catch (error) {
              console.log('Error in Traslating through API', error);
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
