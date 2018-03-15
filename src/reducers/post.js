import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import { Platform } from 'react-native'


const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

//ACTION TYPES

const POST_UPLOAD_START = 'POST_UPLOAD_START';
const POST_UPLOAD_SUCCESS = 'POST_UPLOAD_SUCCESS';
const POST_UPLOAD_FAIL = 'POST_UPLOAD_FAIL';


//INITIAL STATE

const initialState = {};

//ACTION CREATORS





//THUNK CREATORS

export const uploadPostThunk = (file, mime = 'application/octet-stream') => async dispatch => {
    console.log('filleleeeeeeee', file);
    dispatch({ type: POST_UPLOAD_START });
    return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri;
        console.log('urrriiiiiiiii', uploadUri)
        const sessionId = new Date().getTime();
        let uploadBlob = null;
        const storageRef = firebase.storage().ref('media').child(file.fileName);

        fs.readFile(uploadUri, 'base64')
        .then(data => Blob.build(data, { type: `${mime};BASE^$` }))
        .then((blob) => {
            uploadBlob = blob
            return storageRef.put(blob, { contentType: mime })
        })
        .then(() => {
            uploadBlob.close()
            return storageRef.getDownloadURL()
        })
        .then(url => {
            resolve(url)
            console.log('urrrrlllllll', url)
        })
    })
};

//REDUCER

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};