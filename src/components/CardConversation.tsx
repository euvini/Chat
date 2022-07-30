import { Avatar, HStack, Pressable, Text, VStack } from 'native-base';
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native';

export function CardConversation({ data }) {
    const uid = auth().currentUser.uid
    const navigation = useNavigation()

    function handleChat() {
        navigation.navigate('chat', {
            name1: data.name1,
            name2: data.name2,
            email1: data.email1,
            email2: data.email2,
            uid1: data.uid1,
            uid2: data.uid2,
            docId: data.docId
        })
    }

    return (
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
        >
            {
                uid === data.uid2 ?
                    <HStack>
                        <Avatar source={{ uri: data.picture1 }} mr={6} size={60} />
                        <VStack>
                            <Text color='white'>{data.name1}</Text>
                            <Text color='white'>{data.email1}</Text>
                        </VStack>
                    </HStack>
                    :
                    <HStack>
                        <Avatar source={{ uri: data.picture2 }} mr={6} size={60} />
                        <VStack>
                            <Text color='white'>{data.name2}</Text>
                            <Text color='white'>{data.email2}</Text>
                        </VStack>
                    </HStack>
            }
        </Pressable>
    )
}