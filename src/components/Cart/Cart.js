import React, { Fragment, useEffect } from 'react'
import './Cart.css'
import CartItem from './CartItem.js'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { addItemsToCart, removeItemFromCart } from '../../actions/cartAction'
import {Link, useNavigate} from "react-router-dom"
import {Typography} from '@material-ui/core'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'




const Cart = () => {
  const navigate = useNavigate()
  const alert= useAlert()
const  dispatch =  useDispatch();
const {isAuthenticated ,user , loading} =useSelector(state=>state.user)
const {cartItems } = useSelector(state=>state.cart)
let grossTotal =0 ;

const increaseQuantity=(id , quantity , stock)=>{
const newQty = quantity+1;
if(newQty>stock)
{ 
  alert.error("Out Of Stock")
  return;
}
dispatch(addItemsToCart(id , newQty));
}


 
const CheckOutHandler = ()=>{
navigate('/login?redirect=shipping')
}

const decreaseQuantity=(id , quantity , stock)=>{
const newQty = quantity-1;
if(newQty==0)
{ 
  dispatch(removeItemFromCart(id));
  return;
}
dispatch(addItemsToCart(id , newQty));
}

  return (
  <Fragment>{
  
cartItems.length === 0 ? (
  <div  className='EmptyCart'>  
<RemoveShoppingCartIcon/>
  <Typography >"No Items in Cart" </Typography>
  <Link to={`/products` }>View Products</Link>
  </div>
    ):
    <Fragment>
      <div className="cartPage">  
        <div className='cartHeader'>
          <p>Product</p>
          <p>Quantity</p>
          <p>SubTotal</p>
        </div>

        {cartItems && cartItems.map((item)=>(
          <div key={item.product} className='cartContainer'>
          <CartItem item={item} />
          <div className='cartInput'>
            <button onClick={()=>{decreaseQuantity(item.product , item.quantity , item.stock)}} >-</button>
            <input value={item.quantity} readOnly type='Number' />
            <button onClick={()=>{increaseQuantity(item.product , item.quantity , item.stock)}} >+</button>
          </div>
          <p className='cartSubTotal'>{`₹${item.price * item.quantity}`}</p>
        </div>
        ))}
       
        
      

  {  <div className='cartGrossTotal'>
          <div></div>
          <div className='cartGrossTotalBox'>
            <p>Gross Total</p>
            <p>{`₹${cartItems.reduce((acc,item)=>acc+item.quantity*item.price ,0)}`}</p>

          </div>
          <div></div>
          <div className='checkOutBtn'>
            <button onClick={CheckOutHandler}>CheckOut</button>
          </div>
        </div>}

      </div>

    </Fragment>
    }
    </Fragment>  
  )
}

export default Cart
