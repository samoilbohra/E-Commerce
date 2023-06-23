import React, { Fragment, useEffect } from 'react'
import Metadata from '../layout/Metadata'
import "./ConfirmOrder.css"
import { Link, useNavigate } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import CheckOutSteps from './CheckOutSteps'

const ConfirmOrder = () => {
    const alert = useAlert()
    const navigate = useNavigate()
    const {shippingInfo , cartItems} = useSelector((state) => state.cart);
    const {isAuthenticated , user , loading } = useSelector(state =>state.user);
    const subTotal= cartItems.reduce((acc,item)=>acc+item.quantity*item.price ,0);
    const shippingCharges = subTotal>1000 ? 0 : 70;
    const taxPrice = 0 ;
    const totalPrice = subTotal + shippingCharges + taxPrice;
    const address= `${shippingInfo.address} , ${shippingInfo.city} , ${shippingInfo.state} , ${shippingInfo.pinCode} , ${shippingInfo.state} , ${shippingInfo.country}` 


    useEffect(()=>{
        
    //    if(!isAuthenticated)
    //         {
    //     navigate('/login?redirect=order/confirm')
    //         }
       if(cartItems.length == 0)
        {  
                if(!isAuthenticated)
            {
        navigate('/login?redirect=cart')
            }
            else {
                alert.error("Please Add Items To Cart");
                navigate('/cart')
            }

        }
        else if(JSON.stringify(shippingInfo) == '{}'){

            if(!isAuthenticated)
            {
        navigate('/login?redirect=shipping')
            }
            else
            {

                navigate('/shipping')
            }
            
        }


        if(isAuthenticated==false)
        {
    navigate('/login?redirect=order/confirm')
        }
         
    })
    const ProceedToPayment =()=>{
        const data = {
            subTotal,
            shippingCharges,
            taxPrice ,
            totalPrice 
        }
    sessionStorage.setItem('orderInfo' , JSON.stringify(data));
    navigate('/process/payment');
    }

  return (
    <Fragment>
      <Metadata pageTitle={"Confirm Order"}/>
      <CheckOutSteps activeStep={1}/>
      <div className='confirmOrderPage'>
         <div>
<div className='confirmshippingArea'>
<Typography >Shipping Info</Typography>
<div className='confirmshippingAreaBox'>
<div>
    <p>Name</p>
    <span>{user && user.name}</span>
</div>
<div>
    <p>Phone:</p>
    <span>{shippingInfo.phoneNo}</span>
</div>
<div>
    <p>Address:</p>
    <span>{address}</span>
</div>
</div>
</div>
<div className='confirmCartItems'>
    <Typography>Your Cart Items:</Typography>
    <div className='confirmCartItemsContainer'>
        {cartItems && cartItems.map((item)=>(
            <div key={item.product}>
            <img src={item.image} alt="Product" />
            <Link to={`/product/${item.product}`}>{item.name}</Link>
            <span>
                {item.quantity} x  ₹{item.price} = {" "}
                <b>₹{item.quantity*item.price}</b>
            </span>

            </div>
        ))}
    </div>
</div>
         </div>
         {/*  */}
         <div>
         <div className='orderSummary'>
         <Typography>Order Summary</Typography>
         <div>
            <div>
                <p>Sub Total:</p>
                <span>₹{subTotal}</span>
            </div>
            <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
            </div>
            <div>
                <p>GST:</p>
                <span>₹{taxPrice}</span>
            </div>
         </div>
<div className='orderSummaryTotal'>
<p><b>Total</b></p>
<span>₹{totalPrice}</span>

</div>
<button onClick={ProceedToPayment}>Proceed To Payment</button>
         </div>
      </div>
      </div>
    </Fragment>
  )
}

export default ConfirmOrder
