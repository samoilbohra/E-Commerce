import axios from "axios"

// const instance = axios.create({
//     withCredentials: true
//   })

import {
    LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, CLEAR_ERRORS, REGISTER_USER_FAIL, REGISTER_USER_SUCCESS, REGISTER_USER_REQUEST
    , LOAD_USER_FAIL, LOAD_USER_SUCCESS, LOAD_USER_REQUEST, LOGOUT_USER_FAIL, LOGOUT_USER_SUCCESS, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_RESET, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_RESET, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, ALL_USERS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_RESET, DELETE_USER_REQUEST, DELETE_USER_FAIL, DELETE_USER_RESET, DELETE_USER_SUCCESS
} from "../constants/UserConstants"


// Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST,
        })
        let link = `http://localhost:4000/api/v1/login`

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(link
            , { email, password },
            { withCredentials: true },
            { headers: { 'Content-Type': 'application/json' } },
        )


        dispatch
            ({
                type: LOGIN_SUCCESS,
                payload: data
            })
    }
    catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })

    }
};


// Register
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_USER_REQUEST,
        })
        let link = `http://localhost:4000/api/v1/register`

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post(link
            , userData,
            { withCredentials: true },
            config,
        )





        dispatch
            ({
                type: REGISTER_USER_SUCCESS,
                payload: data
            })
    }
    catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })

    }
}




// Load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: LOAD_USER_REQUEST,
        })

        const { data } = await axios.get(`http://localhost:4000/api/v1/me`, { withCredentials: true },)
        dispatch({ type: LOAD_USER_SUCCESS, payload: data })

    }
    catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })

    }
};



// Logout
export const logout = () => async (dispatch) => {
    try {

        let link = `http://localhost:4000/api/v1/logout`

        await axios.get(link, { withCredentials: true })


        dispatch
            ({
                type: LOGOUT_USER_SUCCESS,

            })
    }
    catch (error) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error.response.data.message
        })

    }
};



// Profile Update
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_PROFILE_REQUEST,
        })
        let link = `http://localhost:4000/api/v1/me/update`

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.put(link
            , userData,
            { withCredentials: true },
            config,
        )

        dispatch
            ({
                type: UPDATE_PROFILE_SUCCESS,
                payload: data
            })
    }
    catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })

    }
}

// Update Password
export const updatePassword = ({ currentPassword, newPassword, confirmNewPassword }) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_PASSWORD_REQUEST,
        })
        let link = `http://localhost:4000/api/v1/password/update`

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(link
            , { currentPassword, newPassword, confirmNewPassword },
            { withCredentials: true },
            config,
        )

        dispatch
            ({
                type: UPDATE_PASSWORD_SUCCESS,
                payload: data
            })
    }
    catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })

    }
}

// forgot Password
export const forgotPassword = ({ email }) => async (dispatch) => {
    try {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST,
        })
        console.log(email)
        let link = `http://localhost:4000/api/v1/password/forgot`

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(link
            , { email },
            { withCredentials: true },
            config,
        )

        dispatch
            ({
                type: FORGOT_PASSWORD_SUCCESS,
                payload: data
            })
    }
    catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })

    }
}


// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({
            type: RESET_PASSWORD_REQUEST,
        })
        let link = `http://localhost:4000/api/v1/password/reset/${token}`

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(link
            , passwords,
            { withCredentials: true },
            config,
        )

        dispatch
            ({
                type: RESET_PASSWORD_SUCCESS,
                payload: data
            })
    }
    catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message
        })

    }
}



// All Users - Admin 
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_USERS_REQUEST,
        })

        const { data } = await axios.get(`http://localhost:4000/api/v1/admin/users`, { withCredentials: true },)
        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users })

    }
    catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })

    }
};

//  Users Details - Admin 
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        })

        const { data } = await axios.get(`http://localhost:4000/api/v1/admin/user/${id}`, { withCredentials: true },)
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user })

    }
    catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message
        })

    }
};


// Update USER DETAILS - ADMIN
export const updateUserDetails = (id, role) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_USER_REQUEST,
        })
        const userData = {
            role: role
        }
        let link = `http://localhost:4000/api/v1/admin/user/${id}`

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(link
            , userData,
            { withCredentials: true },
            config,
        )

        dispatch
            ({
                type: UPDATE_PASSWORD_SUCCESS,
                payload: data.success
            })
    }
    catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        })

    }
}


// DELETE USER  - ADMIN
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_USER_REQUEST,
        })
      
        let link = `http://localhost:4000/api/v1/admin/user/${id}`
        console.log(id)
        const { data } = await axios.delete(link,
            { withCredentials: true },
        )

        console.log(data)
        dispatch
            ({
                type: DELETE_USER_SUCCESS,
                payload: data.success
            })
    }
    catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message
        })

    }
}



// clearing errors 
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,

    })

}
