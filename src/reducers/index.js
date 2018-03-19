import { combineReducers } from 'redux';
import post from './post';
import auth from './auth';
import events from './events';
import organizations from './organizations';

export default combineReducers({
    post,
    auth,
    events,
    organizations
})