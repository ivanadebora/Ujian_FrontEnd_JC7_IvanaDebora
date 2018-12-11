import { combineReducers } from 'redux';
import authReducers from './authReducers';
import SelectProductReducers from './SelectProductReducers';


export default combineReducers({
    auth: authReducers,
    selectedProduct: SelectProductReducers
})