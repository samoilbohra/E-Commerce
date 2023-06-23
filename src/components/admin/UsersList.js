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
import { clearErrors, deleteUser, getAllUsers } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/UserConstants';

const UsersList = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()
  


  const { error, users } = useSelector(state => state.allUsers);
  const { error:deleteError  , isDeleted ,  loading} = useSelector(state =>state.profile)
  
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
      alert.success("user Deleted Succesfully")
      navigate('/admin/users')
      dispatch({type :DELETE_USER_RESET })
    }
    dispatch(getAllUsers());

  }, [dispatch , alert ,error , deleteError , isDeleted  , navigate]);

  const deleteuserHandler =(id)=>{
    
    // dispatch(deleteProduct(id))
    dispatch(deleteUser(id))
    

  }
  const column = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.5 },
    { field: "email", headerName: "Email id", minWidth: 250, flex: 1 },
    { field: "name", headerName: "Name",  minWidth: 135, flex: 0.5 },
    { field: "role", headerName: "Role", minWidth: 150 , flex: 0.3 ,
    cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin" ? "greenColor" : "redColor"
    }},
    {
      field: "actions", headerName: "Action", minWidth: 135, type: "number", sortable: false, flex: 0.3
      , renderCell: (params) => {
        return (<Fragment>
          <Link to={`/admin/user/${params.getValue(params.id, "id")}`} >
            <Edit />
          </Link>
          <Button onClick={()=>{deleteuserHandler(params.getValue(params.id , "id"))}}>
            <Delete />
          </Button>
        </Fragment>)
      },
    },
  ]

  const rows = [];

  users && users.forEach((user) => {
    rows.push({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    });

  });

  return (
    <Fragment>
      <Metadata pageTitle={"All Users : Admin"} />
      <div className='dashBoard'>
        <SideBar />
        <div className='productListContainer'>
          <h1 id='productListHeading'> All Users</h1>
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



export default UsersList
