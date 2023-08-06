import Link from 'next/link'
import React from 'react'

const ServiceElement = ({ logo, title, description, slug }) => {
  return (
    <div className='serviceElement'>
      <div className='serviceElementLogo'>
        <img src={`/images/icons/${logo}`} alt={slug} />
      </div>
      <h4>{title}</h4>
      <p>{description}</p>
      <Link href={`/services/${slug}`}>Details</Link>
    </div>
  )
}

export default ServiceElement
