import React from 'react'
import Breadcrumb from 'src/@core/components/Breadcrumb'
import Footer from 'src/@core/components/Footer'
import Header from 'src/@core/components/Header'
import PageDetails from 'src/@core/components/PageDetails'
import TeamMember from 'src/@core/components/TeamMember'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { aboutUsDetails } from 'src/@core/utils/resources'

const AboutUs = () => {
  return (
    <main>
      <Header />
      <Breadcrumb pageTitle='Apropos de nous' />
      <PageDetails details={aboutUsDetails} />
      <div className='teamSection'>
        <h2>Notre Equipe</h2>
        <div className='team'>
          <TeamMember imgUrl='/images/teams/steve.jpeg' name='Steve Balifa' title='CEO & Founder' />
          <TeamMember imgUrl='/images/teams/presdel.jpeg' name='Mubaka Kasanda Presdel' title='Manager' />
          <TeamMember imgUrl='/images/teams/axel.jpeg' name='Kapuya Mundi Axel' title='Manager' />
          <TeamMember imgUrl='/images/teams/gloria.jpeg' name='Mwinda Kalombo Gloria' title='Secrétaire' />
        </div>
      </div>
      <Footer />
    </main>
  )
}

AboutUs.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default AboutUs
