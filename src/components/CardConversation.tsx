import { Avatar, HStack, Pressable, AlertDialog, Text, VStack, Button as ButtonNativeBase, Toast } from 'native-base';
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import React from 'react';

export function CardConversation({ data, ...rest }) {
    const uid = auth().currentUser.uid
    const navigation = useNavigation()

    const [isOpen, setIsOpen] = React.useState(false);

    const onClose = () => setIsOpen(false);

    const cancelRef = React.useRef(null);

    function handleDeleteConversation() {
        firestore()
            .collection('rooms')
            .doc(data.docId)
            .delete()
            .then(() => {
                return Toast.show({
                    title: 'Deletado'
                })
            })
    }

    function handleChat() {
        navigation.navigate('chat', {
            name1: data.name1,
            name2: data.name2,
            email1: data.email1,
            email2: data.email2,
            uid1: data.uid1,
            uid2: data.uid2,
            photo1: data.photo1,
            photo2: data.photo2,
            docId: data.docId
        })
    }

    return (
        <>
            <Pressable
                px={6}
                py={3}
                bg='gray.800'
                borderBottomWidth={0.3}
                borderLeftRadius={100}
                justifyContent='center'
                _pressed={{
                    bg: 'gray.700'
                }}
                onPress={handleChat}
                onLongPress={() => setIsOpen(true)}
                {...rest}
            >
                {
                    uid === data.uid2 ?
                        <HStack>
                            <Avatar source={{ uri: data.photo1 }} mr={6} size={60} />
                            <VStack>
                                <Text color='white'>{data.name1}</Text>
                                <Text fontSize='xs' mt={1} color='white'>{data.email1}</Text>
                            </VStack>
                        </HStack>
                        :
                        <HStack>
                            <Avatar source={{ uri: data.photo2 }} mr={6} size={60} />
                            <VStack>
                                <Text color='white'>{data.name2}</Text>
                                <Text fontSize='xs' mt={1} color='white'>{data.email2}</Text>
                            </VStack>
                        </HStack>
                }
            </Pressable>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>{uid === data.uid2 ? data.name1 : data.name2}</AlertDialog.Header>
                    <AlertDialog.Body>
                        Deseja realmente deletar a conversa?
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <ButtonNativeBase.Group space={2}>
                            <ButtonNativeBase colorScheme="warning" onPress={handleDeleteConversation}>
                                Deletar
                            </ButtonNativeBase>
                        </ButtonNativeBase.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </>
    )
}