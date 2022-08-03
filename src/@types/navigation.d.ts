export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            conversations: undefined
            chat: {
                uid1: string,
                uid2: string,
                name1: string,
                name2: string,
                photo1: string,
                photo2: string,
                email1: string,
                email2: string,
                docId: string,
            }
            signIn: undefined
            signUp: undefined
            getAvatar: {
                name: string,
                email: string,
                password: string
            }
            calluser: { data: any }
        }
    }
}