import { useNavigation } from '@react-navigation/native';
import { HStack, IconButton, VStack, Text, Avatar } from 'native-base';
import * as Icon from "phosphor-react-native";

type Props = {
  displayName: string
  photo: string
  onPress: () => void
}

export function HeaderChat({ displayName, onPress, photo }: Props) {
  const navigation = useNavigation()
  return (
    <HStack w='full' h={100} bg='gray.900' alignItems='center' pt={8} px={6} justifyContent='space-between'>
      <IconButton
        icon={<Icon.CaretLeft color='white' size="26px" />}
        borderRadius='full'
        _pressed={{ bg: 'transparent' }}
        onPress={onPress}
      />
      <VStack>
        <Text fontSize={18} color='white' >{displayName}</Text>
      </VStack>
      <Avatar
        source={{ uri: `${photo}` }}
      />
    </HStack>
  );
}