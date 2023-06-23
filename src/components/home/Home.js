import React, { Fragment, useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import './Home.css'
import ProductCard from './ProductCard.js'
import Metadata from '../layout/Metadata'
import { clearErrors, getProduct } from '../../actions/productAction'
// eslint-disable-next-line
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/loader/Loader'
import { useAlert } from 'react-alert'


// const product = {
//     name : "blue Tshirt",

//     price : "3000",
//     _id : "samoil",
//     images: [{url : "https://i.pinimg.com/564x/c1/1d/16/c11d164de692594acf53c9a855093139.jpg"}]
// }

const Home = () => {
 
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(state => state.products)

  useEffect(() => {
    if(error)
    {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct())
  }, [dispatch , error ,alert]);


  return (


    <Fragment>
      {
        loading ? (<Loader/>) : (<Fragment>
          <Metadata pageTitle="Ecommerce " />
          <div className='banner'>
            <p>Welcome to ECOMMERCE</p>
            <h1>Find Amazing Products Below </h1>
            <a href='#container'> <button> Scroll <CgMouse /></button> </a>
          </div>
          <h2 className='homeHeading'>Featured Products</h2>
          <div className='container' id='container'>
            {products && products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </Fragment>
        )
      }
    </Fragment>
  )
}

export default Home
