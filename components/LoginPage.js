import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, Text, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import { loadUserFromLocalStorage } from '../features/storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginPage = () => {
       const [email, setEmail] = useState('');
       const [password, setPassword] = useState('');
       const [users, setUsers] = useState([]);
       const [emailError, setEmailError] = useState('');
       const [passwordError, setPasswordError] = useState('');
       const [showPassword, setShowPassword] = useState(false);
       const dispatch = useDispatch();
       const navigation = useNavigation();

       useEffect(() => {
              const backFunction = () => {
                     navigation.navigate('Register');
                     return true;
              };

              const backHandler = BackHandler.addEventListener('hardwareBackPress', backFunction)

              return () => backHandler.remove();
       }, [])

       useEffect(() => {
              const fetchUsers = async () => {
                     const storedUsers = await loadUserFromLocalStorage();
                     setUsers(storedUsers);
              };
              fetchUsers();
       }, []);

       const handleLogin = () => {
              const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
              setEmailError('');
              setPasswordError('');

              let hasError = false;

              if (!email) {
                     setEmailError('Please enter a valid email');
                     hasError = true;
              }
              if (!validRegex.test(email)) {
                     setEmailError('Invalid email format');
                     hasError = true;
              }
              if (!password) {
                     setPasswordError('Please enter a valid password');
                     hasError = true;
              }

              if (!hasError) {
                     const user = users.find(u => u.email === email && u.password === password);
                     if (user) {
                            dispatch(login(user));
                            navigation.replace('Tasks');
                     } else {
                            Alert.alert('Invalid credentials', 'Please check your email and password');
                     }
              }
       };

       return (
              <View style={styles.container}>
                     <Text style={styles.title}>Login</Text>
                     <TextInput
                            style={styles.input}
                            placeholder="Enter Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                     />
                     {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                     <View style={styles.passwordContainer}>
                            <TextInput
                                   style={styles.passwordInput}
                                   placeholder="Enter Password"
                                   value={password}
                                   onChangeText={setPassword}
                                   secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                   <Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={25} color="#bdc3c7" />
                            </TouchableOpacity>
                     </View>
                     {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
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
       );
};

const styles = StyleSheet.create({
       container: {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f7f7f7',
              padding: 20,
       },
       title: {
              fontSize: 28,
              fontWeight: '700',
              marginBottom: 30,
              color: '#2c3e50',
       },
       input: {
              width: '100%',
              height: 50,
              borderColor: '#bdc3c7',
              borderWidth: 1,
              borderRadius: 10,
              marginBottom: 15,
              paddingHorizontal: 15,
              backgroundColor: '#ecf0f1',
              fontSize: 16,
       },
       passwordContainer: {
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              height: 50,
              borderColor: '#bdc3c7',
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 15,
              backgroundColor: '#ecf0f1',
              marginBottom: 15,
       },
       passwordInput: {
              flex: 1,
              fontSize: 16,
       },
       button: {
              backgroundColor: '#3498db',
              paddingVertical: 15,
              width: '100%',
              borderRadius: 10,
              alignItems: 'center',
              marginBottom: 20,
       },
       buttonText: {
              color: '#ffffff',
              fontSize: 18,
              fontWeight: '600',
       },
       registerText: {
              fontSize: 14,
              color: '#34495e',
       },
       registerLink: {
              color: '#3498db',
              fontWeight: '700',
       },
       errorText: {
              color: 'red',
              marginBottom: 10,
              fontSize: 14,
       },
});

export default LoginPage;
