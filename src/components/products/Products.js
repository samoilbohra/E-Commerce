import React, { Fragment, useEffect, useState } from 'react'
import './Products.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getCategory, getProduct } from '../../actions/productAction'
import Loader from '../layout/loader/Loader'
import ProductCard from '../home/ProductCard'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import { useAlert } from 'react-alert'
import Metadata from '../layout/Metadata'
// import {} from "../constants/ProductConstants"
// import { categories } from '../../constants/ProductConstants'




const Products = ({ match }) => {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const { categories, error: categoryError } = useSelector(state => state.category);

    const { products, loading, error, productCount, resultPerPage, filteredProductCount = 1 } = useSelector((state) => state.products);
    const { keyword } = useParams()
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const alert = useAlert();



    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        
        if(categoryError)
        {
          alert.error(categoryError)
          dispatch(clearErrors())
        }
        dispatch(getCategory());
        
        dispatch(getProduct(keyword, currentPage, price, category, ratings))
    }, [dispatch, alert, error, keyword, currentPage, price, category, ratings , categoryError]);
    
    let count = filteredProductCount;

    return (
        <Fragment>
            {loading ? <Loader /> : (

                <Fragment>
                    <Metadata pageTitle="Products - Ecommerce " />

                    <h2 className='ProductHeading' >Products</h2>
                    <div className='products' >
                        {products && products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                    <div className='filterBox'>
                        <Typography> Price</Typography>
                        <Slider value={price}
                            onChange={priceHandler}
                            valueLabelDisplay='auto'
                            aria-labelledby='range-slider'
                            min={0}
                            max={25000}
                        />
                        <Typography>
                            categories</Typography>

                        <ul className='categoryBox'>
                            {categories && categories.map((categry) => (
                                <li
                                    className='categoryLink'
                                    key={categry._id}
                                    onClick={() => { setCategory(categry.category); }}
                                >
                                    {categry.category}
                                </li>
                            ))}
                        </ul>
                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRating) => {
                                    setRatings(newRating)
                                }}
                                aria-labelledby='continuous-slider'
                                valueLabelDisplay='auto'

                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>

                    {resultPerPage < count && <div className='paginationBox'>
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productCount}
                            onChange={setCurrentPageNo}
                            nextPageText='next'
                            prevPageText="prev"
                            firstPageText='first'
                            lastPageText='Last'
                            itemClass='page-item'
                            linkClass='page-link'
                            activeClass='pageItemActive'
                            activeLinkClass='pageLinkActive'
                        />
                    </div>
                    }
                </Fragment>
            )}
        </Fragment>
    )
}

export default Products
