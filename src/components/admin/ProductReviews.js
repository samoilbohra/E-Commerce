import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import "./ProductReviews.css"
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import { clearErrors, deleteReviews, getAllReviews } from '../../actions/productAction';
import Metadata from '../layout/Metadata';
import { Delete , Star} from '@material-ui/icons';
import SideBar from './SideBar';
import {  DELETE_REVIEW_RESET } from '../../constants/ProductConstants';

const ProductReviews = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()
  


  const { error, reviews , loading : updateLoading } = useSelector(state => state.productReviews);
  const { error:deleteError  , isDeleted } = useSelector(state =>state.review)
  const [productId , setProductId]  = useState("")

  
  useEffect(() => {
  if(productId.length===24)
  {
    dispatch(getAllReviews(productId))

  }
   
  
    if(error)
    {
      setProductId("")
      reviews=[]
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
      alert.success("Review Deleted Succesfully")
      navigate('/admin/reviews')
      dispatch({type :DELETE_REVIEW_RESET })
    }

  }, [dispatch , alert ,error , deleteError , isDeleted  , navigate ,productId , reviews ]);


  const deleteReviewHandler =(id)=>{

    dispatch(deleteReviews(productId,id))


  }
  const productReviewsSubmitHandler = (e)=>{
      e.preventDefault()

    dispatch(getAllReviews(productId))

  }
  const column = [
    { field: "id", headerName: "Review ID", minWidth: 180, flex: 0.5 },
    { field: "user", headerName: "User",  minWidth: 135, flex: 0.3 },
    { field: "comment", headerName: "Comment", minWidth: 280, flex: 1 },
    { field: "rating", headerName: "Rating", minWidth: 200, type:"number" , flex: 0.5 , cellClassName: (params) => {
      return params.getValue(params.id, "rating") >= 3 ? "greenColor" : "redColor"
  }},
    {
      field: "actions", headerName: "Action", minWidth: 135, type: "number", sortable: false, flex: 0.3
      , renderCell: (params) => {
        return (<Fragment>
         
          <Button onClick={()=>{deleteReviewHandler(params.getValue(params.id , "id"))}}>
            <Delete />
          </Button>
        </Fragment>)
      },
    },
  ]

  const rows = [];

  reviews && reviews.forEach((item) => {
    rows.push({
      id: item._id,
      rating: item.rating,
      comment: item.comments,
      user: item.name
    });

  });

  return (
    <Fragment>
      <Metadata pageTitle={"All Reviews : Admin"} />
      <div className='dashBoard'>
        <SideBar />
        <div className='productReviewsContainer'>
        <form className='productReviewsForm'
                        onSubmit={productReviewsSubmitHandler}>
                        <h1 className='productReviewsFormHeading'> All Reviews</h1>
                        <div>
                            <Star />
                            <input type='text'
                                placeholder='Product Id'
                                required
                                value={productId}
                              
                                onChange={(e) => { setProductId(e.target.value) }}

                            />
                        </div>
               
                        <Button
                            className='ProductButton'
                            id='createProductButton'
                            type='submit'
                            disabled={updateLoading ? true : false || productId ==="" }
                        >Get Reviews</Button>

                    </form>


{reviews && reviews.length > 0 ? (   <DataGrid
            rows={rows}
            columns={column}
            pageSize={10}
            disableSelectionOnClick
            className='productListTable'
            autoHeight
          />) : <h1 className='productReviewsFormHeading'>No Reviews Found</h1>}
           
       
        </div>
      </div>

    </Fragment>
  )
}


export default ProductReviews
