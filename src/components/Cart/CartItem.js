import React from 'react'
import {Link, useNavigate} from "react-router-dom"
import "./CartItem.css"
import { useDispatch } from 'react-redux'
import { removeItemFromCart } from '../../actions/cartAction'





const CartItem = ({item}) => {
  const navigate = useNavigate();
  const  dispatch =  useDispatch();

  const removeFromCart =(id)=>{
dispatch(removeItemFromCart(id));
  }
  const handleClick =(id)=>{
navigate(`/product/${item.product}`);
  }
  
  return (
    <div className='CartItemCard'>
    <img onClick={handleClick} src={item.image } alt = "x"/>
    <div>
      <Link to={`/product/${item.product}`   }>{item.name}</Link>
      <span>{`Price : ₹${item.price}`}</span>
      <p onClick={()=>{removeFromCart(item.product)}} >Remove </p>
    </div>
      
    </div>
  )
}

export default CartItem
