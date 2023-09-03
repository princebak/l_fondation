import Link from 'next/link'
import React from 'react'

const Breadcrumb = ({ pageTitle, pageSubTitle }) => {
  return (
    <div className='breadcrumb'>
      <span>
        <Link href='/'>Accueil</Link>
      </span>
      <span>{'>>'}</span>
      {pageSubTitle ? (
        <>
          <span>
            <Link href='/#servicesSection'>{pageTitle}</Link>
          </span>{' '}
          <span>{'>>'}</span>
          <span>{pageSubTitle}</span>
        </>
      ) : (
        <span>{pageTitle}</span>
      )}
    </div>
  )
}

export default Breadcrumb
