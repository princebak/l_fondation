// ** React Imports
import { forwardRef, useState } from 'react'
import DatePicker from 'react-datepicker'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { useSession } from 'next-auth/react'
import { MEMBER } from 'src/utils/constant'
import Loader from 'src/@core/components/Loader'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Date de naissance *' autoComplete='off' />
})

const TabAccount = () => {
  // ** State
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const { data: session, update } = useSession()
  const [user, setUser] = useState(session?.user)
  const [openAlert, setOpenAlert] = useState(user?.state != MEMBER)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const response = await fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const res = await response.json()
    console.log('User response >> ', res)

    if (res.error) {
      setError(res.error)
    } else {
      setLoading(false)
      await update({
        ...session,
        user: {
          ...user
        }
      })

      setSuccess(true)

      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    }
  }

  const resetProfile = e => {
    e.preventDefault()
    setUser(session?.user)
  }

  return (
    <CardContent>
      <form>
        {error ? <p style={{ color: 'red' }}>{error}</p> : ''}
        {success ? <p style={{ color: 'green' }}>{'Profil Mise à jour avec success.'}</p> : ''}

        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <span style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', fontSize: '20px' }}>
                  <strong>{user?.fullName + ' :'}</strong>
                  <strong>{user?.code}</strong>
                </span>

                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  {user?.type}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='email' label='Email *' placeholder='email' value={user?.email} disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Nom *'
              placeholder='Nom'
              value={user?.fullName}
              onChange={e => setUser({ ...user, fullName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Téléphone *'
              placeholder='0828414084'
              value={user?.phone}
              onChange={e => setUser({ ...user, phone: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Genre *</InputLabel>
              <Select label='Genre *' value={user?.gender} onChange={e => setUser({ ...user, gender: e.target.value })}>
                <MenuItem value='Homme'>Homme</MenuItem>
                <MenuItem value='Femme'>Femme</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              selected={user ? new Date(user.dob) : ""}
              showYearDropdown
              showMonthDropdown
              placeholderText='MM-DD-YYYY'
              customInput={<CustomInput />}
              id='form-layouts-separator-date'
              onChange={date => setUser({ ...user, dob: date })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Etat civil *</InputLabel>
              <Select
                label='Etat civil *'
                value={user?.maritalStatus}
                onChange={e => setUser({ ...user, maritalStatus: e.target.value })}
              >
                <MenuItem value='célibataire'>Célibataire</MenuItem>
                <MenuItem value='marié'>Marié</MenuItem>
                <MenuItem value='divorcé'>Divorcé</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              label='Adresse *'
              minRows={2}
              placeholder='Adresse'
              value={user?.address}
              onChange={e => setUser({ ...user, address: e.target.value })}
            />{' '}
          </Grid>

          {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}

                /*  action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                } */
              >
                <AlertTitle>
                  Vous n'etes pas encore membre de lingomba fondation, donc vous ne pouvez profiter de tout nos offres.
                </AlertTitle>
                <Link href='/' onClick={e => e.preventDefault()}>
                  Pour devenir membre il faut : mettre a jour le profile, envoyer certains documents, atendre la
                  validation de l'administrateur, et faire votre premier depot de 1$.
                </Link>
              </Alert>
            </Grid>
          ) : null}

          <Grid item xs={12}>
            {loading ? (
              <Loader />
            ) : (
              <>
                <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={e => handleSubmit(e)}>
                  Sauvegarder
                </Button>
                <Button type='reset' variant='outlined' color='secondary' onClick={e => resetProfile(e)}>
                  Annuler
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
