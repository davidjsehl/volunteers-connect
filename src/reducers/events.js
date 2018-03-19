import firebase from 'firebase';

//ACTION TYPES

const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';


//INITTIAL STATE

const initialState = [];

//ACTION CREATORS

const getEvents = events => {
    return { type: GET_EVENTS_SUCCESS, events }
}

//THUNK CREATORS

export const getAllEventsThunk = () => dispatch => {
    firebase.database().ref('/events')
    .on('value', snapshot => {
        let allEvents = snapshot.val() || {};
        allEvents = Object.keys(allEvents).map((eventId) => {
            return allEvents[eventId];
        });
        dispatch(getEvents(allEvents));
        
    })
}

//REDUCER

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS_SUCCESS:
            return action.events
        default:
            return state;
    }
}