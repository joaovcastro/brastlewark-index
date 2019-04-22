import gnomesReducer from './gnomesReducer';
import gnomeInfoReducer from './gnomeInfoReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  gnomesReducer,
  gnomeInfoReducer,
});
