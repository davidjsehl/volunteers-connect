import { AsyncStorage } from 'react-native';
import firebase from 'firebase';

//ACTION TYPES

const AUTH_FORM_UPDATE = 'AUTH_FORM_UPDATE';
const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
const LOGIN_USER_START = 'LOGIN_USER_START';
const SIGN_UP_USER_START = 'SIGN_UP_USER_START';
const SIGN_UP_USER_SUCCESS = 'SIGN_UP_USER_SUCCESS';
const SIGN_UP_USER_FAIL = 'SIGN_UP_USER_FAIL';
const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCES';
const CREATE_USER_FAIL = 'CREATE_USER_FAIL';
const GET_USER = 'GET_USER';
const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';

//INITIAL STATE

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    loading: false,
    error: '',
    user: {}
}

//ACTION CREATORS

export const authFormUpdate = ({ prop, value }) => {
    return { type: AUTH_FORM_UPDATE, payload: { prop, value } }
}

const loginUserSuccess = (user) => {
    return { type: LOGIN_USER_SUCCESS, user }
}

const loginUserFail = (user) => {
    return { type: LOGIN_USER_FAIL, user }
}

const signUpUserSuccess = (user) => {
    return { type: SIGN_UP_USER_SUCCESS, user }
}

const signUpUserFail = () => {
    return { type: SIGN_UP_USER_FAIL }
}

const userCreated = (user) => {
    return { type: CREATE_USER_SUCCESS, user }
}

const getUser = (user) => {
    return { type: GET_USER, user }
}

//THUNK CREATORS

export const me = () => dispatch => {
    console.log('CURRENT USER', firebase.auth().currentUser);
    dispatch(getUser(firebase.auth().currentUser || {}));
}

export const createUser = (user, navigation, dispatch) => dispatch => {
    let newUser = {
        id: user.uid,
        displayName: user.displayName,
        profileImage: user.photoURL,
        email: user.email
    }
    firebase.database().ref('/users').child(user.uid)
    .set(newUser, () => {
        console.log('newwwwwUserrrrr', newUser)
        dispatch(getUserAndRedirect(newUser, navigation, dispatch))
    });
}

export const signUpUserThunk = ({ firstName, lastName, email, password }, navigation) => async dispatch => {
    dispatch({ type: SIGN_UP_USER_START })
    let user, userToken
    try {
        user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        console.log('ussssserrrrrrrrrr', user)
        userToken = user.uid;
        console.log('tokkkennnnnn', userToken)
        await AsyncStorage.setItem('user-token', userToken);
        dispatch(signUpUserSuccess(user))
        dispatch(createUser(user, navigation, dispatch))
    } catch (err) {
        dispatch(signUpUserFail(user))
        console.error(err)
        alert('Sign up failed, sorry :(');
    }   
}

export const loginUserThunk = ({ email, password }, navigation) => async dispatch => {
    dispatch({ type: LOGIN_USER_START })
    let user, userToken;
    try {
        user = await firebase.auth().signInWithEmailAndPassword(email, password);
        userToken = user.uid;
        await AsyncStorage.setItem('user-token', userToken);
        dispatch(loginUserSuccess(user));
        dispatch(getUserAndRedirect(user, navigation, dispatch));
    } catch (err) {
        dispatch(loginUserFail(user));
        console.error(err);
        alert('Login failed')
    }
}

export const logoutUserThunk = (navigation) => async dispatch => {
    await AsyncStorage.removeItem('user-token')
    navigation.navigate('LoggedOut')
}

//REDUCER

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_FORM_UPDATE:
            return {
                ...state,
                [action.payload.prop]: action.payload.value
            }
        case SIGN_UP_USER_START:
            return { ...state, loading: true, error: '' }
        case SIGN_UP_USER_SUCCESS:
            return { ...state, loading: false, user: action.user, error: '' }
        case SIGN_UP_USER_FAIL:
            return {
                ...state,
                error: 'Authentication failed',
                password: '',
                loading: false
            }
        case LOGIN_USER_START:
            return { ...state, loading: true }
        case LOGIN_USER_SUCCESS:
            return { ...state, loading: false, user: action.user, error: '' }
        case GET_USER:
            return action.user
        case LOG_OUT_SUCCESS:
            return {
                ...initialState,
            }
        default:
            return state
    }
}

const getUserAndRedirect = (user, navigation, dispatch) => {
    console.log('rediiirrectttttttt')
    dispatch(getUser(user))
    navigation.navigate('HomeFlow')
}