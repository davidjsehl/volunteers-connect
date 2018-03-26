import { StackNavigator, TabNavigator }  from 'react-navigation';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import OrgSignUp from './screens/OrgSignUp';
import Home from './screens/Home';
import EventMap from './screens/EventMap';
import EventDetail from './screens/EventDetail';
import AllEvents from './screens/AllEvents';
import AllOrganizations from './screens/AllOrganizations';


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

export const HomeFlow = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Home',
            headerStyle: {
                backgroundColor: '#367BA5'
            },
            headerTintColor: '#fff'
        }
    },
    AllEvents: {
        screen: AllEvents,
        navigationOptions: {
            title: 'Events',
            headerStyle: {
                backgroundColor: '#367BA5'
            },
            headerTintColor: '#fff'
        }
    },
    EventDetail: {
        screen: EventDetail,
        navigationOptions: {
            title: 'Event Detail',
            headerStyle: {
                backgroundColor: '#367BA5'
            },
            headerTintColor: '#fff'
        }
    },
    AllOrganizations: {
        screen: AllOrganizations,
        navigationOptions: {
            header: null
        }
    }
})

export const LoggedIn = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    }
}, {
    headerMode: 'none'
})

export const createRootNavigator = (loggedIn = false) => {
    return StackNavigator(
        {
            HomeFlow: {
                screen: HomeFlow,
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
            initialRouteName: loggedIn ? 'HomeFlow' : 'LoggedOut'
        })
}