import Link from 'next/link'
import ServiceElement from './ServiceElement'

const ServicesSection = () => {
  return (
    <div className='servicesSection' id='servicesSection'>
      <h2>Nos Services</h2>
      <div className='servicesSectionRow1'>
        <ServiceElement
          logo='investment.png'
          title='Épargne'
          description='Nos services d’épargne sont spécialement conçus pour vous permettre de réaliser votre rêve et atteindre vos objectifs financière, indépendamment de votre statut ou d’âge.'
          slug='epargne'
        />
        <ServiceElement
          logo='business-account.png'
          title='Crédit'
          description='Si vous êtes un propriétaire d’entreprise ou un entrepreneur d’affaires qui voudrait prendre votre entreprise à un autre niveau, vous pouvez être assuré que l’un de nos divers produits de prêt vous y rendre.'
          slug='credit'
        />
        <ServiceElement
          logo='child-safe.png'
          title='Autres Services'
          description='Carte visa virtuel, bureau de change, exchange cryptomonnaie, service de paie, l-fondation transfert.'
          slug='autres_services'
        />
      </div>
    </div>
  )
}

export default ServicesSection
