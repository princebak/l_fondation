import Link from 'next/link'
import ServiceElement from './ServiceElement'

const ServicesSection = () => {
  return (
    <div className='servicesSection'>
      <h2>Nos Services</h2>
      <div className='servicesSectionRow1'>
        <ServiceElement
          logo='investment.png'
          title='Épargne'
          description='Très facile a ouvrir et facile à utiliser ! C’est un compte transactionnel adapté à vous donner un accès sans soucis à votre argent quand vous en avez besoin à chaque seconde '
          slug='epargne'
        />
        <ServiceElement
          logo='website-locked.png'
          title='Compte bloqué'
          description='Le compte Bloqué Falanga facilite vos opérations quotidiennes avec beaucoup de simplicité Retraits et dépôts à toutes nos Agences et agent travers le pays Un taux de 5% d’intérêt l’année vous est versé sur le compte courant '
          slug='compte_bloqué'
        />
        <ServiceElement
          logo='child-safe.png'
          title='Compte Libota'
          description='Le Compte Libota Avenir est conçu pour répondre aux besoins bancaires des enfants de 0 à 24 ans. Apprenez à vos enfants comment gérer l’argent à partir d’un bas âge c’est très capital'
          slug='compte_libota'
        />
      </div>

      <div className='servicesSectionRow2'>
        <ServiceElement
          logo='business-account.png'
          title='Credit D’affaire'
          description='Une installation à court et à moyen terme de crédit qui est spécialement conçu pour financer les opérations commerciales des petites et moyennes entreprises'
          slug='credit_d_affaire'
        />
        <ServiceElement
          logo='merchant-account.png'
          title='Crédit au petit entreprise'
          description='Prêts rapides pour booster votre business Crédit de petites Entreprises est facilement accessible, avec des taux d’intérêt très compétitifs et documentation minimale requise.'
          slug='credit_petit_entreprise'
        />
      </div>
    </div>
  )
}

export default ServicesSection
