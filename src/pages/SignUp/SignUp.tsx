import { Heading, useTheme, KeyboardAvoidingView, IconButton, Toast } from 'native-base';
import { Input } from '../../components/Input';
import * as Icon from "phosphor-react-native";
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import Logo from "../../assets/logo_primary.svg"
import Button from '../../components/Buttom';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

export function SignUp() {
    const { colors } = useTheme()
    const navigation = useNavigation()

    const [showPassword, setShowPassword] = useState('password')
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmation, setConfirmation] = useState('')

    function willGetAvatar() {
        if (!email || !password) {
            return Toast.show({
                title: 'Preencha todos os campos',
                backgroundColor: 'red.900'
            })
        }
        if (password != confirmation) {
            return Toast.show({
                title: 'As senhas não combinam',
                backgroundColor: 'red.900'
            })
        }
        navigation.navigate('getAvatar', {
            name: name,
            email: email,
            password: password
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
                <Heading mt={10} mb={6} fontSize={20} color='white'>Sign Up</Heading>
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
                    placeholder='Name'
                    type='text'
                    onChangeText={setName}
                    keyboardType='default'
                    InputLeftElement={<Icon.User color={colors.gray[500]} style={{ marginLeft: 6 }} />}
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
                                    ? <Icon.Eye color={colors.gray[500]} size="26px" />
                                    : <Icon.EyeClosed color={colors.gray[500]} size="26px" />
                            }
                            borderRadius='full'
                            _pressed={{
                                bg: 'transparent'
                            }}
                            onPress={() => setShowPassword(showPassword === 'password' ? 'text' : 'password')}
                        />}
                />
                <Input
                    mb={2}
                    placeholder='Confirm passsword'
                    type={showPassword}
                    onChangeText={setConfirmation}
                    keyboardType='number-pad'
                    InputLeftElement={<Icon.Key color={colors.gray[500]} style={{ marginLeft: 6 }} />}
                    InputRightElement={
                        <IconButton
                            icon={
                                showPassword === 'password'
                                    ? <Icon.Eye color={colors.gray[500]} size="26px" />
                                    : <Icon.EyeClosed color={colors.gray[500]} size="26px" />
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
                    //onPress={handleCreateUser}
                    onPress={willGetAvatar}
                    isLoading={isLoading}
                />
                <Button
                    title='Cancel'
                    mt={5}
                    bg='transparent'
                    onPress={() => navigation.goBack()}
                />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}