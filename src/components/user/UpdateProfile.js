import React, { Fragment, useRef, useState, useEffect } from 'react'
import Metadata from '../layout/Metadata'
import { Link, useNavigate } from 'react-router-dom'
import MailOutLineIcon from "@material-ui/icons/MailOutline"
import FaceIcon from "@material-ui/icons/Face"
import Loader from '../layout/loader/Loader'
import './UpdateProfile.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction'
import { useAlert } from 'react-alert'
import { UPDATE_PROFILE_RESET } from '../../constants/UserConstants'




const UpdateProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { user  , isAuthenticated  } = useSelector((state) => state.user);
    const {error , isUpdated , loading}  = useSelector((state) => state.profile)
    const [avatar, setAvatar] = useState()
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [avatarPreview, setAvatarPreview] = useState('')

    const updateProfileSubmit = (e) => {
        e.preventDefault();
            dispatch(updateProfile({ name, email,  avatar }));
        
    }

    const updateProfileDataChange = (e) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
         
    }

    useEffect(() => {
        if(user && JSON.stringify(user)!= "{}"){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.Avatar.url)
        }
        // if(isAuthenticated ===false)
        // {
        //     navigate("/login")
        // }
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success("Profile Updated Succesfully ");
            dispatch(loadUser());
            navigate("/account");
            dispatch({
                type:UPDATE_PROFILE_RESET,
            })
        }

    }, [dispatch, alert, error, isAuthenticated , user , isUpdated]);



    return (
        <Fragment>{loading ? <Loader /> :  <Fragment>
          <Metadata pageTitle={`Update Profile`} />

        <div className='loginSignUpContainer'>
            <div className='loginSignupBox'>
            <h2 className='updateProfileHeading' >Update Profile</h2>
            <form className='updateProfileForm' encType='multipart/form-data' onSubmit={updateProfileSubmit}>
            <div className='signUpName'>
                            <FaceIcon />
                            <input type='text'
                                placeholder='Name'
                                required
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}

                            />
                        </div>
                        <div className='signupEmail'>
                            <MailOutLineIcon />
                            <input type='email'
                                placeholder='Email'
                                required
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        
                        
                        <div id='registerImage'>
                            <img src={avatarPreview} alt='avatar Preview' />
                            <input type='file'
                                name='avatar'
                                accept='image/*'
                                onChange={updateProfileDataChange}
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

export default UpdateProfile



