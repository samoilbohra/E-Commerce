import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import "./ProductsList.css"
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import Metadata from '../layout/Metadata';
import { Delete, Edit, Star } from '@material-ui/icons';
import SideBar from './SideBar';
import { clearErrors, deleteOrder, getAllOrders } from '../../actions/orderAction';
import { DELETE_ORDERS_RESET } from '../../constants/orderConstants';
import { deleteCategory, getCategory, newCategory } from '../../actions/productAction';
import { DELETE_CATEGORY_RESET, NEW_CATEGORY_RESET } from '../../constants/ProductConstants';


const Categories = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()



    const { error, orders } = useSelector(state => state.allOrders);
    const { error:deleteError  , isDeleted , loading} = useSelector(state =>state.deleteAndUpdateProduct)
    const { success  , error:addCategoryError ,loading : addCategoryLoading} = useSelector(state=>state.newProduct)
    const { categories, error: categoryError } = useSelector(state => state.category);
    const [category , setCategory] = useState();

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(addCategoryError)
        {
          alert.error(categoryError)
          dispatch(clearErrors())
        }
        if(isDeleted)
        {
          alert.success("Category Deleted Succesfully")
          navigate('/admin/categories')
          dispatch({type :DELETE_CATEGORY_RESET })
        }

        if(success )
        {
            alert.success("Category Added Succesfully")
            navigate('/admin/categories')
            dispatch({type :NEW_CATEGORY_RESET })
        }
        if(categoryError)
      {
          alert.error(categoryError)
        dispatch(clearErrors())
      }
      dispatch(getCategory());
      
        dispatch(getAllOrders());

    }, [dispatch, alert, error, navigate ,isDeleted ,success , categoryError , addCategoryError]);

    const deleteCategoryHandler = (id) => {

        dispatch(deleteCategory(id))
        

    }
    const column = [
        { field: "id", headerName: "Category ID", minWidth: 300, flex: 1 },
       
        { field: "category", headerName: "Category", minWidth: 150, flex: 0.3 },
        {
            field: "actions", headerName: "Action", minWidth: 135, type: "number", sortable: false, flex: 0.3
            , renderCell: (params) => {
                return (<Fragment>
                    <Button onClick={() => { deleteCategoryHandler(params.getValue(params.id, "id")) }}>
                        <Delete />
                    </Button>
                </Fragment>)
            },
        },
    ]

    const rows = [];

    categories  && categories.forEach((category) => {
        rows.push({
            category: category.category,
            id: category._id
        });

    });
    const addCategorySubmitHandler=(e)=>{
        e.preventDefault();
        console.log("hello")
        dispatch(newCategory({category}))
        setCategory("");

    }

    return (
        <Fragment>
        <Metadata pageTitle={"All Category : Admin"} />
        <div className='dashBoard'>
          <SideBar />
          <div className='productReviewsContainer'>
          <form className='productReviewsForm'
                          onSubmit={addCategorySubmitHandler}>
                          <h1 className='productReviewsFormHeading'> Add Category</h1>
                          <div>
                              <Star />
                              <input type='text'
                                  placeholder='New Category'
                                  required
                                  value={category}
                                
                                  onChange={(e) => { setCategory(e.target.value) }}
  
                              />
                          </div>
                 
                          <Button
                              className='ProductButton'
                              id='createProductButton'
                              type='submit'
                              disabled={addCategoryLoading ? true : false || category ==="" }
                          >Add Category</Button>
  
                      </form>
  
  
  {categories && categories.length > 0 ? (   <DataGrid
              rows={rows}
              columns={column}
              pageSize={10}
              disableSelectionOnClick
              className='productListTable'
              autoHeight
            />) : <h1 className='productReviewsFormHeading'>No category Available</h1>}
             
         
          </div>
        </div>
  
      </Fragment>
    )
}


export default Categories
