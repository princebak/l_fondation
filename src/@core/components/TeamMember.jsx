import React from 'react'

const TeamMember = ({ imgUrl, name, title }) => {
  return (
    <div className='teamMember'>
      <div>
        <img src={imgUrl} alt={name} />
      </div>
      <div>
        <span>{name}</span>
        <span>{title}</span>
      </div>
    </div>
  )
}

export default TeamMember
