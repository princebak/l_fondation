import Link from 'next/link'
import React from 'react'

const Breadcrumb = ({ pageTitle }) => {
  return (
    <div className='breadcrumb'>
      <span>
        <Link href='/'>Accueil</Link>
      </span>
      <span>{'>>'}</span>
      <span>{pageTitle}</span>
    </div>
  )
}

export default Breadcrumb
