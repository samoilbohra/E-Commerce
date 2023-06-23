import React, { Fragment, useRef, useState, useEffect } from 'react'
import { Link, redirect, useLocation, useNavigate, useParams } from 'react-router-dom'
import './NewProduct.css'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors, newProduct } from '../../actions/productAction'
import { Button, Select } from '@material-ui/core'
import Metadata from '../layout/Metadata'
import { AccountTree, AttachMoney, Description, MailOutline, Person, Spellcheck, Storage, VerifiedUser } from '@material-ui/icons'
import SideBar from './SideBar'
import { UPDATE_USER_RESET } from '../../constants/UserConstants'
import { getUserDetails, updateUserDetails } from '../../actions/userAction'



const UpdateUser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()

    const { error: updateError, isUpdated, loading: updateLoading } = useSelector(state => state.profile)
    const { error, user, loading } = useSelector(state => state.userDetails)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const { id } = useParams()

    useEffect(() => {

        if (!user || (user && user._id !== id)) {
            dispatch(getUserDetails(id));
        } else {
            setName(user.name);
            setEmail(user.email)
            setRole(user.role)
        }

        if (error) {

            alert.error(error);
            dispatch(clearErrors())
        }
        if (updateError) {

            alert.error(updateError);
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success("User Role Updated Successfully")
            navigate('/admin/users')
            dispatch({ type: UPDATE_USER_RESET })
        }
    }, [dispatch, alert, error, isUpdated ,  updateError, user]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        if(role!== user.role){
        dispatch(updateUserDetails(id , role))
        }
        else{
            alert.error(`user is Already a ${role}`)
        }
    }

 


    return (
        <Fragment>
            <Metadata pageTitle={"Update User Role -Admin"} />
            <div className='dashBoard'>
                <SideBar />
                <div className='newProductContainer'>
                    <form className='createProductForm'
                        onSubmit={updateUserSubmitHandler}>
                        <h1> Update User Role </h1>
                        <div>
                            <Person />
                            <input type='text'
                                placeholder='Product Name'
                                required
                                value={name}
                                readOnly
                                onChange={(e) => { setName(e.target.value) }}

                            />
                        </div>
                      
                        <div>
                            <MailOutline />
                            <input type='text'
                                placeholder='email id'
                                required
                                value={email}
                                readOnly
                                onChange={(e) => { setEmail(e.target.value) }}

                            />
                        </div>
                        
                        <div>
                            <VerifiedUser />

                            <select  onChange={(e) => { setRole(e.target.value) }} >
                               <option value={role}>Choose Role - Default</option>
                               <option value="user"> User</option>
                              <option value="admin">Admin</option>
                              
                            </select>
                        </div>
                     
                   
                        <Button
                            className='ProductButton'
                            id='createProductButton'
                            type='submit'
                            disabled={updateLoading ? true : false}
                        >Update</Button>

                    </form>

                </div>
            </div>

        </Fragment>
    )
}



export default UpdateUser
