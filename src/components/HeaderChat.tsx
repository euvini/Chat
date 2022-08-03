import { useNavigation, useRoute } from '@react-navigation/native';
import { HStack, IconButton, VStack, Text, Avatar } from 'native-base';
import auth from '@react-native-firebase/auth'
import * as Icon from "phosphor-react-native";

type Props = {
  displayName: string
  onPress: () => void
}

export function HeaderChat({ displayName, onPress }: Props) {
  const navigation = useNavigation()
  const route: any = useRoute()
  const uid = auth().currentUser.uid
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
        source={{ uri: uid === route.params.uid1 ? `${route.params.photo2}` : `${route.params.photo1}` }}
      />
    </HStack>
  );
}