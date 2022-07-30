import { Heading, IconButton, HStack, Avatar, Pressable } from 'native-base';
import * as Icon from "phosphor-react-native";

type Props = {
    title: string
    onPress: () => void
}

export function Header({ title, onPress }: Props) {
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
                icon={<Icon.Plus color='white' size="26px" />}
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
                />
            </Pressable>
        </HStack>
    );
}