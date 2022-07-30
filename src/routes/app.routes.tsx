import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CallUser } from '../pages/CallUser';
import { Chat } from '../pages/Chat';
import { Conversations } from '../pages/Conversations';

export function AppRoutes() {
    const { Navigator, Screen } = createNativeStackNavigator()
    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen
                name='conversations'
                component={Conversations}
            />
            <Screen
                name='chat'
                component={Chat}
            />
            <Screen
                name='calluser'
                component={CallUser}
            />
        </Navigator>
    );
}