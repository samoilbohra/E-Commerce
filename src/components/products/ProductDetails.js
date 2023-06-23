import React, { Fragment, useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import './productDetails.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getCategory, getProduct, getProductDetails, newReview } from '../../actions/productAction'
import { useAlert } from 'react-alert'
import { useNavigate, useParams } from 'react-router-dom'
import ReviewCard from './ReviewCard.js'
import Loader from '../layout/loader/Loader'
import Metadata from '../layout/Metadata'
import { addItemsToCart } from '../../actions/cartAction'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@material-ui/core"
import { Rating } from "@material-ui/lab"
import { NEW_REVIEW_RESET } from '../../constants/ProductConstants'
import ProductCard from '../home/ProductCard'
// import e from 'express'

const ProductDetails = (props) => {
  const navigate = useNavigate()
  const alert = useAlert();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false)
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("")
  const { id } = useParams();
  
  const { loading, product, error } = useSelector(state => state.productDetails);
  const { products, loading: productLoading, error: productError, productCount, resultPerPage, filteredProductCount = 1, success: productsSuccess } = useSelector((state) => state.products);

  const { success, error: reviewError } = useSelector(state => state.newReview)
  const increaseQuantity = () => {
    if (product.stock <= quantity) {
      alert.error("Out Of Stock")
    }
    else {

      setQuantity(quantity + 1);

    }
  }
  const decreaseQuantity = () => {
    if (quantity <= 1) {
      setQuantity(1);
    }
    else {

      setQuantity(quantity - 1);
    }
  }
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true)
  }
  // if (product) {
  //     setCategory(product.category)
  //   }

  const options = {
    size: "large",
    value: product ? product.ratings  :0 ,
    readOnly: true,
    precision: 0.5
  }
  const submitReview = () => {
    if (comment === "" || !rating) {
      alert.error("Please add the Comment and Rating Both")
      return
    }

    dispatch(newReview({
      productId: id,
      rating,
      comment
    }));

  
    submitReviewToggle()
  }
  const addToCartHandler = () => {
    if (quantity > product.stock) {
      alert.error("Product out of Stock")
      return
    }
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart")

  }
  const goToCart = () => {
    navigate('/cart')
  }
  useEffect(() => {
    
 
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError)
      dispatch(clearErrors())
    }

    if (success) {
      alert.success("Review Submitted Succesfully")
      dispatch({ type: NEW_REVIEW_RESET })
    }
    if (productError) {
      alert.error(productError);
      dispatch(clearErrors())

    }
    
    dispatch(getProductDetails(id));
    
    
    
    
    
  }, [dispatch, id, error, alert, reviewError, success, product ]);
  

  return (



    <Fragment>
      {loading ? <Loader /> :
        <Fragment>
          <Metadata pageTitle={`${product && product.name}-- Ecommerce `} />

          <div className='productDetails'>
            <div>
              <Carousel autoPlay={false}>
                {product && product.img && product.img.map((item, i) => (
                  <img
                    className='CarouselImage'
                    key={item._id}
                    src={item.url}
                  />
                ))}
              </Carousel>
            </div>
            <div>
              <div className='detailsBlock1'>
                <h2>{product && product.name}</h2>
                <p>{`product   #  ${product && product._id}`}</p>
              </div>
              <div className='detailsBlock2'>
                <Rating {...options} />
                <span> ({product && product.numOfReviews} Reviews) </span>
              </div>
              <div className='detailsBlock3'>
                <h1>{product && product.price}</h1>
                <div className='detailsBlock3-1'>
                  <div className='detailsBlock3-1-1'>
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly value={quantity} type="Number"    />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={addToCartHandler}>Add To Cart</button>
                  <button onClick={goToCart}>Cart</button>
                </div>
                <p>Status :
                  <b className={product && product.stock < 1 ? "redColor" : 'greenColor'}>
                    {product && product.stock < 1 ? "Out Of Stock " : "In Stock"}
                  </b>
                </p>
              </div>
              <div className='detailsBlock4' >
                Description : <p>{product && product.description}</p>
              </div>
              <button onClick={submitReviewToggle} className='submitReview'>Submit Review </button>
            </div>
          </div>


          <h3 className='ReviewsHeading'>Reviews</h3>

          <Dialog
            aria-labelledby='simple-dialog-title'
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className='submitDialog'>
              <Rating onChange={(e) => setRating(e.target.value)} max={5}  name="unique-rating" 
               precision={0.5} 
               value={Number(rating)} 
               size="large" />
              <textarea
                className='submitDialogTextArea'
                cols={30}
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              >
              </textarea>
            </DialogContent>
            <DialogActions>
              <Button color='secondary' onClick={submitReviewToggle}>Cancel</Button>
              <Button color='primary' onClick={submitReview}>Submit</Button>

            </DialogActions>
          </Dialog>

          {product &&product.reviews && product.reviews[0] ? (
            <div className="reviews"> {
              product.reviews.map((review) => <ReviewCard key={review.user} review={review} />)
            } </div>
          ) : (
            <p className='noReviews'>No Reviews Yet</p>
          )}

          <h2 className='ProductHeading' >Realated Products</h2>
          <div className='products' >
            {products && products.map((produt) => (
              <ProductCard key={produt._id} product={produt} />
            ))}
          </div>
          {/* <ProductCard key={product._id} product={product} />
          <ProductCard key={product._id} product={product} />
          <ProductCard key={product._id} product={product} />
          <ProductCard key={product._id} product={product} /> */}

        </Fragment>
      }
    </Fragment>
  )
}

export default ProductDetails
