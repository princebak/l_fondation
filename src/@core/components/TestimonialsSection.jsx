const TestimonialsSection = () => {
  return (
    <section className='quoteZoneWrapper'>
      <h2>Temoignages</h2>
      <div className='quoteZone'>
        <div className='quote'>
          <div className='quoteImg'>
            <img src='/images/c1.jpg' alt='client1' />
          </div>
          <q>
            Je suis heureuse de vous dire que grace a lingomba fondation, j'ai amelioré mon chiffre d'affaire de 30%
          </q>
        </div>

        <div className='quote'>
          <q>
            Je suis heureuse de vous dire que grace a lingomba fondation, j'ai amelioré mon chiffre d'affaire de 20%
          </q>

          <div className='quoteImg'>
            <img src='/images/c2.jpg' alt='client2' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
