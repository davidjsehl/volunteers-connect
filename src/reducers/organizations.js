import firebase from 'firebase';


//ACTION TYPES

const GET_ORGANIZATIONS_SUCCESS = 'GET_ORGANIZATIONS_SUCCESS';


//INITIAL STATE

const initialState = []

//ACTION CREATORS

const getOrganizations = organizations => {
    return { type: GET_ORGANIZATIONS_SUCCESS, organizations }
}

//THUNK CREATORS 

export const getAllOrganizationsThunk = () => dispatch => {
    firebase.database().ref('/organizations')
    .on('value', snapshot => {
        let allOrgs = snapshot.val()
        allOrgs = Object.keys(allOrgs).map(orgId => {
            return allOrgs[orgId];
        });
        dispatch(getOrganizations(allOrgs));
    })
}


//REDUCER

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ORGANIZATIONS_SUCCESS:
            return action.organizations;
        default:
            return state;
    }
}