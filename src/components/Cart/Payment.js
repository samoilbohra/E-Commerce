import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckOutSteps from './CheckOutSteps'
import Metadata from '../layout/Metadata'
import { Typography } from '@material-ui/core'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import { CreditCard, Event, VpnKey } from '@material-ui/icons'
import './Payment.css'
import { clearErrors, createOrder } from '../../actions/orderAction'
import Loader from '../layout/loader/Loader'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@material-ui/core"


const Payment = () => {

    const navigate = useNavigate()
    const alert = useAlert()
    const dispatch = useDispatch();
    const stripe = useStripe()
    const elements = useElements();
    const { isAuthenticated, user, loading } = useSelector(state => state.user)
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
    const { shippingInfo, cartItems } = useSelector(state => state.cart)
    const payBtn = useRef(null)
  const [open, setOpen] = useState(false)

    const { error ,orders , loading : orderLoading} = useSelector(state => state.newOrder)
    const paymentData = orderInfo && {
   amount: Math.round(orderInfo.totalPrice * 100),
    } ;

    const order = orderInfo && {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subTotal,
        taxPrice: orderInfo.taxPrice,
        shippingPrice: orderInfo.shippingPrice,
        totalPrice: orderInfo.totalPrice,

    }

    useEffect(() => {
        if(cartItems.length == 0)
        {  
                if(!isAuthenticated)
            {
        navigate('/login?redirect=cart')
            }
            else {
                console.log("hello 1")
                alert.error("Please Add Items To Cart");
                navigate('/cart')
            }

        }
        else if(JSON.stringify(shippingInfo) == '{}'){

            if(!isAuthenticated)
            {
                console.log("hello 2")

        navigate('/login?redirect=shipping')
            }
            else
            {

                navigate('/shipping')
            }
            
        }
        if(isAuthenticated==false)
        {
        
    navigate('/login?redirect=payment/process')
        }
      
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(orders)
        {
            alert.success("order Placed Succesfully")
            navigate('/success')
        }
    }, [dispatch, alert, error , isAuthenticated,orders])


    const CashOnDeliveryHandler=async(e)=>{
        e.preventDefault();
        order.paymentInfo ={
          id: "jdsjkfh",
            status : "unpaid",
        }
       await dispatch(createOrder(order));
       submitReviewToggle()

 
    }
    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true)
      }

    const submitHandler = async (e) => {
        e.preventDefault()
        payBtn.current.disabled = true;
        try {
            let link = `http://localhost:4000/api/v1/payment/process`
            const config = { headers: { "Content-Type": "application/json" } };
            const { data } = await axios.post(link
                , paymentData,
                { withCredentials: true },
                config,
            )

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.postal_code,
                            country: shippingInfo.country,
                        }
                    }
                }
            })

            if (result.error) {
                payBtn.current.disabled = false;
                alert.error(result.error.message)
            }
            else {
                if (result.paymentIntent.status === "succeeded") {

                    order.paymentInfo ={
                        id: result.paymentIntent.id,
                        status : result.paymentIntent.status,
                    }
                    dispatch(createOrder(order));
                    navigate('/success')
                }
                else {
                    alert.error("There is Some Issue While Processing Payment")
                }
            }

        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
        }

    }

    return (
        <Fragment>
   { orderLoading ? <Loader/>:    ( <Fragment>
            <Metadata pageTitle={"Payment"} />
            <CheckOutSteps activeStep={2} />
            <div className='paymentContainer'>
                <form className='paymentForm' onSubmit={(e) => submitHandler(e)}>
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCard />
                        <CardNumberElement className="paymentInput" />
                    </div>

                    <div>
                        <Event />
                        <CardExpiryElement className="paymentInput" />
                    </div>

                    <div>
                        <VpnKey />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input type='submit'
                        value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className='paymentFormBtn'
                    />

                </form>
                
                <p>or</p>
                
                <input type='submit'
                onClick={submitReviewToggle}
                        value={`Cash On Delivery`}
                        className='cashPaymentFormBtn'
                    />



      <Dialog
      aria-labelledby='simple-dialog-title'
      open={open}
      onClose={submitReviewToggle}
    >
      <DialogTitle>Place Order ? please click OK </DialogTitle>
  
      <DialogActions>
        <Button color='secondary' onClick={submitReviewToggle}>Cancel</Button>
        <Button color='primary' onClick={CashOnDeliveryHandler}>OK</Button>

      </DialogActions>
    </Dialog>
            </div>

        </Fragment>)} 
        </Fragment>
    )
}

export default Payment
