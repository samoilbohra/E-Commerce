import React, { Fragment, useRef, useState, useEffect } from 'react'
import { Link, redirect, useLocation, useNavigate, useParams } from 'react-router-dom'
import './ProductUpdate.css'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors, updateProduct, getProductDetails, getCategory } from '../../actions/productAction'
import { Button, Select } from '@material-ui/core'
import Metadata from '../layout/Metadata'
import { AccountTree, AttachMoney, Description, Spellcheck, Storage } from '@material-ui/icons'
import SideBar from './SideBar'
import { UPDATE_PRODUCT_RESET } from '../../constants/ProductConstants'



const ProductUpdate = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
    const { id } = useParams()
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector(state => state.deleteAndUpdateProduct);
    const { loading, product, error } = useSelector(state => state.productDetails);
    const { categories, error: categoryError } = useSelector(state => state.category);

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [images, setImages] = useState()
    const [oldImages, setOldImages] = useState([]);
    const [stock, setStock] = useState(0)
    const [imagesPreview, setImagesPreview] = useState([])


    useEffect(() => {
        if (!product || (product && product._id !== id)) {
            dispatch(getProductDetails(id))
        } else {
            setName(product.name);
            setPrice(product.price)
            setDescription(product.description)
            setCategory(product.category)
            setStock(product.stock)
            setOldImages(product.img)
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors())
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success("product Updated Successfully")
            navigate('/admin/products')
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }
        if (categoryError) {
            alert.error(categoryError);
            dispatch(clearErrors())
        }
      dispatch(getCategory());
      

    }, [dispatch, alert, error, isUpdated ,updateError, product , categoryError]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({id, name, description, price, category, stock,  images }))

    }

    const updateProductImagesChange = (e) => {
        console.log("hello")
        const files = Array.from(e.target.files)
        setImages([])
        setImagesPreview([]);
        setOldImages([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result])
                    setImages((old) => [...old, reader.result])
                }
            }

            reader.readAsDataURL(file)

        })

    }



    return (
        <Fragment>
            <Metadata pageTitle={"Update Product"} />
            <div className='dashBoard'>
                <SideBar />
                <div className='newProductContainer'>
                    <form className='createProductForm'
                        encType='multipart/form-data'
                        onSubmit={updateProductSubmitHandler}>
                        <h1> Update Product</h1>
                        <div>
                            <Spellcheck />
                            <input type='text'
                                placeholder='Product Name'
                                required
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}

                            />
                        </div>
                        <div>
                            <AttachMoney />
                            <input type='number'
                                placeholder='Price'
                                required
                                value={price}
                                onChange={(e) => { setPrice(e.target.value) }}

                            />
                        </div>
                        <div>
                            <Description />
                            <textarea
                                placeholder='Product  Description'
                                required
                                value={description}
                                cols="30"
                                rows="1"
                                onChange={(e) => { setDescription(e.target.value) }}

                            />
                        </div>
                        <div>
                            <AccountTree />
                            <select value={category} onChange={(e) => { setCategory(e.target.value) }} >
                                <option value=""> Choose Category</option>
                                {categories && categories.map((category) => (
                                    <option value={category.category} key={category._id} >{category.category}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <Storage />
                            <input type='number'
                                placeholder='Stock'
                                required
                                value={stock}
                                onChange={(e) => { setStock(e.target.value) }}

                            />
                        </div>
                        <div id='createProductFormFile'>
                            <input type='file'
                                name='avatar'
                                onChange={updateProductImagesChange}
                                accept='image/*'
                                multiple
                            />
                        </div>

                        <div id='createProductFormImage'>
                            {oldImages && oldImages.map((image, index) => (
                                <img key={index} src={image.url} alt='old Product Preview' />
                            ))}
                        </div>

                        <div id='createProductFormImage'>
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt='Product Preview' />
                            ))}
                        </div>

                        <Button
                            id='createProductButton'
                            type='submit'
                            disabled={loading ? true : false}
                        >Update</Button>

                    </form>

                </div>
            </div>

        </Fragment>
    )
}

export default ProductUpdate
