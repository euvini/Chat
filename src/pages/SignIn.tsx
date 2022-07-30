import { Heading, useTheme, KeyboardAvoidingView, IconButton, Toast } from 'native-base';
import { Input } from '../components/Input';
import * as Icon from "phosphor-react-native";
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import Logo from "../assets/logo_primary.svg"
import Button from '../components/Buttom';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'

export function SignIn() {
    const { colors } = useTheme()
    const navigation = useNavigation()

    const [showPassword, setShowPassword] = useState('password')
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSignIn() {
        if (!email || !password) {
            return (
                Toast.show({
                    title: 'Informe email e senha',
                })
            )
        }
        setIsLoading(true)
        auth().signInWithEmailAndPassword(email, password)
            .catch((e) => {
                setIsLoading(false)
                if (e.code === 'auth/invalid-email') {
                    Toast.show({
                        title: 'E-mail informado não é válido',
                        backgroundColor: 'red.900'
                    })
                }
                if (e.code === 'auth/user-disabled') {
                    Toast.show({
                        title: 'Usuário desativado',
                        backgroundColor: 'red.900'
                    })
                }
                if (e.code === 'auth/user-not-found') {
                    Toast.show({
                        title: 'Usuário não encontrado',
                        backgroundColor: 'red.900'
                    })
                }
                if (e.code === 'auth/wrong-password') {
                    Toast.show({
                        title: 'Senha incorreta'
                    })
                }
            })
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                flex={1}
                p={6}
                bg='gray.900'
                alignItems='center'>
                <Logo style={{ marginTop: 100 }} />
                <Heading mt={10} mb={6} fontSize={20} color='white'>Login</Heading>
                <Input
                    mb={2}
                    placeholder='Email'
                    type='text'
                    onChangeText={setEmail}
                    keyboardType='email-address'
                    InputLeftElement={<Icon.Envelope color={colors.gray[500]} style={{ marginLeft: 6 }} />}
                />
                <Input
                    mb={2}
                    placeholder='Password'
                    type={showPassword}
                    onChangeText={setPassword}
                    keyboardType='number-pad'
                    InputLeftElement={<Icon.Key color={colors.gray[500]} style={{ marginLeft: 6 }} />}
                    InputRightElement={
                        <IconButton
                            icon={
                                showPassword === 'password'
                                    ? <Icon.EyeClosed color={colors.gray[500]} size="26px" />
                                    : <Icon.Eye color={colors.gray[500]} size="26px" />
                            }
                            borderRadius='full'
                            _pressed={{
                                bg: 'transparent'
                            }}
                            onPress={() => setShowPassword(showPassword === 'password' ? 'text' : 'password')}
                        />}
                />
                <Button
                    title='Ok'
                    mt={5}
                    onPress={handleSignIn}
                    isLoading={isLoading}
                />
                <Button
                    title='Sign-up'
                    mt={5}
                    bg='transparent'
                    onPress={() => navigation.navigate('signUp')}
                />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}