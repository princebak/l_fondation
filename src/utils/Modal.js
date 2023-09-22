import * as React from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { FormControl, FormControlLabel, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import { EyeOffOutline, EyeOutline } from 'mdi-material-ui'
import Loader from 'src/@core/components/Loader'
import { useState } from 'react'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

export default function MyModal({ currentMember, updateOpenModal }) {
  const [open, setOpen] = React.useState(true)
  const { name, title, biographies } = currentMember

  const handleClose = () => {
    updateOpenModal(false)
    setOpen(false)
  }

  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <DialogTitle sx={{ m: 0, p: 2, marginRight: '100px' }} id='customized-dialog-title'>
          {name}
          {` (${title})`}
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {biographies.map(bio => (
            <Typography key={name} gutterBottom>
              {bio}
            </Typography>
          ))}
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </div>
  )
}

export function AddAgentModal({ reset }) {
  const [open, setOpen] = useState(true)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const [values, setValues] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    showPassword: false
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const data = {
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      type: 'agent interne',
      password: values.password
    }

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const res = await response.json()

    setLoading(false)

    res.error ? setError(res.error) : reset(res)
  }

  const handleClose = () => {
    reset(null)
    setOpen(false)
  }

  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <DialogTitle sx={{ m: 0, p: 2, marginRight: '100px' }} id='customized-dialog-title'>
          {'Ajout Agent'}
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {error ? <p style={{ color: 'red' }}>{error}</p> : ''}

          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField
              autoFocus
              fullWidth
              id='username'
              label='Nom complet'
              sx={{ marginBottom: 4 }}
              value={values.fullName}
              onChange={handleChange('fullName')}
            />
            <TextField
              fullWidth
              type='email'
              label='Email'
              sx={{ marginBottom: 4 }}
              value={values.email}
              onChange={handleChange('email')}
            />
            <TextField
              fullWidth
              type='tel'
              label='Telephone'
              sx={{ marginBottom: 4 }}
              value={values.phone}
              onChange={handleChange('phone')}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-register-password'>Mot de passe</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-register-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <Loader />
          ) : (
            <Button
              autoFocus
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={e => handleSubmit(e)}
            >
              Enregistrer
            </Button>
          )}
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}
