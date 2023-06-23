import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import "./ProductsList.css"
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import { clearErrors, deleteProduct, getAdminProducts } from '../../actions/productAction';
import Metadata from '../layout/Metadata';
import { Delete, Edit } from '@material-ui/icons';
import SideBar from './SideBar';
import { DELETE_PRODUCT_RESET } from '../../constants/ProductConstants';

const ProductsList = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()
  


  const { error, products, productCount } = useSelector(state => state.products);
  const { error:deleteError  , isDeleted , loading} = useSelector(state =>state.deleteAndUpdateProduct)
  
  useEffect(() => {
   
    if(error)
    {
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
      alert.success("Item Deleted Succesfully")
      navigate('/admin/dashboard')
      dispatch({type :DELETE_PRODUCT_RESET })
    }
    dispatch(getAdminProducts());

  }, [dispatch , alert ,error , deleteError , isDeleted  , navigate]);

  const deleteProductHandler =(id)=>{
    
    dispatch(deleteProduct(id))

  }
  const column = [
    { field: "id", headerName: "Product ID", minWidth: 180, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 280, flex: 1 },
    { field: "stock", headerName: "Stock", type: "number", minWidth: 135, flex: 0.3 },
    { field: "price", headerName: "Price", minWidth: 200, type:"number" , flex: 0.5 },
    {
      field: "actions", headerName: "Action", minWidth: 135, type: "number", sortable: false, flex: 0.3
      , renderCell: (params) => {
        return (<Fragment>
          <Link to={`/admin/product/${params.getValue(params.id, "id")}`} >
            <Edit />
          </Link>
          <Button onClick={()=>{deleteProductHandler(params.getValue(params.id , "id"))}}>
            <Delete />
          </Button>
        </Fragment>)
      },
    },
  ]

  const rows = [];

  products && products.forEach((item) => {
    rows.push({
      id: item._id,
      stock: item.stock,
      price: item.price,
      name: item.name
    });

  });

  return (
    <Fragment>
      <Metadata pageTitle={"All Products : Admin"} />
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

export default ProductsList
