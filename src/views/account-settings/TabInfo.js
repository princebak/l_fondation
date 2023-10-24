// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useSession } from 'next-auth/react'
import Loader from 'src/@core/components/Loader'
import { EMAIL_VALIDATED } from 'src/utils/constant'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

const TabInfo = () => {
  // ** State
  const [ppFile, setPpFile] = useState([])
  const [icFile, setIcFile] = useState([])

  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const { data: session, update } = useSession()
  const [user, setUser] = useState(session?.user)

  const [ppfileLink, setPpFileLink] = useState(user?.passportPicUrl)
  const [icfileLink, setIcFileLink] = useState(user?.identityCardUrl)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const ppFileToUpload = ppFile[0]
    const icFileToUpload = icFile[0]

    if(user?.status === EMAIL_VALIDATED){
      setError("Veuillez d'abord compléter les informations de votre profil avant le Téléchargement des document.")
    }

    if (ppFileToUpload.size > 2000000 || icFileToUpload.size > 2000000) {
      // 2 Mb
      setError("La taille maximum d'un fichier est de 2 Mb.")

      return
    }

    if (!ppFileToUpload || !icFileToUpload) {
      setError('Vous devez envoyer les deux fichiers.')

      return
    }

    console.log('ppFileToUpload >> ', ppFileToUpload)
    console.log('icFileToUpload >> ', icFileToUpload)
    const formDataPP = new FormData()
    const formDataIC = new FormData()

    formDataPP.append('file', ppFileToUpload)
    formDataPP.append('upload_preset', 'l_fondation')

    formDataIC.append('file', icFileToUpload)
    formDataIC.append('upload_preset', 'l_fondation')

    const ppUploadResponse = await fetch('https://api.cloudinary.com/v1_1/pribakil/image/upload', {
      method: 'POST',
      body: formDataPP
    })

    const icUploadResponse = await fetch('https://api.cloudinary.com/v1_1/pribakil/image/upload', {
      method: 'POST',
      body: formDataIC
    })

    const ppResponse = await ppUploadResponse.json()
    const icResponse = await icUploadResponse.json()

    /* setFileLink(ppResponse.secure_url)
    setFileName(ppResponse.original_filename)
    setFileExtension(ppResponse.format) */

    const updatingUser = {
      ...user,
      passportPicUrl: ppResponse.secure_url,
      identityCardUrl: icResponse.secure_url
    }
    setPpFileLink(ppResponse.secure_url)
    setIcFileLink(icResponse.secure_url)

    await updateUser(updatingUser)

    setSuccess(true)

    setPpFile([])
    setIcFile([])
    setLoading(false)

    setTimeout(() => {
      setSuccess(false)
    }, 3000)
    console.log('Upload Responses >> ', { ppResponse, icResponse })
  }

  const updateUser = async user => {
    const ppResponse = await fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const res = await ppResponse.json()
    console.log('User ppResponse >> ', res)

    if (res.error) {
      setError(res.error)
    } else {
      await update({
        ...session,
        user: {
          ...user
        }
      })
    }
  }

  return (
    <CardContent>
      <form>
        {error ? <p style={{ color: 'red' }}>{error}</p> : ''}
        {success ? <p style={{ color: 'green' }}>{'Téléchargement des documents fait avec success.'}</p> : ''}

        <Grid container spacing={7}>
          <Grid item xs={12} md={6} sx={{ marginTop: 4.8 }}>
            <label>Photo passport</label>
            <br />
            {user?.passportPicUrl ? (
              <span>Vous avez déjà téléchargé un photo passport.</span>
            ) : (
              <TextField fullWidth type={'file'} onChange={e => setPpFile([...ppFile, e.target.files[0]])} />
            )}
          </Grid>

          <Grid item xs={12} md={6} sx={{ marginTop: 4.8 }}>
            <a href={ppfileLink} target='_blank' rel='noreferrer'>
              <img src={ppfileLink} alt="Aucun fichier n'a été téléchargé" style={{ width: '100%' }} />
            </a>
          </Grid>

          <Grid item xs={12} sx={{ marginTop: 4.8 }}>
            <hr />
          </Grid>

          <Grid item xs={12} md={6} sx={{ marginTop: 4.8 }}>
            <label>Carte d'identité</label>
            <br />

            {user?.passportPicUrl ? (
              <span>Vous avez déjà téléchargé une Carte d'identité.</span>
            ) : (
              <TextField fullWidth type={'file'} onChange={e => setIcFile([...icFile, e.target.files[0]])} />
            )}
          </Grid>

          <Grid item xs={12} md={6} sx={{ marginTop: 4.8 }}>
            <a href={icfileLink} target='_blank' rel='noreferrer'>
              <img src={icfileLink} alt="Aucun fichier n'a été téléchargé" style={{ width: '100%' }} />
            </a>
          </Grid>

          {/* <Grid item xs={12} sm={6}>
            <DatePickerWrapper>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                id='account-settings-date'
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                onChange={date => setDate(date)}
              />
            </DatePickerWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='number' label='Phone' placeholder='(123) 456-7890' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Website'
              placeholder='https://example.com/'
              defaultValue='https://themeselection.com/'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select label='Country' defaultValue='USA'>
                <MenuItem value='USA'>USA</MenuItem>
                <MenuItem value='UK'>UK</MenuItem>
                <MenuItem value='Australia'>Australia</MenuItem>
                <MenuItem value='Germany'>Germany</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id='form-layouts-separator-multiple-select-label'>Languages</InputLabel>
              <Select
                multiple
                defaultValue={['English']}
                id='account-settings-multiple-select'
                labelId='account-settings-multiple-select-label'
                input={<OutlinedInput label='Languages' id='select-multiple-language' />}
              >
                <MenuItem value='English'>English</MenuItem>
                <MenuItem value='French'>French</MenuItem>
                <MenuItem value='Spanish'>Spanish</MenuItem>
                <MenuItem value='Portuguese'>Portuguese</MenuItem>
                <MenuItem value='Italian'>Italian</MenuItem>
                <MenuItem value='German'>German</MenuItem>
                <MenuItem value='Arabic'>Arabic</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel sx={{ fontSize: '0.875rem' }}>Gender</FormLabel>
              <RadioGroup row defaultValue='male' aria-label='gender' name='account-settings-info-radio'>
                <FormControlLabel value='male' label='Male' control={<Radio />} />
                <FormControlLabel value='female' label='Female' control={<Radio />} />
                <FormControlLabel value='other' label='Other' control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </Grid> */}

          <Grid item xs={12}>
            {loading ? (
              <Loader />
            ) : (
              !user?.passportPicUrl && (
                <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={e => handleSubmit(e)}>
                  Sauvegarder
                </Button>
              )
            )}
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabInfo
