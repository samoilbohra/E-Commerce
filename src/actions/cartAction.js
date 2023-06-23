import { PRODUCT_DETAIL_FAIL } from "../constants/ProductConstants";
import { ADD_TO_CART  , REMOVE_CART_ITEM , SAVE_SHIPPPING_INFO} from "../constants/cartConstants";
import axios from "axios";


// ADD item to Cart

export const addItemsToCart = (id, quantity) => async (dispatch ,getState) => {
 
       
        let link = `http://localhost:4000/api/v1/product/${id}`

    
        const {data} =    await axios.get(link);
        dispatch
            ({
                type: ADD_TO_CART,
                payload: {
                 product:   data.product._id,
                 name : data.product.name,
                 price : data.product.price,
                 image : data.product.img[0].url,
                 stock : data.product.stock,
                 quantity 

                },
            })
            localStorage.setItem("cartItems" , JSON.stringify(getState().cart.cartItems))
    
   
};

// Remove Item from Cart
export const removeItemFromCart = (id) => async (dispatch ,getState) => {
 
       
    
    dispatch
        ({
            type: REMOVE_CART_ITEM,
            payload: id,
        })
        localStorage.setItem("cartItems" , JSON.stringify(getState().cart.cartItems))


};



// Remove Item from Cart
export const saveShippingInfo = (data) => async (dispatch ) => {
 
       
    
    dispatch
        ({
            type: SAVE_SHIPPPING_INFO,
            payload: data,
        })
        localStorage.setItem("shippingInfo" , JSON.stringify(data))


};