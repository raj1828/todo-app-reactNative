import React from 'react'
import { useDispatch } from 'react-redux';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { register } from '@/features/authSlice';
import { useNavigation } from '@react-navigation/native';

const RegisterPage = () => {
       const [email, setEmail] = React.useState('');
       const [password, setPassword] = React.useState('');
       const [emailError, setEmailError] = React.useState('');
       const [passwordError, setPasswordError] = React.useState('');
       const dispatch = useDispatch();
       const navigation = useNavigation();

       const handleRegister = () => {
              setEmailError('');
              setPasswordError('');

              var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

              let hasError = false;

              if(!email){
                     setEmailError('Email is required');
                     hasError = true;
              }
              if(!validRegex.test(email)){
                     setEmailError('Invalid email format');
                     hasError = true;
              }
              if (!password) {
                     setPasswordError('Password is required');
                     hasError = true;
              } else if (password.length < 8) {
                     setPasswordError('Password should be at least 8 characters long');
                     hasError = true;
              }

              if(!hasError){
                     try {
                            const newUser = {
                                   id: Math.random().toString(),
                                   email: email,
                                   password: password,
                            }
                            dispatch(register(newUser));
                            navigation.replace('Login');
                     } catch (error) {
                            console.log('Error in Saving Data', error);
                     }
              }

                     
              
              
       }

       return (
              <View style={styles.container}>
                     <Text style={styles.title}>Register</Text>
                     <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                     />
                     {
                            emailError ?
                            <Text style={{ color:'red', marginBottom: 15}}>{emailError}</Text> : null
                     }
                     <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                     />
                     {
                            passwordError ?
                            <Text style={{ color:'red', marginBottom: 15}}>{passwordError}</Text> : null
                     }
              
                     <TouchableOpacity style={styles.button} onPress={handleRegister}>
                            <Text style={styles.buttonText}>Register</Text>
                     </TouchableOpacity>
                     <Text style={styles.registerText}>
                            Already have an account?{' '}
                            <Text style={styles.registerLink} onPress={() => navigation.navigate('Login')}>
                                   Login
                            </Text>
                     </Text>
              </View>
       )
}

const styles = StyleSheet.create({
       container: {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f7f7f7',
              padding: 20,
       },
       title: {
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 20,
              color: '#333',
       },
       input: {
              width: '100%',
              height: 50,
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 8,
              marginBottom: 15,
              paddingLeft: 15,
              backgroundColor: '#fff',
       },
       button: {
              backgroundColor: '#007bff',
              paddingVertical: 15,
              width: '100%',
              borderRadius: 8,
              alignItems: 'center',
       },
       buttonText: {
              color: '#fff',
              fontSize: 16,
              fontWeight: 'bold',
       },
       registerText: {
              marginTop: 15,
              fontSize: 14,
              color: '#333',
       },
       registerLink: {
              color: '#007bff',
              fontWeight: 'bold',
       },
});

export default RegisterPage