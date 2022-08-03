import { Heading, IconButton, HStack, Avatar, Pressable } from 'native-base';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { useEffect, useState } from 'react';
import { defaultAvatar } from '../assets/avatar.png'

type Props = {
    title: string
    onPress: () => void
    avatarImage?: string
    actionIcon: any
}

export function Header({ title, onPress, actionIcon }: Props) {
    const [avatarImage, setAvatarImage] = useState(defaultAvatar)
    const uid = auth().currentUser.uid

    function getUserData() {
        firestore()
            .collection('users')
            .doc(`${uid}`)
            .get()
            .then(documentSnapshot => {
                const dataUser = documentSnapshot.data()
                const { avatar } = dataUser;
                setAvatarImage(avatar)
                // console.log(avatar)
            });
    }

    useEffect(() => {
        getUserData();
    }, [])

    return (
        <HStack
            w='full'
            h={100}
            bg='gray.800'
            alignItems='center'
            pt={8}
            px={6}
            justifyContent='space-between'
            fontWeight='thin'
            borderBottomWidth={0.5}
        >
            <IconButton
                icon={actionIcon}
                borderRadius='full'
                _pressed={{
                    bg: 'transparent'
                }} 
                onPress={onPress}
                />
            <Heading
                color='gray.300'
                fontSize={20}
            >
                {title}
            </Heading>
            <Pressable>
                <Avatar
                    size={45}
                    source={{uri: avatarImage}}
                />
            </Pressable>
        </HStack>
    );
}