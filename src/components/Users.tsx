import { VStack, Text, Pressable, IPressableProps, Avatar, HStack, Divider } from 'native-base';

type Props = IPressableProps & {
    data: UsersProps
}

export type UsersProps = {
    id: string
    name: string
    email: string
    uid: string
    photo?: string
}

export default function Users({ data, ...rest }: Props) {
    return (
        <Pressable
            mx={1}
            mb={3}
            borderRightWidth={0.3}
            borderLeftWidth={0.3}
            width={120}
            maxWidth={120}
            height={130}
            maxHeight={130}
            {...rest}  >
            <VStack justifyContent='center' alignItems='center' my={2}>
                <Avatar size='lg' source={{uri: data.photo}} />
                <Text fontSize={14} maxW='32' mt={2} color='white'>{data.name}</Text>
            </VStack>
        </Pressable>
    )
}