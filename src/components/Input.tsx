import { VStack, Input as NativeBaseInput, IInputProps, Heading } from 'native-base';

export function Input({ ...rest }: IInputProps) {
    return (
        <NativeBaseInput
            py={3}
            w='full'
            maxW='300'
            marginX={4}
            color='white'
            placeholderTextColor='gray.300'
            borderWidth={0.5}
            bg='gray.700'
            borderColor='gray.400'
            rounded='md'
            fontSize={16}
            _focus={{
                borderWidth: 0.5,
                borderColor: 'gray.500',
                bg: 'gray.600'
            }}
            {...rest}
        />
    );
}