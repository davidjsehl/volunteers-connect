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
    currentUser: null
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

const getUser = user => ({ type: GET_USER, user })

//THUNK CREATORS

export const me = () => dispatch => {
    console.log('CURRENT USER', firebase.auth().currentUser);
    dispatch(getUser(firebase.auth().currentUser || {}));
}

export const createUser = (user) => dispatch => {
    let newUser = {
        id: user.uid,
        displayName: user.displayName,
        profileImage: user.photoURL,
        email: user.email
    }
    firebase.database().ref('/users').child(user.uid)
        .set(newUser, () => {
            dispatch(getUser(newUser))
        });
}

export const signUpUserThunk = ({ firstName, lastName, email, password }) => async dispatch => {
    dispatch({ type: LOGIN_USER_START })
    let user, userToken
    const query = firebase.database().ref('/users')
        .orderByChild('id')
        .equalTo(user.uid)
    try {
        user = await firebase.auth().signInWithEmailAndPassword(email, password);
        query.on('value', async snapshot => {
            if (snapshot.val()) {
                const existingUser = snapshot.val()[user.uid]
                userToken = existingUser.uid;
                await AsyncStorage.setItem('user-token', userToken);
                dispatch(loginUserSuccess(existingUser))
                getUserAndRedirect(existingUser, navigation, dispatch)

            } else {
                dispatch(createUser(user))
            }
        })
    } catch (err) {
        dispatch(loginUserFail(user))
        console.error(err)
        alert('Upload failed, sorry :(');
    }   
}

// export const loginUserThunk = () => dispatch => {

// }

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
            return { ...state, loading: false, currentUser: action.user, error: '' }
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
            return { ...state, loading: false, currentUser: action.user, error: '' }
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
