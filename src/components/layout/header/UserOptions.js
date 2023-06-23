import React, { Fragment, useState } from 'react'
import './Header.css'
import {SpeedDial , SpeedDialAction} from '@material-ui/lab'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonIcon from '@material-ui/icons/Person'
import ListAltIcon from '@material-ui/icons/ListAlt'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import SearchIcon from '@material-ui/icons/Search'
import HomeIcon from '@material-ui/icons/Home'
import {EventAvailable} from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../../actions/userAction'
import zIndex from '@material-ui/core/styles/zIndex'
import { Backdrop } from '@material-ui/core'

const UserOptions = ({user , isAuthenticated}) => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const [open , setOpen] = useState(false)
    const {cartItems} = useSelector(state => state.cart)
    const options =[
        { icon:<HomeIcon/> , name :"Home" , func:home},
        { icon:<EventAvailable/> , name : `Products`  , func: goToProduct},
        { icon:<PersonIcon/> , name :`${isAuthenticated? "Profile" : "Login" }` , func:account},
        { icon:<SearchIcon/> , name : "Search"  , func: searchIcon},
        { icon:<ShoppingCartIcon/> , name : `Cart( ${cartItems.length })`  , func: goToCart},


    ] 
    if(isAuthenticated)
    {
        options.push({ icon:<ListAltIcon/> , name :"Orders" , func:orders});
        options.push({ icon:<ExitToAppIcon/> , name :"Log Out" , func:logOutUser});

    }
    
    if(user && user.role ==="admin")
    {
        options.unshift({icon:<DashboardIcon/> , name :"DashBoard" , func:dashBoard})
    }

function dashBoard(){
    navigate('/admin/dashboard');
}
function goToProduct(){
    navigate('/products');
}
function goToCart(){
    navigate('/cart');
}
function searchIcon(){
    navigate('/search');
}
function orders(){
    navigate('/orders');
}
function home(){
    navigate('/');
}
function account(){
    if(isAuthenticated)
   { navigate('/account');}
   else{
    navigate('/login');
   }
}
function logOutUser(){
    dispatch(logout());
    alert.success("Logged Out Succesfully");
}
console.log();
  return (<Fragment>
{  JSON.stringify(user)!= "{}"&&
   <Fragment>
   <Backdrop open={open}  />
    <SpeedDial
    ariaLabel='SpeedDial tooltip example'
    onClose={()=>setOpen(false)}
    onOpen={()=>setOpen(true)}
    open={open}
    direction='down'
    className='speedDial'
   
    
    icon={ <img
        className='speedDialIcon'
        src={user && user.Avatar.url ? user.Avatar.url :'/Profile.png'}
        alt='profile'
        //  
    /> }
    >
  {options.map((option)=>(

    <SpeedDialAction key={option.name} icon={option.icon} tooltipOpen={window.innerWidth<=600?true:false} tooltipTitle={ option.name} onClick={option.func}/>
  ))}

    </SpeedDial>
   </Fragment>}
   </Fragment>
  )
}

export default UserOptions
