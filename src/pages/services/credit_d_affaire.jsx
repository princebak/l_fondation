import React from 'react'
import Footer from 'src/@core/components/Footer'
import Header from 'src/@core/components/Header'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const CreditDAffaire = () => {
  return (
    <main>
      <Header />
      <h2>CreditDAffaire</h2>
      <Footer />
    </main>
  )
}

CreditDAffaire.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default CreditDAffaire
