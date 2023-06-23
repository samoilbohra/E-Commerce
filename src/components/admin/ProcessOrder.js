import React, { Fragment, useEffect, useState } from 'react'
import Metadata from '../layout/Metadata'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import SideBar from './SideBar'
import { AccountTree, CropDinSharp } from '@material-ui/icons'
import "./ProcessOrder.css"


import { useAlert } from 'react-alert'
import { clearErrors, getOrderDetails, getOrderDetailsAdmin, updateOrderStatus } from '../../actions/orderAction'
import Loader from '../layout/loader/Loader'
import { UPDATE_ORDERS_RESET } from '../../constants/orderConstants'

const ProcessOrder = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { id } = useParams()
    const navigate = useNavigate()
    const { error, loading, order } = useSelector(state => state.orderDetails)
    const { isUpdated, error: updateError, } = useSelector(state => state.deleteAndUpdateOrders)
    const [status, setStatus] = useState("")
    const [paymentStatus   ,setPaymentStatus] = useState("")


    useEffect(() => {


        if (updateError) {
            alert.error(error)
            dispatch(clearErrors())
        }


        if (error) {
            alert.error(error)
            dispatch(clearErrors())
            navigate("/admin/orders")
        }
        if (isUpdated) {
            alert.success("Order Updated Successfully")
            dispatch({ type: UPDATE_ORDERS_RESET })
        }
        dispatch(getOrderDetailsAdmin(id))


    }, [dispatch, error, alert, updateError, isUpdated])


    const updateOrderStatusSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(updateOrderStatus(id, status , undefined));

    }

    const updatePaymentStatusSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(updateOrderStatus(id, undefined , paymentStatus));

    }
  

    return (

        <Fragment>
            <Metadata pageTitle={"Process Order -Admin "} />
            <div className='dashBoard'>
                <SideBar />
                <div className='newProductContainer'>
                    {loading ? <Loader /> : (
                        <div className='confirmOrderPage'
                            style={{ display: order && order.orderStatus === "Delivered" ? "block" : "grid" }}

                        >
                            <div>
                                <div className='confirmshippingArea'>
                                    <Typography >Shipping Info</Typography>
                                    <div className='orderDetailsContainerBox'>
                                        <div>
                                            <p>Name : </p>
                                            <span>{order && order.user && order.user.name}</span>
                                        </div>
                                        <div>
                                            <p>Phone:</p>
                                            <span>{order && order.shippingInfo && order.shippingInfo.phoneNo}</span>
                                        </div>
                                        <div>
                                            <p>Address:</p>
                                            <span>{order && order.shippingInfo && order.shippingInfo.address} ,{order && order.shippingInfo && order.shippingInfo.city} , {order && order.shippingInfo && order.shippingInfo.state} , {order && order.shippingInfo && order.shippingInfo.pinCode} , {order && order.shippingInfo && order.shippingInfo.country}   </span>
                                        </div>
                                    </div>




                                    <Typography>Payment</Typography>
                                    <div className='orderDetailsContainerBox'>
                                        <div>
                                            <p className={order && order.paymentInfo && order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"}>{order && order.paymentInfo && order.paymentInfo.status === "succeeded" ? "Paid" : "Not Paid"}</p>
                                        </div>
                                        <div>
                                            <p>Total Amount</p>
                                            <span>₹{order && order.totalPrice}  </span>
                                        </div>
                                        <div>
                                            <p>Items Amount</p>
                                            <span>₹{order && order.itemsPrice}  </span>
                                        </div>
                                        <div>
                                            <p>tax Amount</p>
                                            <span>₹{order && order.taxPrice}  </span>
                                        </div>
                                    </div>
                                    <Typography>Order Status</Typography>
                                    <div className='orderDetailsContainerBox'>
                                        <div>
                                            <p className={order && order.orderStatus === "Delivered" ? "greenColor" : "redColor"}>
                                                {order && order.orderStatus}
                                            </p>
                                        </div>
                                    </div>







                                </div>
                                <div className='confirmCartItems'>
                                    <Typography>Your Cart Items:</Typography>
                                    <div className='confirmCartItemsContainer'>
                                        {order && order.orderItems && order.orderItems.map((item) => (
                                            <div key={item.product}>
                                                <img src={item.image} alt="Product" />
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                <span>
                                                    {item.quantity} x  ₹{item.price} = {" "}
                                                    <b>₹{item.quantity * item.price}</b>
                                                </span>

                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                            <div
                                style={{ display: order && order.orderStatus === "Delivered"  && order && order.paymentInfo && order.paymentInfo.status === "succeeded"? "none" : "block" }}
                            >
                                <form className='updateOrderForm'
                                    encType='multipart/form-data'
                                    onSubmit={updateOrderStatusSubmitHandler}
                                    style={{ display: order && order.orderStatus === "Delivered" ? "none" : "block" }}
                                    >
                                    <h1> Update Order Status</h1>

                                    <div>
                                        <AccountTree />
                                        <select value={status} onChange={(e) => { setStatus(e.target.value) }} >
                                            <option value=""> Choose Category</option>
                                            {order && order.orderStatus == "processing" && (<option value="Shipped"> Shipped</option>)}
                                            {(order && order.orderStatus == "Shipped") && (<option value="Delivered"> Delivered</option>)}

                                        </select>
                                    </div>



                                    <Button
                                        id='createProductButton'
                                        type='submit'
                                        disabled={loading ? true : false || status == "" ? true : false}
                                    >Update Status</Button>

                                </form>
                                <form className='updateOrderForm'
                                    encType='multipart/form-data'
                                    onSubmit={updatePaymentStatusSubmitHandler}
                                    style={{ display: order && order.paymentInfo && order.paymentInfo.status === "succeeded"? "none" : "block" }}>
                                    <h1> Update Payment Status</h1>

                                    <div>
                                        <AccountTree />
                                        <select value={paymentStatus} onChange={(e) => { setPaymentStatus(e.target.value) }} >
                                            <option value=""> Choose Category</option>
                                            {order && order.paymentInfo &&  order.paymentInfo.status != "succeeded" && (<option value="succeeded"> Paid</option>)}


                                        </select>
                                    </div>



                                    <Button
                                        id='createProductButton'
                                        type='submit'
                                        disabled={loading ? true : false || paymentStatus == "" ? true : false}
                                    >Update Payment Status</Button>

                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </Fragment>

    )
}



export default ProcessOrder
