import React from 'react'
import { useDispatch } from 'react-redux';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { register } from '@/features/authSlice';
import { useNavigation } from '@react-navigation/native';

const RegisterPage = () => {
       const [email, setEmail] = React.useState('');
       const [password, setPassword] = React.useState('');
       const dispatch = useDispatch();
       const navigation = useNavigation();

       const handleRegister = () => {
              try {
                     const newUser = {
                            id: Math.random().toString(),
                            email: email,
                            password: password,
                     }
                     dispatch(register(newUser));
                     navigation.navigate('Login');
              } catch (error) {
                     console.log('Error in Saving Data', error);
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
                     <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                     />
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