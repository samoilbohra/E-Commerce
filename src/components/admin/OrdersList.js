import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import "./ProductsList.css"
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import Metadata from '../layout/Metadata';
import { Delete, Edit } from '@material-ui/icons';
import SideBar from './SideBar';
import { clearErrors, deleteOrder, getAllOrders } from '../../actions/orderAction';
import { DELETE_ORDERS_RESET } from '../../constants/orderConstants';


const OrdersList = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()



    const { error, orders } = useSelector(state => state.allOrders);
      const { error:deleteError  , isDeleted , loading} = useSelector(state =>state.deleteAndUpdateOrders)

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(deleteError)
        {
          alert.error(deleteError)
          dispatch(clearErrors())
        }
        if(isDeleted)
        {
          alert.success("Order Deleted Succesfully")
          navigate('/admin/orders')
          dispatch({type :DELETE_ORDERS_RESET })
        }
        dispatch(getAllOrders());

    }, [dispatch, alert, error, navigate ,isDeleted ]);

    const deleteOrderHandler = (id) => {

        dispatch(deleteOrder(id))
        

    }
    const column = [
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
            field: "actions", headerName: "Action", minWidth: 135, type: "number", sortable: false, flex: 0.3
            , renderCell: (params) => {
                return (<Fragment>
                    <Link to={`/admin/order/${params.getValue(params.id, "id")}`} >
                        <Edit />
                    </Link>
                    <Button onClick={() => { deleteOrderHandler(params.getValue(params.id, "id")) }}>
                        <Delete />
                    </Button>
                </Fragment>)
            },
        },
    ]

    const rows = [];

    orders && orders.forEach((order) => {
        rows.push({
            itemsQty: order.orderItems.length,
            status: order.orderStatus,
            amount: order.totalPrice,
            id: order._id
        });

    });

    return (
        <Fragment>
            <Metadata pageTitle={"All Orders : Admin"} />
            <div className='dashBoard'>
                <SideBar />
                <div className='productListContainer'>
                    <h1 id='productListHeading'> All Products</h1>
                    <DataGrid
                        rows={rows}
                        columns={column}
                        pageSize={10}
                        disableSelectionOnClick
                        className='productListTable'
                        autoHeight
                    />
                </div>
            </div>

        </Fragment>
    )
}

export default OrdersList
