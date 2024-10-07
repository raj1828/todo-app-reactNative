import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import {fetchTranslations} from '../features/storage';
import { Dropdown } from "react-native-element-dropdown"
import Loader from "../features/Loader"
import {languages} from "../features/Countries"



const Translation = () => {
   
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en-GB');
  const [isLoading, setIsLoading] = useState(false);
  const [matches, setMatches] = useState('');


  const handleTranslate = async  () => {
    setTranslatedText('');
    setMatches('')
    setIsLoading(true);
    console.log(selectedLanguage)

    try {
        
        const translatedData = await fetchTranslations(inputText, selectedLanguage);
        console.log(translatedData);
        setTranslatedText(translatedData[0].text);
        setMatches(translatedData[0].matches);
        if(translatedText == null ){
          setTranslatedText('API dont have this translation in this Language')
          setMatches('');
        }
        setIsLoading(false)

    } catch (error) {
        console.log(error);
        Alert.alert('Error in Fetching translations')
    }
    
  };

  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle= {styles.scrollContainer}>
        <Text style={styles.title}>Translation</Text>
      <TextInput
        style={styles.translationText}
        placeholder="Enter Translation Text"
        value={inputText}
        onChangeText={setInputText}
        multiline={true}
        numberOfLines={5}
      />
      <Dropdown
                            data={languages}
                            labelField="label"
                            valueField="value"
                            placeholder="Select a language"
                            value={selectedLanguage}
                            onChange={item => {
                                setSelectedLanguage(item.value);
                            }}
                            style={styles.dropdown}
                            containerStyle={styles.dropdownContainer}
                        />
      <View style={styles.buttonContainer}>
        <Button title="Translate" onPress={handleTranslate} color="#4CAF50" />
      </View>

      {
        isLoading ? ( <Loader />  ) : null 
      }

      {translatedText ? (
        <View>
          <Text style={styles.translateText}>Translation: {translatedText}</Text>
          <Text style={styles.translateText}>Match Result: {matches * 100}%</Text>
        </View>
      ) : null}
        </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:10,
    width: '100%', // Set width to 100% for proper layout
        padding: 20,
        marginBottom: 200,
  },
  title:{
    fontSize:24,
    fontWeight:'bold',
    marginBottom:10
  },
  translationText:{
    borderWidth:1,
    borderColor:'#ccc',
    padding:10,
    marginBottom:10,
    width: 380
  },
  translateText:{
    fontSize:18,
    fontWeight:'bold',
    marginBottom:10
  },
  dropdown: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: 380,
    marginBottom: 20,
  },
  scrollContainer:{
    width: 400
    // flex: 1,
    // padding: 10,
    // flexGrow: 1,
    // justifyContent: 'flex-start'
}
});

export default Translation;
