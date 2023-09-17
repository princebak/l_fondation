import React from 'react'

const TeamMember = ({ imgUrl, name, title, showBiography }) => {
  return (
    <div className='teamMember'>
      <div>
        <img src={imgUrl} alt={name} />
      </div>
      <div>
        <span>{name}</span>
        <span>{title}</span>
        <button id={name} onClick={showBiography}>
          Biographie
        </button>
      </div>
    </div>
  )
}

export default TeamMember
