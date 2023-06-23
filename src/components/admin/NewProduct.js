import React, { Fragment, useRef, useState, useEffect } from 'react'
import { Link, redirect, useLocation, useNavigate, useParams } from 'react-router-dom'
import './NewProduct.css'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors, getCategory, newProduct } from '../../actions/productAction'
import { Button, Select } from '@material-ui/core'
import Metadata from '../layout/Metadata'
import { AccountTree, AttachMoney, Description, Spellcheck, Storage } from '@material-ui/icons'
import SideBar from './SideBar'
import { NEW_PRODUCT_RESET } from '../../constants/ProductConstants'



const NewProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()

    const { loading, error, success } = useSelector(state => state.newProduct);
    const { categories, error: categoryError } = useSelector(state => state.category);


    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [images, setImages] = useState([])
    const [stock, setStock] = useState(0)
    const [imagesPreview, setImagesPreview] = useState([])


    useEffect(() => {
        if (error) {
            console.log(error)

            alert.error(error);
            dispatch(clearErrors())
        }
        if (success) {
            alert.success("product Created Successfully")
            navigate('/admin/dashboard')
            dispatch({ type: NEW_PRODUCT_RESET })
        }
        
        if(categoryError)
        {
            alert.error(categoryError)
          dispatch(clearErrors())
        }
        dispatch(getCategory());

    }, [dispatch, alert, error, success]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();
        console.log({ name, description, price, category, stock, img: images })
        dispatch(newProduct({ name, description, price, category, stock, img: images }))

    }

    const createProductImagesChange = (e) => {
        console.log("hello")
        const files = Array.from(e.target.files)
        setImages([])
        setImagesPreview([]);
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
            <Metadata pageTitle={"Create Product"} />
            <div className='dashBoard'>
                <SideBar />
                <div className='newProductContainer'>
                    <form className='createProductForm'
                        encType='multipart/form-data'
                        onSubmit={createProductSubmitHandler}>
                        <h1> Create Product</h1>
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
                            <select onChange={(e) => { setCategory(e.target.value) }} >
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
                                onChange={(e) => { setStock(e.target.value) }}

                            />
                        </div>
                        <div id='createProductFormFile'>
                            <input type='file'
                                name='avatar'
                                onChange={createProductImagesChange}
                                accept='image/*'
                                multiple
                            />
                        </div>

                        <div id='createProductFormImage'>
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt='Avatar Preview' />
                            ))}
                        </div>

                        <Button 
                        className='ProductButton'
                            id='createProductButton'
                            type='submit'
                            disabled={loading ? true : false}
                        >Create</Button>

                    </form>

                </div>
            </div>

        </Fragment>
    )
}

export default NewProduct
