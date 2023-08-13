import Link from 'next/link'
import React from 'react'
import ViewMore from './ViewMore'

const ServiceElement = ({ logo, title, description, slug }) => {
  return (
    <div className='serviceElement'>
      <div className='serviceElementLogo'>
        <img src={`/images/icons/${logo}`} alt={slug} />
      </div>
      <h4>{title}</h4>
      <p>{description}</p>
      <ViewMore path={`/services/${slug}`} />
    </div>
  )
}

export default ServiceElement
