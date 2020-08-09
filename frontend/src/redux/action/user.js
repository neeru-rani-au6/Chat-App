import { LOGIN, LOGOUT, REGISTER, ALLUSER } from '../type';
import axios from 'axios';

export const registerUser = (user) => async dispatch => {
    // console.log(user)
    try {
        const { data } = await axios({
            method: "post",
            url: '/users/register',
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                photoURL: user.photoURL
            }

        }
        );
        //console.log(data,"1234")
        dispatch({
            type: REGISTER,
            payload: {
                error: null,
                info: data
            }
        })

    } catch (error) {
        console.log(error.response)
        dispatch({
            type: REGISTER,
            payload: {
                error: error.response.data.message,
                info: null
            }
        })


    }
}

export const loginUser = (user) => async dispatch => {
    try {
        const { data } = await axios({
            method: "post",
            url: `/users/login`,
            data: {
                email: user.email,
                password: user.password
            }
        });
        //console.log(data, "dfhkgj ")
        dispatch({
            type: LOGIN,
            payload: { error: null, user: data, isAuthenticated: true }
        })
    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type: LOGIN,
            payload: {
                error: error.response.data.error,
                info: null,
                isAuthenticated: false,
                user: null
            }
        })

    }
}

export const logout = () => async dispatch => {
    try {
        const { data } = await axios({
            method: "delete",
            url: `/users/logout`
        });
        dispatch({
            type: LOGOUT,
            payload: null
        })
    } catch (error) {
        console.log(error)

    }
}

export const allUser = () => async dispatch => {
    try {
        axios.defaults.withCredentials = true;
        const { data } = await axios(`/users/alluser`)
        dispatch({
            type: ALLUSER,
            payload: { users : data}
        })
        //console.log(data)
    } catch (error) {
        console.log(error)

    }
}