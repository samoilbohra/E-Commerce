import axios from "axios";
import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CLEAR_ERRORS, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, MY_ORDERS_FAIL,ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,ORDER_DETAILS_REQUEST, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, ALL_ORDERS_FAIL, UPDATE_ORDERS_REQUEST, UPDATE_ORDERS_SUCCESS, UPDATE_ORDERS_FAIL, DELETE_ORDERS_REQUEST, DELETE_ORDERS_SUCCESS, DELETE_ORDERS_FAIL } from "../constants/orderConstants";


// Create Order
export const createOrder = (order) => async (dispatch ) => {
    try {
        dispatch({
            type: CREATE_ORDER_REQUEST,
        })
        let link = `http://localhost:4000/api/v1/order/new`

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(link, order, { withCredentials: true }, config,)
        dispatch
            ({
                type: CREATE_ORDER_SUCCESS,
                payload: data
            })
            localStorage.removeItem("cartItems" )
            sessionStorage.removeItem("orderInfo")




    }
    catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}



// Update Order Status -Admin
export const updateOrderStatus = (id,orderStatus , paymentStatus) => async (dispatch ) => {
    try {
        dispatch({
            type: UPDATE_ORDERS_REQUEST,
        })
        let link = `http://localhost:4000/api/v1/admin/order/${id}`
        
        let order = {};
      
        if(orderStatus)
        {
             order = {
                status : orderStatus
                
            }
        }
        if(paymentStatus )
        {
             order = {
                paymentStatus : paymentStatus
                
            } 
        }
        
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(link, order, { withCredentials: true }, config,)
        dispatch
            ({
                type: UPDATE_ORDERS_SUCCESS,
                payload: data.success
            })
           


    }
    catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete Order -Admin
export const deleteOrder = (id) => async (dispatch ) => {
    try {
        dispatch({
            type: DELETE_ORDERS_REQUEST,
        })
        let link = `http://localhost:4000/api/v1/admin/order/${id}`

        const { data } = await axios.delete(link,{ withCredentials: true })
        dispatch
            ({
                type: DELETE_ORDERS_SUCCESS,
                payload: data.success
            })
           


    }
    catch (error) {
        dispatch({
            type: DELETE_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}



// My Orders
export const myOrders = () => async (dispatch ) => {
    try {
        dispatch({
            type: MY_ORDERS_REQUEST,
        })
        let link = `http://localhost:4000/api/v1/orders/me`

        const { data } = await axios.get(link,  { withCredentials: true },)
        dispatch
            ({
                type: MY_ORDERS_SUCCESS,
                payload: data.orders
            })
          



    }
    catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}


// ALL Orders -Admin
export const getAllOrders = () => async (dispatch ) => {
    try {
        dispatch({
            type: ALL_ORDERS_REQUEST,
        })
        let link = `http://localhost:4000/api/v1/admin/orders`

        const { data } = await axios.get(link,  { withCredentials: true },)
        dispatch
            ({
                type: ALL_ORDERS_SUCCESS,
                payload: data.orders
            })
          



    }
    catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}




// orderDetails -User
export const getOrderDetails = (id) => async (dispatch ) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        })
        let link = `http://localhost:4000/api/v1/order/${id}` ;
        const { data } = await axios.get(link,  { withCredentials: true },)
        dispatch
            ({
                type: ORDER_DETAILS_SUCCESS,
                payload: data.order
            })
          



    }
    catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// orderDetails of every User - Admin
export const getOrderDetailsAdmin = (id) => async (dispatch ) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        })
        let link = `http://localhost:4000/api/v1/admin/order/${id}` ;
        const { data } = await axios.get(link,  { withCredentials: true },)
        dispatch
            ({
                type: ORDER_DETAILS_SUCCESS,
                payload: data.order
                
            })
          



    }
    catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
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
