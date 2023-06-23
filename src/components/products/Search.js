import React, { Fragment, useState } from 'react'
import './Search.css'
import { useNavigate } from "react-router-dom";
import Metadata from '../layout/Metadata';

const Search = ( ) => {
  let navigate = useNavigate();
const [keyword , setKeyword] = useState("");
const searchSubmitHandler =(e) =>{
  e.preventDefault();
  if(keyword.trim()){
      navigate(`/products/${keyword}`);
  }
  else{
    navigate(`/products`);
  }
  
}


  return (
 <Fragment>
          <Metadata pageTitle="Search Product " />
 
    <form className='searchBox' onSubmit={searchSubmitHandler}>
    <input type="text"
      placeholder="Search a Product"
      onChange={e => setKeyword(e.target.value)}
    />
    <input type="submit" value="Search"/>

    </form>
 </Fragment>
  )
}

export default  Search 
