import { AsyncStorage } from 'react-native';


export const isLoggedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('user-token')
        .then(res => {
            if (res !== null) resolve(true)
            else resolve(false)
        })
    })
    .catch(err => reject(err))
}