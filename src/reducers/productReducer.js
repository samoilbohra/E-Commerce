import { Adb } from "@material-ui/icons";
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_RESET, ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_RESET, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_RESET, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_RESET, UPDATE_PRODUCT_SUCCESS, ALL_REVIEWS_REQUEST, ALL_REVIEWS_SUCCESS, ALL_REVIEWS_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_RESET, GET_ALL_CATEGORY_FAIL, GET_ALL_CATEGORY_REQUEST, GET_ALL_CATEGORY_SUCCESS, NEW_CATEGORY_REQUEST, NEW_CATEGORY_FAIL, NEW_CATEGORY_SUCCESS, NEW_CATEGORY_RESET, DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAIL, DELETE_CATEGORY_RESET } from "../constants/ProductConstants";

export const productsReducer = (state = { products: [] }, action) => {

    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return ({
                loading: true,
                products : []
            });

        case ALL_PRODUCT_SUCCESS:
            return ({
                loading: false,
                products: action.payload.products,
                productCount: action.payload.productCount,
                resultPerPage : action.payload.resultPerPage ,
                filteredProductCount : action.payload.filteredProductCount,
                success : true
            });
        case ADMIN_PRODUCT_SUCCESS:
            return ({
                loading: false,
                products: action.payload.products,
                productCount: action.payload.totalProducts,
                
        
            });

        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return ({
                loading: false,
                error: action.payload
            });

        case CLEAR_ERRORS:
            return ({
                ...state,
                error: null,
            })

        default:
            return state;
    }
};

export const productDetailsReducer = (state = { product: [] }, action) => {

    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return ({
                loading: true,
                ...state,
            });

        case PRODUCT_DETAIL_SUCCESS:
            return ({
                loading: false,
                product: action.payload
            });

        case PRODUCT_DETAIL_FAIL:
            return ({
                loading: false,
                error: action.payload
            });

        case CLEAR_ERRORS:
            return ({
                ...state,
                error: null,
            })

        default:
            return state;
    }
};

export const newReviewReducer = (state = { }, action) => {

    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return ({
                ...state,
                loading: true,
            });

        case NEW_REVIEW_SUCCESS:
            return ({
                loading: false,
                success: action.payload
            });

        case NEW_REVIEW_FAIL:
            return ({
                ...state,
                loading: false,
                error: action.payload
            });
        case NEW_REVIEW_RESET:
            return ({
                ...state,
                loading: false,
                success:false
            });

        case CLEAR_ERRORS:
            return ({
                ...state,
                error: null,
            })

        default:
            return state;
    }
};

export const newProductReducer = (state = { }, action) => {

    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
        case NEW_CATEGORY_REQUEST:
            return ({
                ...state,
                loading: true,
            });

        case NEW_PRODUCT_SUCCESS:
            return ({
                loading: false,
                success: action.payload.success,
                product : action.payload.product
            });
        
            case NEW_CATEGORY_SUCCESS:
                return ({
                    loading: false,
                    success: action.payload.success,
                    category : action.payload.category
                });

        case NEW_PRODUCT_FAIL:
        case NEW_CATEGORY_FAIL:
            return ({
                ...state,
                loading: false,
                error: action.payload
            });
        case NEW_PRODUCT_RESET:
            return ({
                ...state,
                loading: false,
                success:false
            });

        case NEW_CATEGORY_RESET:
            return ({
                ...state,
                loading: false,
                success:false
            });

        case CLEAR_ERRORS:
            return ({
                ...state,
                error: null,
            })

        default:
            return state;
    }
};

export const productReducer = (state = { }, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:        
        case DELETE_CATEGORY_REQUEST:        
            return ({
                ...state,
                loading: true,
            });

        case DELETE_PRODUCT_SUCCESS:
        case DELETE_CATEGORY_SUCCESS:
            return ({
                ...state,
                loading: false,
                isDeleted: action.payload,
       
            });
        case UPDATE_PRODUCT_SUCCESS:
            return ({
                ...state,
                loading: false,
                isUpdated: action.payload,
       
            });

        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
        case DELETE_CATEGORY_FAIL:
            return ({
                ...state,
                loading: false,
                error: action.payload
            });
        case DELETE_PRODUCT_RESET:
        case DELETE_CATEGORY_RESET:
            return ({
                ...state,
                loading: false,
                isDeleted:false
            });
        case UPDATE_PRODUCT_RESET:
            return ({
                ...state,
                loading: false,
                isUpdated:false
            });

        case CLEAR_ERRORS:
            return ({
                ...state,
                error: null,
            })

        default:
            return state;
    }
};



// GET ALL REVIEWS - Admin
export const productReviewsReducer = (state = {reviews: [] }, action) => {

    switch (action.type) {
        case ALL_REVIEWS_REQUEST:
            return ({
                ...state,
                loading: true,
            });

        case ALL_REVIEWS_SUCCESS:
            return ({
                loading: false,
                reviews : action.payload
            });

        case ALL_REVIEWS_FAIL:
            return ({
                ...state,
                loading: false,
                error: action.payload
            });

        case CLEAR_ERRORS:
            return ({
                ...state,
                error: null,
            })

        default:
            return state;
    }
};


// DELETING REVIEW - ADMIN
export const reviewsReducer = (state = { }, action) => {

    switch (action.type) {
        case DELETE_REVIEW_REQUEST:
            return ({
                ...state,
                loading: true,
            });

        case DELETE_REVIEW_SUCCESS:
            return ({
                loading: false,
                isDeleted: action.payload.success,
                reviews: action.payload.reviews
            });

        case DELETE_REVIEW_FAIL:
            return ({
                ...state,
                loading: false,
                error: action.payload
            });
        case DELETE_REVIEW_RESET:
            return ({
                ...state,
                loading: false,
                isDeleted:false
            });

        case CLEAR_ERRORS:
            return ({
                ...state,
                error: null,
            })

        default:
            return state;
    }
};





export const categoryReducer = (state = { categories : [] }, action) => {


    switch (action.type) {
        case GET_ALL_CATEGORY_REQUEST:
            return ({
                loading: true,
                categories : []
            });

        case GET_ALL_CATEGORY_SUCCESS:
            return ({
                loading: false,
                categories: action.payload,
            });


        case GET_ALL_CATEGORY_FAIL:
            return ({
                loading: false,
                error: action.payload
            });

        case CLEAR_ERRORS:
            return ({
                ...state,
                error: null,
            })

        default:
            return state;
    }
};