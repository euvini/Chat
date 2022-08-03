import { Button as ButtonNativeBase, VStack, KeyboardAvoidingView, SectionList, Box, IconButton, AlertDialog, Toast } from 'native-base';
import { Platform } from 'react-native';
import uuid from 'react-native-uuid'
import React, { useEffect, useState } from 'react';
import { Bottom } from '../components/Bottom';
import { HeaderChat } from '../components/HeaderChat';
import auth from '@react-native-firebase/auth'
import groupBy from 'lodash/groupBy'
import Message from '../components/Message';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import { dateFormat, hourFormat } from '../utils/firestoreDateFormat';
import * as Icon from "phosphor-react-native";
import { handleLibraryPermission, pickLibraryImage, uploadImageAsync } from '../utils/pickImage';

export function Chat() {
    const [listMessages, setListMessages] = useState([])
    const [messages, setMessages] = useState([])
    const [text, setText] = React.useState('')
    const [image, setImage] = React.useState('')

    const navigation = useNavigation()
    const uid = auth().currentUser.uid
    const route: any = useRoute()
    const room = route.params.docId

    const [isOpen, setIsOpen] = React.useState(false);

    const onClose = () => setIsOpen(false);

    const cancelRef = React.useRef(null);

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
                onClose()

                const { url } = await uploadImageAsync(result.uri.replace('file://', ''), `chat/${room}`)
                firestore()
                    .collection('chats')
                    .doc(room)
                    .collection('messages')
                    .add({
                        id: uuid.v4(),
                        createdAt: firestore.FieldValue.serverTimestamp(),
                        image: url,
                        user: {
                            _id: uid
                        }
                    })
            }
            if (result.cancelled === true) {
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
                onClose()

                const { url } = await uploadImageAsync(result.uri.replace('file://', ''), `chat/${room}`)
                firestore()
                    .collection('chats')
                    .doc(room)
                    .collection('messages')
                    .add({
                        id: uuid.v4(),
                        createdAt: firestore.FieldValue.serverTimestamp(),
                        image: url,
                        user: {
                            _id: uid
                        }
                    })
            }
            if (result.cancelled === true) {
                onClose()
            }
        }
    }

    function onSend() {
        if (!text) {
            return
        }
        firestore()
            .collection('chats')
            .doc(room)
            .collection('messages')
            .add({
                id: uuid.v4(),
                createdAt: firestore.FieldValue.serverTimestamp(),
                text: text,
                user: {
                    _id: uid
                }
            })
        return setText('')
    }

    useEffect(() => {
        const subscriber = firestore()
            .collection('chats')
            .doc(room)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                setMessages(
                    snapshot.docs.map(doc => ({
                        id: doc.data().id,
                        date: dateFormat(doc.data().createdAt),
                        hour: hourFormat(doc.data().createdAt),
                        text: doc.data().text,
                        user: doc.data().user,
                        image: doc.data().image,
                    }))
                )
            })
        return subscriber;
    }, [])

    useEffect(() => {
        const groupedList = Object.values(
            groupBy(messages, function (n) {
                return n.date
            })
        )
        var data = []
        groupedList.map(d => {
            let section = {
                title: d[0].date,
                data: [...d],
            }
            data.push(section)
        })
        setListMessages(data)
    }, [messages])

    return (
        <KeyboardAvoidingView
            bg='gray.800'
            flex={1}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            {
                uid === route.params.uid1 ?
                    <HeaderChat
                        displayName={route.params.name2}
                        onPress={() => navigation.navigate('conversations')}
                    />
                    :
                    <HeaderChat
                        displayName={route.params.name1}
                        onPress={() => navigation.navigate('conversations')}
                    />
            }
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
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
            <VStack flex={1}>
                <SectionList
                    sections={listMessages}
                    inverted
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Message data={item} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <VStack py={5}>
                            <Box py={1} px={2} bg='gray.600' alignSelf='center' rounded='xl' >{title}</Box>
                        </VStack>
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </VStack>
            <Bottom
                placeholder='Digite sua mensagem...'
                value={text}
                onChangeText={setText}
                onPressSend={onSend}
                onPressOptions={() => { }}
                rightElement={
                    <IconButton
                        icon={<Icon.Camera color='white' />}
                        size={14}
                        marginRight={4}
                        onPress={() => setIsOpen(true)}
                    />
                }
                multiline
            />
        </KeyboardAvoidingView>
    );
}