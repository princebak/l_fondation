import Link from 'next/link'

const AboutSection = () => {
  return (
    <>
      <h2>Apropos de nous</h2>
      <div className='aboutSection'>
        <div className='aboutSectionZ1'>
          <img src='/images/lf2.jpg' alt='Apropos de nous' width='100%' />
        </div>
        <div className='aboutSectionZ2'>
          <h3># Notre Mission</h3>
          <p>
            Notre mission est de réduire la pauvreté grâce à des solutions durables qui permettent aux gens d’accumuler
            des richesses durables, de créer des emplois et d’améliorer leur niveau de vie
          </p>
          <h3># Notre Vision</h3>
          <p>
            Notre vision est de construire un réseau international d’entreprises durables et variables qui améliorent
            les niveaux des vies de gens dans le monde entier.
          </p>

          <span>
            <Link href='/about-us'>Lire plus</Link>
          </span>
        </div>
      </div>
    </>
  )
}

export default AboutSection
