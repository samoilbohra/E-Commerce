import React from 'react'
import ProfilePng from '../../images/Profile.png'
import './productDetails.css'
import { Rating } from '@material-ui/lab'

const ReviewCard = ({ review }) => {
    const options = {
       
        size: "large",
        value: review.rating,
        precision :0.5,
        readOnly : true
    }
    return (
        <div className='reviewCard'>
            <img src={ProfilePng} alt="User" />
            <p>{review.name}</p>
            <Rating {...options} />
            <span>{review.comments}</span>
        </div>
    )
}

export default ReviewCard
