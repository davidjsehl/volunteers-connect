import firebase from 'firebase';

//ACTION TYPES

const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';


//ACTION CREATORS

const getEvents = events => {
    return { type: GET_EVENTS_SUCCESS, events }
}

//THUNK CREATORS

export const getAllEventsThunk = () => {
    firebase.database().ref('/events')
    .one('value', snapshot => {
        console.log('evennnnttttt snapshotttttttt', snapshot.val())
    })
}

//REDUCER

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS_SUCCESS:
            return action.events
    }
}