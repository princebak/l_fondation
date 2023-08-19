import React from 'react'
import Footer from 'src/@core/components/Footer'
import Header from 'src/@core/components/Header'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const Epargne = () => {
  return (
    <main>
      <Header />
      <h2>Epargne</h2>
      <Footer />
    </main>
  )
}

Epargne.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Epargne
