import { AlertDialog, Avatar, Pressable, Text, Toast, VStack, Button as ButtonNativeBase } from 'native-base';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import PreviewAvatar from '../../assets/avatar.png';
import Button from '../../components/Buttom';
import { handleLibraryPermission, handleCameraPermission, pickLibraryImage, uploadImageAsync } from '../../utils/pickImage';
import { Platform } from 'react-native';

export function GetAvatar() {
    const [isLoading, setIsLoading] = useState(false)
    const route: any = useRoute()
    const navigation = useNavigation()

    const [isOpen, setIsOpen] = React.useState(false);

    const onClose = () => setIsOpen(false);

    const cancelRef = React.useRef(null);

    const name = route.params.name
    const email = route.params.email
    const password = route.params.password
    const [avatar, setAvatar] = useState('')

    async function handleLibraryAvatar() {
        const permisssion = await handleLibraryPermission()
        if (permisssion.granted === false) {
            return Toast.show({
                title: 'Permissão negada. Habilite o acesso nas configurações do celular',
                backgroundColor: 'red.900'
            })
        } else {
            const result = await pickLibraryImage()
            if (result.cancelled === false) {
                setAvatar(result.uri)
                onClose()
            }
        }
    }

    async function handleCameraAvatar() {
        const permisssion = await handleLibraryPermission()
        if (permisssion.granted === false) {
            return Toast.show({
                title: 'Permissão negada. Habilite o acesso nas configurações do celular',
                backgroundColor: 'red.900'
            })
        } else {
            const result = await pickLibraryImage()
            if (result.cancelled === false) {
                setAvatar(result.uri)
                onClose()
            }
        }
    }

    function handleCreateUser() {
        setIsLoading(true)
        auth().createUserWithEmailAndPassword(email, password)
            .catch((e) => {
                setIsLoading(false)
                if (e.code === 'auth/invalid-email') {
                    return Toast.show({
                        title: 'E-mail informado não é válido',
                        backgroundColor: 'red.900'
                    })
                }
                if (e.code === 'auth/email-already-in-use') {
                    return Toast.show({
                        title: 'E-mail já está em uso',
                        backgroundColor: 'red.900'
                    })
                }
                if (e.code === 'auth/weak-password') {
                    return Toast.show({
                        title: 'Senha fraca, digite uma senha maior de no mínimo 6 números',
                        backgroundColor: 'red.900'
                    })
                }
            }).then(async (res) => {
                console.log(res.user.uid)
                
                let avatarUrl: string
                const { url } = await uploadImageAsync(avatar, `avatar/${res.user.uid}`, 'Avatar')
                avatarUrl = url
                firestore()
                    .collection('users')
                    .doc(res.user.uid)
                    .set({
                        name,
                        email,
                        uid: res.user.uid,
                        avatar: avatarUrl
                    })
                    .then(() => {
                        return Toast.show({
                            title: 'Usuário registrado',
                            backgroundColor: 'green.900'
                        })
                    })
            })
    }

    return (
        <VStack bg='gray.800' flex={1} alignItems='center' justifyContent='center'>
            <Pressable mb={20} onPress={() => setIsOpen(!isOpen)}>
                <Avatar bg='green.900' size={40} source={avatar === '' ? PreviewAvatar : { uri: avatar }} />
                <Text color='white' mt={2} >Selecionar foto de perfil</Text>
            </Pressable>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose} >
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>Selecionar foto de perfil</AlertDialog.Header>
                    <AlertDialog.Body>
                        Deseja selecionar uma foto da galeria de imagens ou tirar uma foto agora?
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <ButtonNativeBase.Group space={2}>
                            <ButtonNativeBase variant="subtle" colorScheme="green" onPress={handleLibraryAvatar} ref={cancelRef}>
                                Galeria
                            </ButtonNativeBase>
                            <ButtonNativeBase colorScheme="green" onPress={handleCameraAvatar}>
                                Câmera
                            </ButtonNativeBase>
                        </ButtonNativeBase.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
            {
                avatar === '' ?
                    <Button
                        title='Back'
                        mt={5}
                        bg='transparent'
                        onPress={() => navigation.goBack()}
                    />
                    :
                    <>
                        <Button
                            title='Register'
                            mt={5}
                            onPress={handleCreateUser}
                            isLoading={isLoading}
                        />
                        <Button
                            title='Back'
                            mt={5}
                            bg='transparent'
                            onPress={() => navigation.goBack()}
                        />
                    </>
            }
        </VStack>
    );
}