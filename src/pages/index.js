// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

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

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Custom Imports
import Header from 'src/@core/components/Header'
import LandingSection from 'src/@core/components/LandingSection'
import AboutSection from 'src/@core/components/AboutSection'
import ServicesSection from 'src/@core/components/ServicesSection'
import SectionsSeparator from 'src/@core/components/SectionsSeparator'
import TestimonialsSection from 'src/@core/components/TestimonialsSection'
import PartnersSection from 'src/@core/components/PartnersSection'
import Footer from 'src/@core/components/Footer'

const HomePage = () => {
  // ** State

  return (
    <main>
      <Header />
      <LandingSection />
      <ServicesSection />
      <AboutSection />
      <SectionsSeparator />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
HomePage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default HomePage
