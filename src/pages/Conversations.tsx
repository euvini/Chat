import { Avatar, FlatList, HStack, IconButton, Pressable, Text, useNativeBase, VStack } from 'native-base';
import * as Icon from "phosphor-react-native";
import { ReactChild, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { conversations } from '../services/fakeCvs';
import auth from '@react-native-firebase/auth'
import { CardConversation } from '../components/CardConversation';
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native';

export function Conversations() {
    const [data, setData] = useState([])

    const uid = auth().currentUser.uid
    const navigation = useNavigation()

    function handleSignOut() {
        auth().signOut()
    }

    useEffect(() => {
        const subscriber = firestore()
            .collection('rooms')
            .where('participants', 'array-contains', uid)
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => {
                    const { name1, participants, email1, uid1, name2, email2, uid2 } = doc.data()
                    return {
                        participants,
                        name1,
                        email1,
                        uid1,
                        name2,
                        email2,
                        uid2,
                        docId: doc.id
                    }
                })
                setData(data)
                console.log(data)
            })
        return subscriber;
    }, [])

    return (
        <VStack bg='gray.800' flex={1}>
            <Header
                title='Conversations'
                onPress={() => {
                    navigation.navigate('calluser', { data: data })
                }}
            />
            <VStack flex={1} pb={15} >
                <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <CardConversation data={item} />}
                />
            </VStack>
            <IconButton
                icon={<Icon.SignOut color='white' size="26px" />}
                borderRadius='full'
                position='absolute'
                bottom={10}
                rounded='full'
                ml={6}
                bg='green.900'
                onPress={handleSignOut}
                _pressed={{
                    bg: 'green.800'
                }} />
        </VStack>
    );
}