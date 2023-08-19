import React from 'react'
import Breadcrumb from 'src/@core/components/Breadcrumb'
import Footer from 'src/@core/components/Footer'
import Header from 'src/@core/components/Header'
import PageDetails from 'src/@core/components/PageDetails'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { aboutUsDetails } from 'src/@core/utils/resources'

const AboutUs = () => {
  return (
    <main>
      <Header />
      <Breadcrumb pageTitle='Apropos de nous' />
      <PageDetails details={aboutUsDetails} />
      <Footer />
    </main>
  )
}

AboutUs.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default AboutUs
