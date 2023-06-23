import React, { Fragment, useEffect } from 'react'
import Metadata from '../layout/Metadata'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, myOrders } from "../../actions/orderAction"
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Launch } from '@material-ui/icons';
import Loader from '../layout/loader/Loader'
import "./MyOrders.css"


const MyOrders = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(state => state.user)
  const { error, loading, orders } = useSelector(state => state.myOrders)
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status", headerName: "Status", minWidth: 150, flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor"
      }
    },
    { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 150, flex: 0.3 },
    { field: "amount", headerName: "Amount", type: "number", minWidth: 270, flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      Sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <Launch />
          </Link>
        )
      }

    },

  ]
  const rows = []

  orders && orders.forEach((order, index) => {
    rows.push({
      itemsQty: order.orderItems.length,
      status: order.orderStatus,
      amount: order.totalPrice,
      id: order._id
    })

  });








  useEffect(() => {
    // if (!isAuthenticated ) {
    //   navigate('/login?redirect=orders')
    // }
    console.log(JSON.stringify(orders))
    
    if(JSON.stringify(orders) === "[]")
    {

      dispatch(myOrders())
    }
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

  }, [dispatch, error, alert , isAuthenticated , clearErrors])
  return (
    <Fragment>
      <Metadata pageTitle={"My Orders"} />
      {
        loading ? <Loader /> :  (
          <div className='myOrderPage'>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className='myOrderTable'
              autoHeight
            />

            <Typography id="myOrderHeading">{user && user.name}'s Orders</Typography>
          </div>
        )
      }

    </Fragment>
  )
}

export default MyOrders
