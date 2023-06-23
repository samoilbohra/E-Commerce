import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SideBar from './SideBar.js'
import { Link, useNavigate } from 'react-router-dom'
import "./DashBoard.css"
import { Typography } from '@material-ui/core'
import {Doughnut ,Line} from "react-chartjs-2"
import Chart from 'chart.js/auto';
import { useAlert } from 'react-alert'
import { clearErrors, getAdminProducts } from '../../actions/productAction.js'
import { getAllOrders } from '../../actions/orderAction.js'
import { getAllUsers } from '../../actions/userAction.js'


const DashBoard = () => {
const alert = useAlert()
const dispatch = useDispatch();

  const { error, products, productCount } = useSelector(state => state.products);
  const { error:orderError, orders } = useSelector(state => state.allOrders);
  const { error:allUsersError, users } = useSelector(state => state.allUsers);

    let totalAmount = 0;
   
  orders && orders.forEach((order) => {
  totalAmount += order.totalPrice

});
    
  let outOfStock =0;
  products && products.forEach((item) => {
    if(item.stock==="0") {
      outOfStock+=1;
    }
    
  });
  let inStock = productCount && productCount - outOfStock;

const lineState ={
  labels :["Initial Amount" , "Amount Earned"],
 datasets:[
  {
  label :"Total Amount",
  backgroundColor:["tomato"],
  hoverBackgroundColor : ["rgb(197,72,49)"],
  data:[0,totalAmount],
 },
],
}

const doughnutState ={
  labels :["Out of Stock" , "In Stock"],
  datasets:[
   {
   backgroundColor:["#00A6B4" , "#6800B4"],
   hoverBackgroundColor : ["#4B5000" , "#35014F"],
   data:[outOfStock,inStock],
  },
 ],
}


    const navigate = useNavigate()
    

    useEffect(() => {
     
   
      if(error)
      {
        alert.error(error)
        dispatch(clearErrors())
      }
      if(allUsersError)
      {
        alert.error(allUsersError)
        dispatch(clearErrors())
      }
      if(orderError)
      {
        alert.error(error)
        dispatch(clearErrors())
      }
      dispatch(getAdminProducts());
      dispatch(getAllOrders())
      dispatch(getAllUsers())
  
    }, [dispatch , alert , error]);
  
  return (
    <div className='dashBoard'>
      <SideBar/>

      <div className='dashBoardContainer'>
      <Typography  component="h1">DashBoard</Typography>
      <div className='dashBoardSummary'>
      <div>
        <p>Total Amount :   <br/> {totalAmount}</p>
      </div>
<div className='dashBoardSummaryBox2'>
  <Link to="/admin/products" >
    <p>Product</p>
    <p>{productCount && productCount}</p>
  </Link>
  <Link to="/admin/orders" >
    <p>Orders</p>
    <p>{orders && orders.length}</p>
  </Link>
  <Link to="/admin/users" >
    <p>users</p>
    <p>{users && users.length}</p>
  </Link>
</div>
      </div>
<div className='lineChart'>
<Line  
  data={lineState}
/>

</div>
<div className='doughnutChart'>
<Doughnut
  data={doughnutState}
/>

</div>
      </div>
    </div>
  )
}

export default DashBoard
