import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { clearErrors, getOrderDetails, } from '../../actions/orderAction'
import { Typography } from '@material-ui/core'
import Loader from '../layout/loader/Loader'
import MetaData from "../layout/Metadata"
import "./OrderDetails.css"

const OrderDetails = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const alert = useAlert()
  const { user, isAuthenticated } = useSelector(state => state.user)
  const { error, loading, order } = useSelector(state => state.orderDetails)
  const { id } = useParams();




  useEffect(() => {

    // if (isAuthenticated==false) {
    //   navigate(`/login?redirect=order/${id}`)
    // }

    if (error) {
      alert.error(error)
      dispatch(clearErrors())
      navigate("/orders")
    }
    dispatch(getOrderDetails(id))

  }, [dispatch, error, alert , isAuthenticated])




  return (
    <Fragment>
      <MetaData pageTitle={"Order Details's"} />
      {
        JSON.stringify(order) == "{}" || loading ? <Loader /> : (
          <div className='orderDetailsPage'>
            <div className='orderDetailsContainer'>
              <Typography component="h1" >Order : {order && order._id}</Typography>

              <Typography >Shipping Info</Typography>
              <div className='orderDetailsContainerBox'>
                <div>
                  <p>Name : </p>
                  <span>{user && user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>{order && order.shippingInfo.phoneNo}</span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>{order && order.shippingInfo.address} ,{order&& order.shippingInfo.city} , {order && order.shippingInfo.state} , {order && order.shippingInfo.pinCode} , {order && order.shippingInfo.country}   </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className='orderDetailsContainerBox'>
                <div>
                  <p className={order && order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"}>{order && order.paymentInfo.status === "succeeded" ? "Paid" : "Not Paid"}</p>
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

            <div className='orderDetailsCartItems'>
              <Typography>Order Items:</Typography>
              <div className='orderDetailsCartItemsContainer'>
                {order && order.orderItems.map((item) => (
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
        )
      }
    </Fragment>
  )
}

export default OrderDetails
