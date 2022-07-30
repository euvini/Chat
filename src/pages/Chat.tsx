import { Text, VStack, KeyboardAvoidingView, SectionList, Box } from 'native-base';
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
import { chat } from '../services/fakeapi';
import { dateFormat, hourFormat } from '../utils/firestoreDateFormat';

export function Chat() {
    const [listMessages, setListMessages] = useState([])
    const [messages, setMessages] = useState([])
    const [text, setText] = React.useState('')

    const navigation = useNavigation()
    const uid = auth().currentUser.uid
    const route: any = useRoute()
    const room = route.params.docId

    console.log(messages)

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
                        photo={'https://images.unsplash.com/photo-1659100056606-f745ce8cd83f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'}
                    />
                    :
                    <HeaderChat
                        displayName={route.params.name1}
                        onPress={() => navigation.navigate('conversations')}
                        photo={'https://images.unsplash.com/photo-1659100056606-f745ce8cd83f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'}
                    />
            }
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
                multiline
            />
        </KeyboardAvoidingView>
    );
}