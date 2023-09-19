import React, { useState } from 'react'

const Accordion = ({ description, children }) => {
  const [heightValue, setHeightValue] = useState(null)

  const toggle = e => {
    if (heightValue == null) {
      setHeightValue('100%')
    } else {
      setHeightValue(null)
    }
  }

  return (
    <>
      <button className='accordion' onClick={e => toggle(e)}>
        {description}
      </button>
      <div className='panel' style={{ maxHeight: heightValue || null }}>
        {children}
      </div>
    </>
  )
}

export default Accordion
