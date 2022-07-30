import { Divider, FlatList, Toast, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import Users, { UsersProps } from '../components/Users';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

export function CallUser() {
    const [data, setData] = useState<UsersProps[]>([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const uid = auth().currentUser.uid
    const navigation = useNavigation()

    useEffect(() => {
        const mydata = firestore()
            .collection('users')
            .doc(uid)
            .onSnapshot(snapshot => {
                const data = snapshot.data()
                setName(data.name)
                setEmail(data.email)
            })
        return mydata
    })

    useEffect(() => {
        const subscriber = firestore()
            .collection('users')
            .where('uid', '!=', uid)
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => {
                    const { name, email, uid } = doc.data()
                    return {
                        id: doc.id,
                        name,
                        email,
                        uid
                    }
                })
                setData(data)
                //console.log(data[0])
            })
        return subscriber;
    }, [])

    return (
        <VStack bg='gray.800' flex={1} >
            <Header title='New' onPress={() => { }} />
            <VStack flex={1} mt={4} alignItems='center' >
                <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Users data={item} onPress={() => {
                        Alert.alert(
                            'Criar chat', `Deseja criar chat com ${item.name}?`,
                            [
                                {
                                    text: 'Criar',
                                    onPress: () => {
                                        firestore()
                                            .collection('rooms')
                                            .add({
                                                participants: [
                                                    uid,
                                                    item.uid
                                                ],
                                                name1: name,
                                                email1: email,
                                                uid1: uid,
                                                name2: item.name,
                                                email2: item.email,
                                                uid2: item.uid,
                                                createdAt: firestore.FieldValue.serverTimestamp()
                                            }).catch((e) => {
                                                console.log(e)
                                                return Toast.show({
                                                    title: 'Não foi possível criar o Chat',
                                                    backgroundColor: 'red.900'
                                                })
                                            }).then(response => {
                                                console.log(response)
                                                Toast.show({
                                                    title: 'Chat criado com sucesso!',
                                                    backgroundColor: 'green.900'
                                                })
                                                return navigation.navigate('conversations')
                                            })
                                    }
                                },
                                {
                                    text: 'Cancelar',
                                    onPress: () => { },
                                    style: 'cancel'
                                }
                            ]
                        )

                    }} />}
                    numColumns={3}
                />
            </VStack>
        </VStack>
    );
}