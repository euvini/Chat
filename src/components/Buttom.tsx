import { Button as ButtonNativeBase, IButtonProps, Heading } from "native-base"

type Props = IButtonProps & {
    title: string
}

export default function Button({ title, ...rest }: Props) {
    return (
        <ButtonNativeBase
            bg='green.900'
            py={3}
            fontSize='sm'
            rounded='sm'
            w='full'
            maxW='300'
            _pressed={{ bg: 'green.800' }}
            {...rest}>
            <Heading
                color='white'
                fontSize='md'
            >{title}</Heading>
        </ButtonNativeBase>
    )
}