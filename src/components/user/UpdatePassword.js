import React, { Fragment, useRef, useState, useEffect } from 'react'
import Metadata from '../layout/Metadata'
import { Link, useNavigate } from 'react-router-dom'
import LockOpenIcon from "@material-ui/icons/LockOpen"
import LockIcon from "@material-ui/icons/Lock"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import Loader from '../layout/loader/Loader'
import './UpdateProfile.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, loadUser, updatePassword } from '../../actions/userAction'
import { useAlert } from 'react-alert'
import { UPDATE_PASSWORD_RESET } from '../../constants/UserConstants'


const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { user  , isAuthenticated  } = useSelector((state) => state.user);
    const {error , isUpdated , loading}  = useSelector((state) => state.profile)
    const [avatar, setAvatar] = useState()
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [avatarPreview, setAvatarPreview] = useState('')
    const [currentPassword , setCurrentPassword] = useState('');
    const [newPassword , setNewPassword] = useState('');
    const [confirmNewPassword , setConfirmNewPassword] = useState('');

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
            dispatch(updatePassword({ currentPassword , newPassword , confirmNewPassword }));
        
    }
    
    useEffect(() => {
      
        // if(isAuthenticated ===false)
        // {
        //     navigate("/login")
        // }
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success("Password Updated Succesfully ");
            dispatch(loadUser());
            navigate("/account");
            dispatch({
                type:UPDATE_PASSWORD_RESET,
            })
        }

    }, [dispatch, alert, error, isAuthenticated , user , isUpdated]);



  return (
    <Fragment>{loading ? <Loader /> :  <Fragment>
          <Metadata pageTitle={`Update Profile`} />

        <div className='loginSignUpContainer'>
            <div className='loginSignupBox'>
            <h2 className='updateProfileHeading' >Change Password</h2>
            <form className='updateProfileForm' encType='multipart/form-data' onSubmit={updatePasswordSubmit}>
            <div className='signuppassword'>
                            <VpnKeyIcon />
                            <input type='password'
                                placeholder='Current Password'
                                required
                                name='currentPassword'
                                value={currentPassword}
                                onChange={(e)=>{setCurrentPassword(e.target.value)}}
                            />
                        </div>
                        <Link className='forgotPassword' to='/password/forgot'>Forgot Password  ?</Link>

            <div className='signuppassword'>
                            <LockOpenIcon />
                            <input type='password'
                                placeholder='New Password'
                                required
                                name='newPassword'
                                value={newPassword}
                                onChange={(e)=>{setNewPassword(e.target.value)}}

                            />
                        </div>
           
                        <div className='reEnterSignuppassword'>
                            <LockIcon />
                            <input type='password'
                                placeholder='confirm New Password'
                                required
                                name='confirmNewPassword'
                                value={confirmNewPassword}
                                onChange={(e)=>{setConfirmNewPassword(e.target.value)}}
                            />
                        </div>
         
                        <input type='submit' value="Update" className='updateProfilebtn' />
</form>
            </div>
            </div>
            </Fragment>}
            </Fragment>
  )
}

export default UpdatePassword
