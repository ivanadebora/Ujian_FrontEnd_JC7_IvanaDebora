import { 
    AUTH_LOADING,
    AUTH_SYSTEM_ERROR,
    USER_LOGIN_SUCCESS,
    COOKIE_CHECKED,
    USER_LOGOUT,
    ADD_CART
 } from '../actions/types';


const INITIAL_STATE = {username: '', email: '', password: '', error: '', loading: false, cookie:false, jumlahCart: 0};


export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case USER_LOGIN_SUCCESS :
            return {...INITIAL_STATE, ...action.payload, cookie: true};
        case AUTH_SYSTEM_ERROR :
            return {...INITIAL_STATE, error: action.payload, cookie: true};
        case AUTH_LOADING :
            return {...INITIAL_STATE, loading: true, cookie: true};
        case COOKIE_CHECKED :
            return {...INITIAL_STATE, cookie: true};
        case USER_LOGOUT :
            return {...INITIAL_STATE, cookie:true};
        case ADD_CART:
            return{...state , jumlahCart : action.payload}
        default:
            return state;
    }
}