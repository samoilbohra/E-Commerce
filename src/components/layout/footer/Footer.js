import React from 'react'
import playstore from "../../../images/playstore.png"
import appstore from "../../../images/Appstore.png"
import "./Footer.css";

const footer = () => {
  return (
  <footer id = "footer">
 <div className='leftFooter'>
 <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playstore} alt="playstore" />
        <img src={appstore} alt="Appstore" />
 </div>
 <div className='midFooter'>
 <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; samoilbarda </p>
 </div>
 <div className='rightFooter'>
 <h4>Follow Us</h4>
        <a href="samoilbarda" target={"blank"}>Instagram</a>
        <a href="samoilbarda" target={"blank"}>Youtube</a>
        <a href="samoilbarda " target={"blank"}>Facebook</a>
 </div>


  </footer>
  )
}

export default footer
