import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import './Home.css'  
import Carousel from 'react-material-ui-carousel'



const ProductCard = ({product}) => {
  const navigate = useNavigate();

  const options ={
    edit : false, 
    color : "black",
    activeColor: "yellow",
    size : window.innerWidth<600 ?20 :20,
    value:product && product.ratings,
    isHalf : true
}
// to={`/product/${product._id}`}
  return (
<div className='productCard' onClick={()=>{navigate(`/product/${product._id}`)}} >
<Carousel autoPlay={false}>
            {product.img && product.img.map((item, i) => (
              <img
                className='CarouselImg'
                key={item._id}
                src={item.url}
              />
            ))}
          </Carousel>
<p>{product.name}</p>
<div >
    <ReactStars {...options} /><span>({product && product.numOfReviews})</span>
</div>
<span>{`₹${product && product.price}`}</span>
</div>
  )
}

export default ProductCard;
