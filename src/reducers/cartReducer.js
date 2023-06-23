import { ADD_TO_CART  , REMOVE_CART_ITEM, SAVE_SHIPPPING_INFO} from "../constants/cartConstants";
export const cartReducer = (state = { cartItems: [],shippingInfo:{} }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExist = state.cartItems.find((i) => i.product === item.product);   //Finding if product already exists in cart
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.product === isItemExist.product ? item : i
                    ),
                }

            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
            case REMOVE_CART_ITEM:
             const item_id = action.payload;
                return{
                    ...state,
                    cartItems : state.cartItems.filter((i) =>
                    i.product !== item_id
                ),
                };
            
            case SAVE_SHIPPPING_INFO : 
                return{
                    ...state,
                    shippingInfo : action.payload
                }
        default:
            return state;
    }


}