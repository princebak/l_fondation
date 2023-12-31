// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import { LinkBoxOutline } from 'mdi-material-ui'

const navigation = userType => {
  const mainMenuLinks = [
    {
      title: 'Retour Sur le Site',
      icon: LinkBoxOutline,
      path: '/'
    },
    {
      title: 'Tableau de bord',
      icon: HomeOutline,
      path: '/dashboard'
    }

    // {
    //   title: 'Upload File',
    //   icon: LinkBoxOutline,
    //   path: '/upload'
    // }
  ]

  const accountMenu = {
    title: 'Comptes',
    icon: CreditCardOutline,
    path: '/accounts'
  }

  const moreMenuLinks = [
    {
      title: 'Clients',
      icon: AccountCogOutline,
      path: '/clients'
    },
    {
      title: 'Agents',
      icon: AccountCogOutline,
      path: '/agents'
    },

    {
      title: 'Mouvements',
      icon: Table,
      path: '/movements'
    }

    /* {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/pages/login',
      openInNewTab: true
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/pages/register',
      openInNewTab: true
    },
    {
      title: 'Error',
      icon: AlertCircleOutline,
      path: '/pages/error',
      openInNewTab: true
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Typography',
      icon: FormatLetterCase,
      path: '/typography'
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    } */
  ]

  if (userType === 'admin' || userType === 'super admin') {
    mainMenuLinks = [...mainMenuLinks, accountMenu, ...moreMenuLinks]
  }
  if (userType?.includes('agent')) {
    mainMenuLinks = [...mainMenuLinks, accountMenu]
  }

  return mainMenuLinks
}

export default navigation
