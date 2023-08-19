import React from 'react'
import Footer from 'src/@core/components/Footer'
import Header from 'src/@core/components/Header'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const AutresServices = () => {
  return (
    <main>
      <Header />
      <h2>AutresServices</h2>
      <Footer />
    </main>
  )
}

AutresServices.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default AutresServices
