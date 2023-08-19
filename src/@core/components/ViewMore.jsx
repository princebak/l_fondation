import Link from 'next/link'
import React from 'react'

const ViewMore = ({ path }) => {
  return (
    <Link href={path}>
      <span className='serviceElementVMore'>
        <img src='/images/icons/view-more.png' alt='view more' width='25px' height='25px' />
        Voir plus
      </span>
    </Link>
  )
}

export default ViewMore
