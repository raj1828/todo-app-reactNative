import React from 'react'
import { useDispatch } from 'react-redux';
import { StyleSheet, View, TextInput, Button  } from 'react-native';
import { register } from '@/features/authSlice';

const RegisterPage = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const dispatch = useDispatch();

    const handleRegister = () => {
        try {
            const newUser = {
                id : Math.random().toString(),
                email : email,
                password : password,
            }
            dispatch(register(newUser));
        } catch (error) {
            console.log('Error in Saving Data', error);
        }
    }

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
    <Button title="Register" onPress={handleRegister} />
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

export default RegisterPage