import Link from 'next/link'

const Header = () => {
  return (
    <header>
      <img src='/images/logos/l_fondation_black.png' alt='logo' width='120px' height='80px' />
      <nav>
        <ul>
          <li>Acceuil</li>
          <li>Services</li>
          <li>A propos de nous</li>
          <li>Contact</li>
        </ul>
      </nav>
      <div className='headerBtnGroup'>
        <Link href=''>Se connecter</Link>
        <Link href=''>S'inscrire</Link>
      </div>
    </header>
  )
}

export default Header
