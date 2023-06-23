import axios from "axios"
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_REQUEST, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, ALL_REVIEWS_REQUEST, ALL_REVIEWS_SUCCESS, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL, ALL_REVIEWS_FAIL, GET_ALL_CATEGORY_REQUEST, GET_ALL_CATEGORY_SUCCESS, GET_ALL_CATEGORY_FAIL, NEW_CATEGORY_REQUEST, NEW_CATEGORY_SUCCESS, NEW_CATEGORY_FAIL, DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAIL } from "../constants/ProductConstants"

// Get All Products 
export const getProduct = (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCT_REQUEST,
        })
        let link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

        if (category) {
            link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`


        }
        const { data } = await axios.get(link);
        dispatch
            ({
                type: ALL_PRODUCT_SUCCESS,
                payload: data
            })
    }
    catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get All Products _-Admin
export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_PRODUCT_REQUEST,
        })
        let link = `http://localhost:4000/api/v1/admin/products`


        const { data } = await axios.get(link, { withCredentials: true });
        dispatch
            ({
                type: ADMIN_PRODUCT_SUCCESS,
                payload: data
            })
    }
    catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get Single Product Detail
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAIL_REQUEST,
        })
        const { data } = await axios.get(`http://localhost:4000/api/v1/product/${id}`);

        dispatch
            ({
                type: PRODUCT_DETAIL_SUCCESS,
                payload: data.product
            })
    }
    catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}


// SUBMIT REVIEW OF PRODUCT 
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_REVIEW_REQUEST,
        })

        let link = `http://localhost:4000/api/v1/review`

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(link
            , reviewData,
            { withCredentials: true },
            config,
        )


        dispatch
            ({
                type: NEW_REVIEW_SUCCESS,
                payload: data.success
            })
    }
    catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}


// CREATE NEW PRODUCT - ADMIN
export const newProduct = (productData) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_PRODUCT_REQUEST,
        })
        let link = `http://localhost:4000/api/v1/admin/product/new`

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(link
            , productData,
            { withCredentials: true },
            config,
        )


        dispatch
            ({
                type: NEW_PRODUCT_SUCCESS,
                payload: data
            })
    }
    catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


// Update PRODUCT - ADMIN
export const updateProduct = (updatedata) => async (dispatch) => {
    try {

        const id = updatedata.id;
        const productData = {
            name: updatedata.name,
            description: updatedata.description,
            price: updatedata.price,
            category: updatedata.category,
            stock: updatedata.stock,
            img: updatedata.images
        }

        dispatch({
            type: UPDATE_PRODUCT_REQUEST,
        })
        let link = `http://localhost:4000/api/v1/admin/product/${id}`

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(link
            , productData,
            { withCredentials: true },
            config,
        )
console.log(data)

        dispatch
            ({
                type: UPDATE_PRODUCT_SUCCESS,
                payload: data.success
            })
    }
    catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


// CREATE NEW PRODUCT - ADMIN
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_PRODUCT_REQUEST,
        })
        let link = `http://localhost:4000/api/v1/admin/product/${id}`

        const { data } = await axios.delete(link, { withCredentials: true },
        )
        dispatch
            ({
                type: DELETE_PRODUCT_SUCCESS,
                payload: data.success
            })
    }
    catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}



//  Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_REVIEWS_REQUEST,
        })

        let link = `http://localhost:4000/api/v1/reviews?productId=${id}`

        const { data } = await axios.get(link,
            { withCredentials: true },
        )


        dispatch
            ({
                type: ALL_REVIEWS_SUCCESS,
                payload: data.reviews
            })
    }
    catch (error) {
        dispatch({
            type: ALL_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}




//  Delete Reviews  of a Product- Admin
export const deleteReviews = (pid , rid) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_REVIEW_REQUEST,
        })

        let link = `http://localhost:4000/api/v1/reviews?productId=${pid}&reviewId=${rid}`

        const { data } = await axios.delete(link,
            { withCredentials: true },
        )


        dispatch
            ({
                type: DELETE_REVIEW_SUCCESS,
                payload: data
            })
    }
    catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
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


// Get All Products 
export const getCategory = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_ALL_CATEGORY_REQUEST,
        })
        let link = `http://localhost:4000/api/v1/categories`

    
        const { data } = await axios.get(link);
        dispatch
            ({
                type:GET_ALL_CATEGORY_SUCCESS,
                payload: data.categories
            })
    }
    catch (error) {
        dispatch({
            type: GET_ALL_CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
}




// CREATE NEW Category - ADMIN
export const newCategory = (category) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_CATEGORY_REQUEST,
        })
        let link = `http://localhost:4000/api/v1/admin/category/new`

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(link
            , category,
            { withCredentials: true },
            config,
        )


        dispatch
            ({
                type: NEW_CATEGORY_SUCCESS,
                payload: data
            })
    }
    catch (error) {
        dispatch({
            type: NEW_CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
}



// DELETE CATEGORY  - ADMIN
export const deleteCategory = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_CATEGORY_REQUEST,
        })
        let link = `http://localhost:4000/api/v1/admin/category/${id}`

        const { data } = await axios.delete(link, { withCredentials: true },
        )
        dispatch
            ({
                type: DELETE_CATEGORY_SUCCESS,
                payload: data.success
            })
    }
    catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
}

