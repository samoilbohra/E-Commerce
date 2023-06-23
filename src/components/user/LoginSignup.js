import React, { Fragment, useRef, useState, useEffect } from 'react'
import { Link, redirect, useLocation, useNavigate, useParams } from 'react-router-dom'
import MailOutLineIcon from "@material-ui/icons/MailOutline"
import LockOpenIcon from "@material-ui/icons/LockOpen"
import FaceIcon from "@material-ui/icons/Face"
import Loader from '../layout/loader/Loader'
import './LoginSignup.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, login, register } from '../../actions/userAction'
import { useAlert } from 'react-alert'



const LoginSignup = ({ history }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const location = useLocation();
    const { loading, error, isAuthenticated, token } = useSelector((state) => state.user);

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword:""
    });
    const { name, email, password , reEnterPassword  } = user;
    const [avatar, setAvatar] = useState(undefined)
    const [avatarPreview, setAvatarPreview] = useState('/Profile.png')

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword))
    }
    const registerSubmit = (e) => {
        e.preventDefault();

        if(password !== reEnterPassword)
        {
            alert.error("Password Doesnt Match")
        }
    else{const myform = new FormData();

        myform.set('name', name);
        myform.set('email', email);
        myform.set('password', password);
        myform.set('avatar', avatar);
        dispatch(register({ name, email, password, avatar }));}

    }

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                    console.log(avatar)
                    console.log(avatarPreview)
                }
            }
            reader.readAsDataURL(e.target.files[0]);
            
        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
        
    }
    const redirect =  location.search ? `/${location.search.split("=")[1]}`   : "/"
    
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isAuthenticated) {
            navigate(redirect);
        }

    }, [dispatch, alert, error, isAuthenticated,  history , redirect] );




    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral")
            switcherTab.current.classList.remove("shiftToRight")

            registerTab.current.classList.remove("shiftToNeutralForm")
            loginTab.current.classList.remove("shiftToLeft")
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight")
            switcherTab.current.classList.remove("shiftToNeutral")

            registerTab.current.classList.add("shiftToNeutralForm")
            loginTab.current.classList.add("shiftToLeft")
        }

    }

    return (
        <Fragment>{loading ? <Loader /> : <Fragment>
            <div className='loginSignUpContainer'>
                <div className='loginSignupBox'>
                    <div>
                        <div className='loginSignupToggle'>
                            <p onClick={(e) => { switchTabs(e, "login") }}>Login</p>
                            <p onClick={(e) => { switchTabs(e, "register") }}>Register</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                    <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>

                        <div className='loginEmail'>
                            <MailOutLineIcon />
                            <input type='email'
                                placeholder='Email'
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className='loginpassword'>
                            <LockOpenIcon />
                            <input type='password'
                                placeholder='Password'
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>

                        <Link to='/password/forgot'>Forgot Password  ?</Link>
                        <input type='submit' value="login" className='loginBtn' />

                    </form>
                    <form className='signupForm' ref={registerTab} encType='multipart/form-data' onSubmit={registerSubmit}>
                        <div className='signUpName'>
                            <FaceIcon />
                            <input type='text'
                                placeholder='Name'
                                required
                                name="name"
                                value={name}
                                onChange={registerDataChange}

                            />
                        </div>
                        <div className='signupEmail'>
                            <MailOutLineIcon />
                            <input type='email'
                                placeholder='Email'
                                required
                                name='email'
                                value={email}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className='signuppassword'>
                            <LockOpenIcon />
                            <input type='password'
                                placeholder='Password'
                                required
                                name='password'
                                value={password}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className='reEnterSignuppassword'>
                            <LockOpenIcon />
                            <input type='password'
                                placeholder='Re-Enter Password'
                                required
                                name='reEnterPassword'
                                value={reEnterPassword}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div id='registerImage'>
                            <img src={avatarPreview} alt='avatar Preview' />
                            <input type='file'
                                name='avatar'
                                accept='image/*'
                                onChange={registerDataChange}
                            />

                        </div>
                        <input type='submit' value="Register" className='signupbtn' />

                    </form>
                </div>
            </div>
        </Fragment>}</Fragment>
    )
}

export default LoginSignup
