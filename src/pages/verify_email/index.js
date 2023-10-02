// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import Loader from 'src/@core/components/Loader'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const VerifyEmailPage = () => {
  // ** State
  const [code, setCode] = useState('')

  // ** Hook
  const theme = useTheme()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { data: session } = useSession()

  const loginMsg = {
    invalidCode: 'Le code entrez est invalid.'
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const validateForm = {
      email: session?.user?.email,
      code: code

      // callbackUrl: `${window.location.origin}`,
    }

    const response = await fetch('/api/validate_code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(validateForm)
    })

    const res = await response.json()
    console.log('User response >> ', res)

    res.error ? setError(res.error) : router.push('/dashboard')

    setLoading(false)
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Link href='/' passHref>
              <img
                style={{ cursor: 'pointer' }}
                src='/images/logos/l_fondation_black.png'
                width='25%'
                height='25%'
                alt='logo'
              />
            </Link>
            <Link href='/' passHref>
              <Typography
                style={{ cursor: 'pointer' }}
                variant='h6'
                sx={{
                  ml: 3,
                  lineHeight: 1,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '1.5rem !important'
                }}
              >
                {themeConfig.templateName}
              </Typography>
            </Link>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Bienvenue à {themeConfig.templateName}! 👋🏻
            </Typography>
            <Typography variant='body2'>Entrez le code de verification, envoye dans votre e-mail</Typography>
          </Box>
          {error ? <p style={{ color: 'red' }}>{error}</p> : ''}

          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField
              autoFocus
              fullWidth
              id='code'
              label='Code'
              sx={{ marginBottom: 4 }}
              value={code}
              onChange={e => setCode(e.target.value)}
              required
            />
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            ></Box>
            {loading ? (
              <Loader />
            ) : (
              <Button
                fullWidth
                size='large'
                variant='contained'
                sx={{ marginBottom: 7 }}
                onClick={e => handleSubmit(e)}
              >
                Valider
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
      {/* <FooterIllustrationsV1 /> */}
    </Box>
  )
}
VerifyEmailPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default VerifyEmailPage
