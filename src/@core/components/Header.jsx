import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Header = () => {
  const router = useRouter()
  const goToRegister = () => router.push('/register')
  const goToLogin = () => router.push('/login')

  const [displayMobileMenu, setDisplayMobileMenu] = useState(false)

  return (
    <header id='headerSection'>
      <img src='/images/logos/l_fondation_black.png' alt='logo' width='120px' height='80px' />

      <div className='navZone'>
        <button onClick={() => setDisplayMobileMenu(!displayMobileMenu)}>
          <hr />
          <hr />
          <hr />
        </button>
        <nav className='pcMenu'>
          <ul>
            <li>
              <Link href='#headerSection'>Acceuil</Link>
            </li>
            <li>
              <Link href='#servicesSection'>Services</Link>
            </li>
            <li>
              <Link href='#aboutSection'>A propos de nous</Link>
            </li>
            <li>
              <Link href='#footerSection'>Contact</Link>
            </li>
          </ul>
        </nav>
        {displayMobileMenu && (
          <nav className='mobileMenu'>
            <ul>
              <li>
                <Link href='#headerSection'>Acceuil</Link>
              </li>
              <li>
                <Link href='#servicesSection'>Services</Link>
              </li>
              <li>
                <Link href='#aboutSection'>A propos de nous</Link>
              </li>
              <li>
                <Link href='#footerSection'>Contact</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>

      <div className='headerBtnGroup'>
        <button className='btnNotFilled' onClick={() => goToLogin()}>
          Se connecter
        </button>
        <button className='btnFilled' onClick={() => goToRegister()}>
          S'inscrire
        </button>
      </div>
    </header>
  )
}

export default Header
