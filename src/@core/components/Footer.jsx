import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className='footerElement' id='footerSection'>
        <h2>Liens utiles</h2>
        <nav className='footerMenu'>
          <ul>
            <li>
              <img src='/images/label-icons/link-w.png' alt='link' />
              <Link href='#headerSection'>Acceuil</Link>
            </li>
            <li>
              <img src='/images/label-icons/link-w.png' alt='link' />
              <Link href='#servicesSection'>Services</Link>
            </li>
            <li>
              <img src='/images/label-icons/link-w.png' alt='link' />
              <Link href='#aboutSection'>A propos de nous</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className='footerElement'>
        <h2>Contact</h2>
        <ul>
          <li>
            <img src='/images/label-icons/email-w.png' alt='email' />
            <span>
              <a href='mailto:lingombafondation@gmail.com'>lingombafondation@gmail.com</a>
            </span>
          </li>
          <li>
            <img src='/images/label-icons/phone-w.png' alt='phone' />
            <span>
              <a href='tel:+243824171039'>+243 824 171 039</a>
            </span>
          </li>
          <li>
            <img src='/images/label-icons/address-w.png' alt='phone' />
            <span>Kinshasa, Democratic Republic of the Congo</span>
          </li>
          <li id='socialNetworks'>
            <a href='#' className='socialNetwork'>
              <img src='/images/label-icons/linkedin-w.png' alt='linkedin' />
            </a>
            <a href='https://web.facebook.com/profile.php?id=100063692093328' className='socialNetwork'>
              <img src='/images/label-icons/facebook-w.png' alt='facebook' />
            </a>
          </li>
        </ul>
      </div>
      <div className='footerElement'>
        <h2>Rejoigniez nous</h2>
        <div className='footerBtnGroup'>
          <button className='btnFilled' onClick={() => goToRegister()}>
            S'inscrire
          </button>
          <button className='btnNotFilled' onClick={() => goToLogin()}>
            Se connecter
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
