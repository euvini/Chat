import { Box, Image, Modal, Pressable, Text, VStack } from 'native-base';
import auth from '@react-native-firebase/auth'
import { useState } from 'react';

export default function Message({ data, ...rest }) {
    const uid = auth().currentUser.uid
    const user = data.user._id
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {
                user != uid ?
                    <Box mb={2} ml={4} px={4} py={2} maxW={250} bg='gray.900' alignSelf='flex-start' rounded='xl' {...rest} >
                        <Text fontSize={14} color='white'>{data.text}</Text>
                        {
                            data.image &&
                            <Pressable onPress={() => setShowModal(true)}>
                                <Image source={{ uri: data.image }} alt='Received Image' size='2xl' />
                            </Pressable>
                        }
                        <Text fontSize={10} alignSelf='flex-start' color='white'>{data.hour}</Text>
                        <Modal isOpen={showModal} onClose={() => setShowModal(false)} flex={1} width='xl' alignSelf='center' >
                            <Modal.Content>
                                <Modal.CloseButton />
                                <Modal.Body>
                                    <Image source={{ uri: data.image }} alt='Received Image' height='lg' />
                                </Modal.Body>
                            </Modal.Content>
                        </Modal>
                    </Box >

                    :

                    <Box mb={2} mr={4} px={4} py={2} maxW={250} bg='green.800' alignSelf='flex-end' rounded='xl' {...rest} >
                        <Text fontSize={14} color='white'>{data.text}</Text>
                        {
                            data.image &&
                            <Pressable onPress={() => setShowModal(true)}>
                                <Image source={{ uri: data.image }} alt='Sent Image' size='2xl' />
                            </Pressable>
                        }
                        <Text fontSize={10} alignSelf='flex-end' color='white'>{data.hour}</Text>
                        <Modal isOpen={showModal} onClose={() => setShowModal(false)} flex={1} width='xl' alignSelf='center' >
                            <Modal.Content>
                                <Modal.CloseButton />
                                <Modal.Body>
                                    <Image source={{ uri: data.image }} alt='Sent Image' height='lg' />
                                </Modal.Body>
                            </Modal.Content>
                        </Modal>
                    </Box>
            }
        </>
    )
}
