import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import {fetchTranslations} from '../features/storage';
import { Dropdown } from "react-native-element-dropdown"



const Translation = () => {
   
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en-GB');

  const languages =  [
    { label: 'Amharic', value: 'am-ET' },
  { label: 'Arabic', value: 'ar-SA' },
  { label: 'Bielarus', value: 'be-BY' },
  { label: 'Bemba', value: 'bem-ZM' },
  { label: 'Bislama', value: 'bi-VU' },
  { label: 'Bajan', value: 'bjs-BB' },
  { label: 'Bengali', value: 'bn-IN' },
  { label: 'Tibetan', value: 'bo-CN' },
  { label: 'Breton', value: 'br-FR' },
  { label: 'Bosnian', value: 'bs-BA' },
  { label: 'Catalan', value: 'ca-ES' },
  { label: 'Coptic', value: 'cop-EG' },
  { label: 'Czech', value: 'cs-CZ' },
  { label: 'Welsh', value: 'cy-GB' },
  { label: 'Danish', value: 'da-DK' },
  { label: 'Dzongkha', value: 'dz-BT' },
  { label: 'German', value: 'de-DE' },
  { label: 'Maldivian', value: 'dv-MV' },
  { label: 'Greek', value: 'el-GR' },
  { label: 'English', value: 'en-GB' },
  { label: 'Spanish', value: 'es-ES' },
  { label: 'Estonian', value: 'et-EE' },
  { label: 'Basque', value: 'eu-ES' },
  { label: 'Persian', value: 'fa-IR' },
  { label: 'Finnish', value: 'fi-FI' },
  { label: 'Fanagalo', value: 'fn-FNG' },
  { label: 'Faroese', value: 'fo-FO' },
  { label: 'French', value: 'fr-FR' },
  { label: 'Galician', value: 'gl-ES' },
  { label: 'Gujarati', value: 'gu-IN' },
  { label: 'Hausa', value: 'ha-NE' },
  { label: 'Hebrew', value: 'he-IL' },
  { label: 'Hindi', value: 'hi-IN' },
  { label: 'Croatian', value: 'hr-HR' },
  { label: 'Hungarian', value: 'hu-HU' },
  { label: 'Indonesian', value: 'id-ID' },
  { label: 'Icelandic', value: 'is-IS' },
  { label: 'Italian', value: 'it-IT' },
  { label: 'Japanese', value: 'ja-JP' },
  { label: 'Kazakh', value: 'kk-KZ' },
  { label: 'Khmer', value: 'km-KM' },
  { label: 'Kannada', value: 'kn-IN' },
  { label: 'Korean', value: 'ko-KR' },
  { label: 'Kurdish', value: 'ku-TR' },
  { label: 'Kyrgyz', value: 'ky-KG' },
  { label: 'Latin', value: 'la-VA' },
  { label: 'Lao', value: 'lo-LA' },
  { label: 'Latvian', value: 'lv-LV' },
  { label: 'Mende', value: 'men-SL' },
  { label: 'Malagasy', value: 'mg-MG' },
  { label: 'Maori', value: 'mi-NZ' },
  { label: 'Malay', value: 'ms-MY' },
  { label: 'Maltese', value: 'mt-MT' },
  { label: 'Burmese', value: 'my-MM' },
  { label: 'Nepali', value: 'ne-NP' },
  { label: 'Niuean', value: 'niu-NU' },
  { label: 'Dutch', value: 'nl-NL' },
  { label: 'Norwegian', value: 'no-NO' },
  { label: 'Nyanja', value: 'ny-MW' },
  { label: 'Pakistani', value: 'ur-PK' },
  { label: 'Palauan', value: 'pau-PW' },
  { label: 'Panjabi', value: 'pa-IN' },
  { label: 'Pashto', value: 'ps-PK' },
  { label: 'Pijin', value: 'pis-SB' },
  { label: 'Polish', value: 'pl-PL' },
  { label: 'Portuguese', value: 'pt-PT' },
  { label: 'Kirundi', value: 'rn-BI' },
  { label: 'Romanian', value: 'ro-RO' },
  { label: 'Russian', value: 'ru-RU' },
  { label: 'Sango', value: 'sg-CF' },
  { label: 'Sinhala', value: 'si-LK' },
  { label: 'Slovak', value: 'sk-SK' },
  { label: 'Samoan', value: 'sm-WS' },
  { label: 'Shona', value: 'sn-ZW' },
  { label: 'Somali', value: 'so-SO' },
  { label: 'Albanian', value: 'sq-AL' },
  { label: 'Serbian', value: 'sr-RS' },
  { label: 'Swedish', value: 'sv-SE' },
  { label: 'Swahili', value: 'sw-SZ' },
  { label: 'Tamil', value: 'ta-LK' },
  { label: 'Telugu', value: 'te-IN' },
  { label: 'Tetum', value: 'tet-TL' },
  { label: 'Tajik', value: 'tg-TJ' },
  { label: 'Thai', value: 'th-TH' },
  { label: 'Tigrinya', value: 'ti-TI' },
  { label: 'Turkmen', value: 'tk-TM' },
  { label: 'Tagalog', value: 'tl-PH' },
  { label: 'Tswana', value: 'tn-BW' },
  { label: 'Tongan', value: 'to-TO' },
  { label: 'Turkish', value: 'tr-TR' },
  { label: 'Ukrainian', value: 'uk-UA' },
  { label: 'Uzbek', value: 'uz-UZ' },
  { label: 'Vietnamese', value: 'vi-VN' },
  { label: 'Wolof', value: 'wo-SN' },
  { label: 'Xhosa', value: 'xh-ZA' },
  { label: 'Yiddish', value: 'yi-YD' },
  { label: 'Zulu', value: 'zu-ZA' }
  ];

  const handleTranslate = async  () => {
    console.log(selectedLanguage)

    try {
        
        const translatedData = await fetchTranslations(inputText, selectedLanguage);
        setTranslatedText(translatedData);

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
      {translatedText ? (
        <Text style={styles.translateText}>Translation: {translatedText}</Text>
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
    marginBottom:10
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
    width: '100%',
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
