import React, { Fragment, useRef, useState, useEffect } from 'react'
import Metadata from '../layout/Metadata'
import { Link, useNavigate } from 'react-router-dom'
import MailOutLineIcon from "@material-ui/icons/MailOutline"
import "./ForgotPassword.css"
import Loader from '../layout/loader/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, forgotPassword, loadUser } from '../../actions/userAction'
import { useAlert } from 'react-alert'
import { FORGOT_PASSWORD_RESET, UPDATE_PASSWORD_RESET } from '../../constants/UserConstants'


const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {error , message , loading}  = useSelector((state) => state.forgotPassword)

    const alert = useAlert();
    const [email , setEmail] = useState("");
   

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
            dispatch(forgotPassword({ email}));
        
    }
    
    useEffect(() => {
      
    
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (message) {
            alert.success(message.message);
            navigate("/login");
            dispatch({
                type:FORGOT_PASSWORD_RESET,
            })

        }

    }, [dispatch, alert, error, message]);



  return (
    <Fragment>{loading ? <Loader /> :  <Fragment>
    <Metadata pageTitle={`Forgot Password`} />

  <div className='loginSignUpContainer'>
      <div className='forgotPasswordBox'>
      <h2 className='updateProfileHeading' >Forgot Password ? </h2>
      <form className='updateProfileForm' encType='multipart/form-data' onSubmit={forgotPasswordSubmit}>
     
      <div className='signupEmail'>
                            <MailOutLineIcon />
                            <input type='email'
                                placeholder='Enter Email'
                                required
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
     
                
   
                  <input type='submit' value="Send Reset Link" className='updateProfilebtn' />
</form>
      </div>
      </div>
      </Fragment>}
      </Fragment>
  )
}

export default ForgotPassword
