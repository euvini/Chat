import { Box, Text, VStack } from 'native-base';
import auth from '@react-native-firebase/auth'

export default function Message({ data, ...rest }) {
    const uid = auth().currentUser.uid
    const user = data.user._id

    return (
        <>
            {
                user != uid ?
                    < Box mb={2} ml={4} px={4} py={2} maxW={250} bg='gray.900' alignSelf='flex-start' rounded='xl' {...rest} >
                        <Text fontSize={14} color='white'>{data.text}</Text>
                        <Text fontSize={10} alignSelf='flex-start' color='white'>{data.hour}</Text>
                    </Box >

                    :

                    <Box mb={2} mr={4} px={4} py={2} maxW={250} bg='green.800' alignSelf='flex-end' rounded='xl' {...rest} >
                        <Text fontSize={14} color='white'>{data.text}</Text>
                        <Text fontSize={10} alignSelf='flex-end' color='white'>{data.hour}</Text>
                    </Box>
            }
        </>
    )
}
