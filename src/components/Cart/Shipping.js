import React, { Fragment, useEffect, useState } from 'react'
import "./Shipping.css"
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../actions/cartAction'
import Metadata from '../layout/Metadata'
import { PinDrop, Home, LocationCity, Public, Phone, TransferWithinAStation } from '@material-ui/icons'
import { Country, State } from 'country-state-city'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import CheckOutSteps from './CheckOutSteps.js'

const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user, loading, isAuthenticated } = useSelector(state => state.user)
  const { shippingInfo } = useSelector((state) => state.cart)
  const [address, setAddress] = useState(shippingInfo.address)
  const [city, setCity] = useState(shippingInfo.city)
  const [state, setState] = useState(shippingInfo.state)
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
  const [country, setCountry] = useState(shippingInfo.country)
  const navigate = useNavigate()

  useEffect(() => {
    // if (!isAuthenticated) {
    //   navigate('/login?redirect=shipping')
    // }


  })
  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length > 10 || phoneNo.length < 10) {
      alert.error("Please enter Correct Phone No. of 10 digit");
      return;
    }
    dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNo }))
    navigate('/order/confirm')
  }
  return (
    <Fragment>
      <Metadata pageTitle="Shipping Details" />
      <CheckOutSteps activeStep={0} />
      <div className='shippingContainer'>
        <div className='shippingBox'>
          <h2 className='shippingHeading'>Shipping Details</h2>
          <form className='shippingForm' encType='multi-part/form-data' onSubmit={shippingSubmit}>
            <div>
              <Home />
              <input
                type='text'
                placeholder='Address'
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <LocationCity />
              <input
                type='text'
                placeholder='City'
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <PinDrop />
              <input
                type='text'
                placeholder='Pin Code'
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div>
              <Phone />
              <input
                type='number'
                placeholder='Phone No'
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}

                maxLength="10" size="10"
              />
            </div>
            <div>
              <Public />
              <select required
                value={country}
                onChange={(e) => { setCountry(e.target.value) }}
              >
                <option value="" >Country</option>

                {Country && Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                ))}
              </select>
            </div>
            {country && (
              <div>
                <TransferWithinAStation />
                <select required
                  value={state}
                  onChange={(e) => { setState(e.target.value) }}
                >
                  <option value="" > State</option>
                  {State && State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                  ))}
                </select>
              </div>
            )}
            <input
              type='submit'
              value="Countinue"
              className='shippingBtn'
              disabled={state ? false : true}
            />

          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default Shipping
