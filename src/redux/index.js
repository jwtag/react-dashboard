import { combineReducers } from 'redux';

/* ------------- Assemble The Reducers ------------- */
export default combineReducers({
	nav: require('./navRedux').reducer,
	api: require('./apiRedux').reducer,
});
