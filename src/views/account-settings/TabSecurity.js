// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import KeyOutline from 'mdi-material-ui/KeyOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import { useSession } from 'next-auth/react'
import Loader from 'src/@core/components/Loader'

const TabSecurity = () => {
  // ** States
  const [values, setValues] = useState({
    newPassword: '',
    currentPassword: '',
    confirmNewPassword: '',
    showNewPassword: false,
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const { data: session } = useSession()
  const user = session?.user

  // Handle Current Password
  const handleCurrentPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }

  const handleMouseDownCurrentPassword = event => {
    event.preventDefault()
  }

  // Handle New Password
  const handleNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  const handleMouseDownNewPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const handleMouseDownConfirmNewPassword = event => {
    event.preventDefault()
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const { currentPassword, newPassword, confirmNewPassword } = values
    if (newPassword.length < 6) {
      setError('Le mot de passe doit avoir au moins 6 characters.')
    }
    if (newPassword != confirmNewPassword) {
      setError('Le nouveau mot de passe doit correspondre au mot de passe confirmé.')
    }

    const response = await fetch('/api/change_pw', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
        userId: user?._id
      })
    })
    const res = await response.json()
    console.log('User response >> ', res)

    if (res.error) {
      setError(res.error)
    } else {
      setLoading(false)
      setSuccess(true)

      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    }
  }

  return (
    <form>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                {error ? <p style={{ color: 'red' }}>{error}</p> : ''}
                {success ? <p style={{ color: 'green' }}>{'Mot de passe mis a jour.'}</p> : ''}
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-current-password'>Mot de passe actuel</InputLabel>
                  <OutlinedInput
                    label='Mot de passe actuel'
                    value={values.currentPassword}
                    id='account-settings-current-password'
                    type={values.showCurrentPassword ? 'text' : 'password'}
                    onChange={handleCurrentPasswordChange('currentPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={handleMouseDownCurrentPassword}
                        >
                          {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ marginTop: 6 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-new-password'>Nouveau mot de passe</InputLabel>
                  <OutlinedInput
                    label='Nouveau mot de passe'
                    value={values.newPassword}
                    id='account-settings-new-password'
                    onChange={handleNewPasswordChange('newPassword')}
                    type={values.showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowNewPassword}
                          aria-label='toggle password visibility'
                          onMouseDown={handleMouseDownNewPassword}
                        >
                          {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-confirm-new-password'>
                    Confirmer le nouveau mot de passe
                  </InputLabel>
                  <OutlinedInput
                    label='Confirmer le nouveau mot de passe'
                    value={values.confirmNewPassword}
                    id='account-settings-confirm-new-password'
                    type={values.showConfirmNewPassword ? 'text' : 'password'}
                    onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownConfirmNewPassword}
                        >
                          {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}
          >
            <img width={183} alt='avatar' height={256} src='/images/security.png' />
          </Grid>
        </Grid>
      </CardContent>

      <CardContent>
        {!loading ? (
          <Box sx={{ mt: 11 }}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={e => handleSubmit(e)}>
              Sauvegarder
            </Button>
          </Box>
        ) : (
          <Loader />
        )}
      </CardContent>
    </form>
  )
}

export default TabSecurity
