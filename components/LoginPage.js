import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import { loadUserFromLocalStorage } from '../features/storage';
import { useNavigation } from '@react-navigation/native';


const LoginPage = () => {
       const [email, setEmail] = useState('');
       const [password, setPassword] = useState('');
       const [users, setUsers] = useState([]);
       const [emailError, setEmailError] = useState('');
       const [passwordError, setPasswordError] = useState('');
       const dispatch = useDispatch();
       const navigation = useNavigation();

       useEffect(() => {
              const fetchUsers = async () => {
                     const storedUsers = await loadUserFromLocalStorage(); // Load users from AsyncStorage
                     setUsers(storedUsers);
              };
              fetchUsers();
       }, []);

       const handleLogin = () => {
              setEmailError('');
              setPasswordError('');

              let hasError = false;

              if (!email) {
                     setEmailError("Please enter a valid email");
                     hasError = true;
              }
              if (!password) {
                     setPasswordError('Please enter a valid password');
                     hasError = true;
              }

              if (!hasError) {
                     try {
                            const user = users.find(u => u.email === email && u.password === password);
                            console.log(user);
                            if (user) {
                                   dispatch(login(user));
                                   navigation.navigate('Tasks');
                            } else {
                                   Alert.alert('Invalid credentials', 'Please check your email and password');
                            }
                     } catch (error) {
                            console.log(error);
                     }
              }



       };
       return (
              <View style={styles.container}>
                     <Text style={styles.title}>Login</Text>
                     <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                     />
                     {
                            emailError ?
                                   <Text style={{ color: 'red', marginBottom: 15 }}>{emailError}</Text> : null
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
                                   <Text style={{ color: 'red', marginBottom: 15 }}>{emailError}</Text> : null
                     }
                     <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Login</Text>
                     </TouchableOpacity>
                     <Text style={styles.registerText}>
                            Don't have an account?{' '}
                            <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
                                   Register
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
              marginBottom: 20,
       },
       buttonText: {
              color: '#fff',
              fontSize: 16,
              fontWeight: 'bold',
       },
       registerText: {
              fontSize: 14,
              color: '#333',
       },
       registerLink: {
              color: '#007bff',
              fontWeight: 'bold',
       },
});

export default LoginPage