import React, { Fragment, useEffect } from 'react'
import Metadata from '../layout/Metadata'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../layout/loader/Loader'
import './Profile.css'

const Profiles = () => {
  const {user , loading , isAuthenticated} = useSelector(state=>state.user)
  const navigate = useNavigate()
useEffect(()=>{
  // if(isAuthenticated===false)
  // {
  //   navigate("/login?redirect=account");
  // }
})

  return (
    <Fragment>
    { user && JSON.stringify(user)!= "{}" &&
   <Fragment>
    <Metadata pageTitle={`${user.name} 's Profile`} />
    <div className='profileContainer'>
      <div>
        <h1>My Profile</h1>
        <img src ={user.Avatar.url} alt ={ user.name}/>
        <Link to="/me/update" >Edit Profile</Link>
      </div>
      <div>
      <div>
        <h4>Full Name </h4>
        <p>{user.name}</p>
      </div>
      <div>
        <h4>Email</h4>
        <p>{user.email}</p>
      </div>
<div>
  <h4>Joined On</h4>
  <p>{String(user.createdAt).substring(0,10)}</p>

</div>
<div>
  <Link to="/orders">My Orders</Link>
  <Link to="/password/update">Change Password</Link>
</div>
      </div>
    </div>
   </Fragment>}
   </Fragment>
  )
}

export default Profiles
