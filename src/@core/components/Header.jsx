import Link from 'next/link'
import { useRouter } from 'next/router'

const Header = () => {
  const router = useRouter()
  const goToRegister = () => router.push('/register')
  const goToLogin = () => router.push('/login')

  return (
    <header>
      <img src='/images/logos/l_fondation_black.png' alt='logo' width='120px' height='80px' />
      <nav>
        <ul>
          <li>
            <Link href='/#landingSection'>Acceuil</Link>
          </li>
          <li>
            <Link href='#'>Services</Link>
          </li>
          <li>
            <Link href='/#about-us'>A propos de nous</Link>
          </li>
          <li>
            <Link href='#contact'>Contact</Link>
          </li>
        </ul>
      </nav>
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
