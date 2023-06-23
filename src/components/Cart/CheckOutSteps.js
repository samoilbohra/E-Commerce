import { Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import { LocalShipping , LibraryAddCheck , AccountBalance } from '@material-ui/icons'
import React, { Fragment } from 'react'
import './CheckOutSteps.css'
import { useNavigate } from 'react-router-dom'

const CheckOutSteps = ({ activeStep }) => {
    const navigate = useNavigate();
    const steps = [
        {
            url:'/shipping',
            label: <Typography> Shipping Details</Typography>,
            icon: <LocalShipping />
        },
        {
            url:'/order/confirm',
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheck/>
        },
        {
            url:'/process/payment',
            label: <Typography>Payment</Typography>,
            icon: <AccountBalance />
        }
    ];
const onClickHandler =(item , index)=>{
if(activeStep >= index)
{
            navigate(item.url)
}
}
    const stateStyles = {
        boxSizing: 'border-box',
    }
    return (
        <Fragment>
            <Stepper alternativeLabel activeStep={activeStep} style={stateStyles}>
                {steps.map((item, index) => (
                    <Step key={index} active={activeStep===index ? true : false}
                    completed ={activeStep>=index ? true : false} >
                        <StepLabel icon={item.icon}  style={{
                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)", cursor:activeStep >= index ?"pointer" :"arrow"
              }}  onClick={()=>{onClickHandler(item , index)}}>
                            {item.label  }
                        </StepLabel>
                    </Step>


                ))
                }
            </Stepper>
        </Fragment>
    )
}

export default CheckOutSteps
