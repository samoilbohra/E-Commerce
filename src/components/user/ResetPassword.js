import React, { Fragment, useRef, useState, useEffect } from 'react'
import Metadata from '../layout/Metadata'
import { Link, useNavigate } from 'react-router-dom'
import LockOpenIcon from "@material-ui/icons/LockOpen"
import LockIcon from "@material-ui/icons/Lock"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import Loader from '../layout/loader/Loader'
import './UpdateProfile.css'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, loadUser, logout, resetPassword, updatePassword } from '../../actions/userAction'
import { useAlert } from 'react-alert'
import { UPDATE_PASSWORD_RESET } from '../../constants/UserConstants'



const ResetPassword = ({match}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { token } = useParams()

    const { user  , isAuthenticated  } = useSelector((state) => state.user);
    const { error , loading , success  } = useSelector((state) => state.forgotPassword);
    
    const [newPassword , setNewPassword] = useState('');
    const [confirmNewPassword , setConfirmNewPassword] = useState('');

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
            dispatch(resetPassword( token ,{ password: newPassword ,confirmPassword : confirmNewPassword }));
        
    }
    
    useEffect(() => {
      
     
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (success) {
            alert.success("Password Reset Success ");
            navigate("/login");
          
        }

    }, [dispatch, alert, error, isAuthenticated , user , success]);




  return (
    <Fragment>{loading ? <Loader /> :  <Fragment>
    <Metadata pageTitle={`Update Profile`} />

  <div className='loginSignUpContainer'>
      <div className='loginSignupBox'>
      <h2 className='updateProfileHeading' >Reset Password</h2>
      <form className='updateProfileForm' encType='multipart/form-data' onSubmit={updatePasswordSubmit}>
    
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
   
                  <input type='submit' value="Reset" className='updateProfilebtn' />
</form>
      </div>
      </div>
      </Fragment>}
      </Fragment>
  )
}

export default ResetPassword
