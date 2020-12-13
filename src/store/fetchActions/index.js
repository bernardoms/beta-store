import api from '../../services/api'
import { addProduct, getProducts } from '../ducks/products'
import { login } from '../ducks/auth'
import jwt from 'jwt-decode' // import dependency

export const getAllProducts = () => {
    return dispatch => {
        api
            .get('/v1/products')
            .then(resp => {
                dispatch(getProducts(resp.data.content))
            }).catch((e) => {
                console.log(e)
            })
    }
}

export const addProductFetch = (product) => {
    return dispatch => {
        api.post('/v1/products', product, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(()=> dispatch(addProduct()))
        .catch((e) => {
            console.log(e)
        })
    }
}

export const authUserFetch = (user) => {
    return dispatch => {
        api.post('/v1/users/auth', user)
        .then(res => {
            localStorage.setItem('token', res.data);
            dispatch(login())
            if(jwt(res.data).role === 'ROLE_ADMIN') {
                window.location.pathname = '/add';
            } else {
                window.location.pathname = '/list';
            }
        })
        .catch((e) => {
            console.log(e)
        })
    }
}

export const validateToken = (token) => {
    return dispatch => {
        api.post('/v1/users/token/validate', '', {
            headers: {
                "token" : token
            }
        })
        .catch((e) => {
            localStorage.removeItem('token')
            console.log("Unauthorized access")
            window.location.pathname = '/list';
        })
    }
}