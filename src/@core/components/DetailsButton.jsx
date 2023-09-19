import React from 'react'

const DetailsButton = ({callback}) => {
  return (
    <span className='serviceElementVMore' onClick={() => callback()}>
      <img src='/images/icons/details.png' alt='view more' width='25px' height='25px' />
      Details
    </span>
  )
}

export default DetailsButton
