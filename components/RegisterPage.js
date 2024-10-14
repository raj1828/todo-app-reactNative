import React from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { register } from '@/features/authSlice';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";


const RegisterPage = () => {
       const [email, setEmail] = React.useState('');
       const [password, setPassword] = React.useState('');
       const [emailError, setEmailError] = React.useState('');
       const [passwordError, setPasswordError] = React.useState('');
       const [showPassword, setShowPassword] = React.useState(false); // New state for password visibility
       const dispatch = useDispatch();
       const navigation = useNavigation();

       const handleRegister = () => {
              setEmailError('');
              setPasswordError('');

              const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
              let hasError = false;

              if (!email) {
                     setEmailError('Email is required');
                     hasError = true;
              }
              if (!validRegex.test(email)) {
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

              if (!hasError) {
                     const newUser = {
                            id: Math.random().toString(),
                            email: email,
                            password: password,
                     };
                     dispatch(register(newUser));
                     navigation.replace('Login');
              }
       };

       return (
              <View style={styles.container}>
                     <Text style={styles.title}>Register</Text>
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
                                   {/* <Text style={styles.showPasswordText}>{showPassword ? 'Hide' : 'Show'}</Text> */}
                            </TouchableOpacity>
                     </View>
                     {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
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
              marginBottom: 15,
              paddingHorizontal: 15,
              backgroundColor: '#ecf0f1',
       },
       passwordInput: {
              flex: 1,
              fontSize: 16,
       },
       showPasswordText: {
              color: '#3498db',
              fontWeight: '600',
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

export default RegisterPage;
