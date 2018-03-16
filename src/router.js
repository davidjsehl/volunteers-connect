import { StackNavigator, TabNavigator }  from 'react-navigation';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import OrgSignUp from './screens/OrgSignUp';
import Home from './screens/Home';


export const LoggedOut = StackNavigator({
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    OrgSignUp: {
        screen: OrgSignUp,
        navigationOptions: {
            header: null
        }
    }
}, {
    headerMode: 'none'
})

export const LoggedIn = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    }
})

export const createRootNavigator = (loggedIn = false) => {
    return StackNavigator(
        {
            LoggedIn: {
                screen: LoggedIn,
                navigationOptions: {
                    gesturesEnabled: false,
                    headerLeft: null,
                    header: null
                }
            },
            LoggedOut: {
                screen: LoggedOut,
                navigationOptions: {
                    gesturesEnabled: false,
                    headerLeft: null,
                    header: null
                }
            }
        },
        {
            mode: 'modal',
            initialRouteName: loggedIn ? 'LoggedIn' : 'LoggedOut'
        })
}