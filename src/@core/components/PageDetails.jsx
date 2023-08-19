import React from 'react'

const PageDetails = ({ details }) => {
  return (
    <div className='pageDetails'>
      {details.map((detail, index) =>
        index % 2 != 0 ? ( // Odd
          <div key={index} className='detail'>
            <h2>{detail.title}</h2>
            <div className='description'>{detail.description}</div>
            <div className='image'>
              <img src={detail.image} alt={detail.title} />
            </div>
          </div> // even
        ) : (
          <div key={index} className='detail'>
            <h2>{detail.title}</h2>
            <div className='image'>
              <img src={detail.image} alt={detail.title} />
            </div>
            <div className='description'>{detail.description}</div>
          </div>
        )
      )}
    </div>
  )
}

export default PageDetails
