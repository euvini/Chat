import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';

export function AuthRoutes() {
    const { Navigator, Screen } = createNativeStackNavigator()
    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen
                name='signIn'
                component={SignIn}
            />
            <Screen
                name='signUp'
                component={SignUp}
            />
        </Navigator>
    );
}