import { HStack, Button, Text, Input as NativeBaseInput, IInputProps } from 'native-base';
import * as Icon from "phosphor-react-native";

type Props = IInputProps & {
    onPressSend: () => void
    onPressOptions: () => void
}

export function Bottom({ onPressSend, onPressOptions, ...rest }: Props) {
    return (
        <HStack
            w='full'
            paddingY={4}
            pb={10}
            bg='gray.900'
            justifyContent='center'
        >
            <Button
                bg='blueGray.500'
                _pressed={{ bg: 'amber.700' }}
                size={35}
                rounded='full'
                onPress={onPressOptions}
            >
                <Icon.DotsThreeOutlineVertical size="20px" />
            </Button>
            <NativeBaseInput
                w='full'
                maxW='250'
                marginX={4}
                color='white'
                placeholderTextColor='gray.300'
                borderWidth={0.5}
                borderColor='gray.400'
                rounded='xl'
                fontSize={14}
                _focus={{
                    borderWidth: 1,
                    borderColor: 'gray.500',
                    bg: 'gray.700'
                }}
                {...rest}
            />
            <Button
                bg='blueGray.500'
                _pressed={{ bg: 'amber.700' }}
                size={35}
                rounded='full'
                onPress={onPressSend}
            >
                <Icon.PaperPlaneRight size="20px" />
            </Button>
        </HStack>
    );
}