import React, { useState } from 'react'
import Breadcrumb from 'src/@core/components/Breadcrumb'
import Footer from 'src/@core/components/Footer'
import Header from 'src/@core/components/Header'
import TeamMember from 'src/@core/components/TeamMember'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { aboutUsDetails } from 'src/@core/utils/resources'
import MyModal from 'src/utils/Modal'

const AboutUs = () => {
  const teamMembers = [
    {
      imgUrl: '/images/teams/steve.jpeg',
      name: 'Steve Balifa',
      title: 'CEO & Founder',
      biographies: ['presidents, chef patron, courageux']
    },
    {
      imgUrl: '/images/teams/presdel.jpeg',
      name: 'Mubaka Kasanda Presdel',
      title: 'Manager',
      biographies: ['---', '---']
    },
    { imgUrl: '/images/teams/axel.jpeg', name: 'Kapuya Mundi Axel', title: 'Manager', biographies: ['---', '---'] },
    {
      imgUrl: '/images/teams/gloria.jpeg',
      name: 'Mwinda Kalombo Gloria',
      title: 'Secrétaire',
      biographies: ['---', '---']
    }
  ]

  const [currentMember, setCurrentMember] = useState(teamMembers[0])
  const [openModal, setOpenModal] = useState(false)

  const showBiography = name => {
    console.log('In showBiography >> ', name)
    setCurrentMember(teamMembers.find(member => member.name === name))
    setOpenModal(true)
  }

  return (
    <main>
      <Header />
      <Breadcrumb pageTitle='Apropos de nous' />
      <div style={{ backgroundColor: '#fff' }}>
        <section className='quoteZoneWrapper'>
          <h2>Notre mission</h2>
          <div className='quoteZone'>
            <div className='quote'>
              <div className='quoteImg'>
                <img src='/images/c1.jpg' alt='client1' />
              </div>
              <q>
                Notre mission est de réduire la pauvreté grâce à des solutions durables qui permettent aux gens
                d’accumuler des richesses durables, de créer des emplois et d’améliorer leur niveau de vie.
              </q>
            </div>
          </div>
        </section>
        <section className='quoteZoneWrapper'>
          <h2>Notre vision</h2>
          <div className='quoteZone'>
            <div className='quote' id='quoteReverse'>
              <q>
                Notre vision est de construire un réseau international d’entreprises durables et variables qui
                améliorent les niveaux des vies de gens dans le monde entier.
              </q>
              <div className='quoteImg'>
                <img src='/images/c2.jpg' alt='client2' />
              </div>
            </div>
          </div>
        </section>
        {/* <PageDetails details={aboutUsDetails} /> */}
        <div className='teamSection'>
          <h2>Notre Equipe</h2>
          <div className='team'>
            {teamMembers.map(member => (
              <TeamMember
                showBiography={() => showBiography(member.name)}
                key={member.name}
                imgUrl={member.imgUrl}
                name={member.name}
                title={member.title}
              />
            ))}
          </div>
        </div>
      </div>
      {openModal ? <MyModal updateOpenModal={setOpenModal} currentMember={currentMember} /> : ''}
      <Footer />
    </main>
  )
}

AboutUs.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default AboutUs
