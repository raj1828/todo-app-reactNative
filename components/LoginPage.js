import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
import {login} from '../features/authSlice';
import { useDispatch } from 'react-redux';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = () => {
        if (email === 'test@example.com' && password === 'password') {
            dispatch(login({ email })); // Dispatch login action
        } else {
            Alert.alert('Invalid credentials');
        }
    };
  return (
    <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
  )
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
});

export default LoginPage