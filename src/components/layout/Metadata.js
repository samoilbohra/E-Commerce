
// This is used to giving the TItle of the page in  react 
import React from 'react'
import Helmet from 'react-helmet'

const Metadata = ({pageTitle}) => {
  return (
    <Helmet>
      <title>{pageTitle}</title>
    </Helmet>
  )
}

export default Metadata
