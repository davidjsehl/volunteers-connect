import { StackNavigator, TabNavigator }  from 'react-navigation';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import OrgSignUp from './screens/OrgSignUp';


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