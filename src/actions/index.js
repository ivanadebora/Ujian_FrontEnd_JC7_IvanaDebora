import axios from 'axios';
import {
    AUTH_LOADING,
    AUTH_SYSTEM_ERROR,
    USER_LOGIN_SUCCESS,
    COOKIE_CHECKED,
    USER_LOGOUT,
    SELECT_PRODUCT,
    ADD_CART
} from './types';
import {API_URL} from '../supports/api-url/api-url';


export const addToCart = () => {
    return{
        type: ADD_CART
    }
}


export const select_product = (selectedProduct) => {
    return {
        type: SELECT_PRODUCT,
        payload: selectedProduct
    }
}

export const onUserLogout = () => {
    return {
        type: USER_LOGOUT
    }
}
export const keepLogin = (username) => {
    return (dispatch) => {
        axios.get(API_URL+'/users', {
            params: {
                username
            }
        })
        .then((res) => {
            if (res.data.length > 0) {
                dispatch ({
                    type: USER_LOGIN_SUCCESS,
                    payload: {email: res.data[0].email, username}
                })
            }
        })
    }
}

export const cookieChecked = () => {
    return {
        type: COOKIE_CHECKED
    }
}

export const onUserLogin = ({
    username,
    password
    }) => {
        return (dispatch) => {
            dispatch({
             type: AUTH_LOADING
            })
            loginStart (dispatch, username, password)
        }
    }

var loginStart = (dispatch, username, password) => {
    axios.get(API_URL+'/users', {
    params: {
        username,
        password
    }
})
.then((res) => {
    console.log(res)
    if (res.data.length > 0) {
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: { email: res.data[0].email, username}
        })
    } else {
        dispatch({
            type: AUTH_SYSTEM_ERROR,
            payload: 'Username or password invalid'
        })
    }
})
.catch((err) => {
    console.log(err)
    dispatch({
        type: AUTH_SYSTEM_ERROR,
        payload: 'System Error'
    })
})
}


export const onUserRegister = ({
    username,
    email,
    password
}) => {
    return (dispatch) => {
        dispatch({
            type: AUTH_LOADING
        })
        if (username === '' || email === '' || password === '') {
            dispatch({
                type: AUTH_SYSTEM_ERROR,
                payload: 'Semua form di atas wajib diisi!'
            })
        } else {
            axios.get(API_URL+'/users', {
                    params: {
                        username
                    }
                })
                .then((res) => {
                    if (res.data.length === 0) {
                        axios.post( API_URL + '/users', {
                                username,
                                email,
                                password
                            })
                            .then((res) => {
                                console.log(res);
                                dispatch({
                                    type: USER_LOGIN_SUCCESS,
                                    payload: res.data.username
                                })
                            })
                            .catch((err) => {
                                console.log(err)
                                dispatch({
                                    type: AUTH_SYSTEM_ERROR,
                                    payload: 'System Error'
                                })
                            })
                    } else {
                        dispatch({
                            type: AUTH_SYSTEM_ERROR,
                            payload: 'Username has been taken'
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                    dispatch({
                        type: AUTH_SYSTEM_ERROR,
                        payload: 'System Error'
                    })
                })
        }
    }
}