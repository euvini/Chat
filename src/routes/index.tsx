import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { AppRoutes } from './app.routes';
import { useEffect, useState } from 'react';
import { AuthRoutes } from './auth.routes';

export function Routes() {
    const [user, setUser] = useState<FirebaseAuthTypes.User>()

    useEffect(() => {
        const subscriber = auth()
            .onAuthStateChanged(res => {
                setUser(res)
            })
        return subscriber;
    }, [])

    return (
        <NavigationContainer>
            {user ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    );
}