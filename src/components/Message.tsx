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
                    <>
                        {
                            data.image ?
                                <Box mb={2} ml={4} mt={2} maxW={250} alignSelf='flex-start' {...rest} >
                                    <Pressable onPress={() => setShowModal(true)}>
                                        <Image source={{ uri: data.image }} alt='Sent Image' size='2xl' rounded='2xl' />
                                        <Text mt={-4} ml={2} fontSize={11} alignSelf='flex-start' color='white' >{data.hour}</Text>
                                    </Pressable>
                                    <Modal isOpen={showModal} onClose={() => setShowModal(false)} width='lg' alignSelf='center' backgroundColor='gray.600' >
                                        <Modal.Content bg='transparent' >
                                            <Modal.Body >
                                                <Image source={{ uri: data.image }} alt='Sent Image' height='sm' resizeMode='contain' />
                                            </Modal.Body>
                                        </Modal.Content>
                                    </Modal>
                                </Box>
                                :
                                <Box mb={2} ml={4} px={2} py={1} maxW={250} bg='green.800' alignSelf='flex-start' rounded='xl' {...rest} >
                                    <Text fontSize={14} color='white'>{data.text}</Text>
                                    <Text mt={1} fontSize={10} alignSelf='flex-end' color='white'>{data.hour}</Text>
                                </Box>
                        }
                    </>
                    :
                    <>
                        {
                            data.image ?
                                <Box mb={2} mr={4} mt={2} maxW={250} alignSelf='flex-end' {...rest} >
                                    <Pressable onPress={() => setShowModal(true)}>
                                        <Image source={{ uri: data.image }} alt='Sent Image' size='2xl' rounded='2xl' />
                                        <Text mt={-4} mr={2} fontSize={11} alignSelf='flex-end' color='white' >{data.hour}</Text>
                                    </Pressable>
                                    <Modal isOpen={showModal} onClose={() => setShowModal(false)} width='lg' alignSelf='center' backgroundColor='gray.600' >
                                        <Modal.Content bg='transparent' >
                                            <Modal.Body >
                                                <Image source={{ uri: data.image }} alt='Sent Image' height='sm' resizeMode='contain' />
                                            </Modal.Body>
                                        </Modal.Content>
                                    </Modal>
                                </Box>
                                :
                                <Box mb={2} mr={4} px={2} py={1} maxW={250} bg='green.800' alignSelf='flex-end' rounded='xl' {...rest} >
                                    <Text fontSize={14} color='white'>{data.text}</Text>
                                    <Text mt={1} fontSize={10} alignSelf='flex-end' color='white'>{data.hour}</Text>
                                </Box>
                        }
                    </>
            }
        </>
    )
}
