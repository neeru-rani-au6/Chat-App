import { REGISTER, LOGOUT, LOGIN, ALLUSER, FORGOTPASSWORD, CHANGEPASSWORD } from '../type';

const initalstate = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    isAuthenticated: localStorage.getItem("isAuth") || false,
    info: null,
    error: null,
    users: null,
    useremail: null
}

const userReducer = (state = initalstate, action) => {
    const { type, payload } = action;
    //console.log(payload)
    switch (type) {
        case REGISTER:
            const newState = Object.assign(state, payload);
            return newState;
        // return {
        //     ...state, info: payload.info, error: payload.error
        // }
        case LOGIN:
            if (payload.user) {
                localStorage.setItem('user', JSON.stringify(payload.user));
                localStorage.setItem('isAuth', true);
            }
            return Object.assign(state, payload);
        case LOGOUT:
            localStorage.removeItem("user")
            localStorage.removeItem("isAuth")
            return { ...state, user: null, isAuthenticated: false }
        case ALLUSER:
            return Object.assign(state, payload);
        case FORGOTPASSWORD:
            const newState1 = Object.assign(state, payload)
            // console.log(newState1)
            return newState1
        case CHANGEPASSWORD:
            if (payload.user) {
                localStorage.setItem('user', JSON.stringify(payload.user));
            }
            return Object.assign(state, payload);
        default:
            return state;
    }

}


export default userReducer;