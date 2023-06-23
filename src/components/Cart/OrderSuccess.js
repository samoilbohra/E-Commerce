import { Typography } from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'
import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Metadata from '../layout/Metadata'
import "./OrderSuccess.css"
import { useSelector } from 'react-redux'

const OrderSuccess = () => {
  const navigate = useNavigate();
  const {user , loading , isAuthenticated} = useSelector(state=>state.user)
  useEffect(()=>{
//     if(!isAuthenticated)
//     {
// navigate('/login?redirect=success')
//     }
  

  
  })


  return (
    <Fragment  >
<Metadata pageTitle={"Order Success"}  />
      <div className='orderSuccess'>
        <CheckCircle/>
        <Typography>Your Order Has Been Successfully Placed</Typography>
          <Link to="/orders">MY ORDERS</Link>
      </div>
    </Fragment>
  )
}

export default OrderSuccess
