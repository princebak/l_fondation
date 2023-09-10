import React from 'react'
import Breadcrumb from 'src/@core/components/Breadcrumb'
import Footer from 'src/@core/components/Footer'
import Header from 'src/@core/components/Header'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const Epargne = () => {
  return (
    <main>
      <Header />
      <Breadcrumb pageTitle='Services' pageSubTitle='Epargne' />
      <div style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
        <p>
          <em>Il y’a trois types d’épargne :</em>
        </p>
        <div className='subService'>
          <div>
            <h2>Compte sauvetages</h2>
            <div>
              <ul>
                <li>
                  Un compte rentable et flexible qui permet l’utilisateur d’accumuler des économies grâce à
                  l’accumulation d’intérêts et un accès facile à ses fonds.
                </li>
                <li>Gardez votre argent là où il est sûr, sécurisé et facilement accessible</li>
                <li>
                  Nous savons à quel point l'argent est difficile à gagner, L-fondation agit en toute transparence,
                  crédibilité et loyauté envers ses clients. Aucun centime du client ne peut se perdre
                </li>
                <li>Disponible pour toute personne de 18 ans et plus</li>
                <li>
                  Photo passeport gratuite prise à la branche D’un minimum de 1 $ US, vous pouvez ouvrir un compte et
                  faire croître votre épargne Ce compte vous offre un accès illimité à votre argent à travers toutes nos
                  Agences et tout agent en République démocratique du Congo
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2>Compte Libota</h2>
            <div>
              <ul>
                <li>
                  Le Compte Libota Avenir” est conçu pour répondre aux besoins bancaires des enfants de 0 à 24 ans.
                  Apprenez à vos enfants comment gérer l’argent à partir d’un bas âge c’est très capital
                </li>
                <li>
                  Ouvrez un compte Libota Avenir” pour vos enfants et exploitez le pour leur compte jusqu’à ce qu’ils
                  soient adultes (18 ans) Effectuez un dépôt minimum d’ouverture de USD 3 seulement Présentez votre
                  pièce d’identité valide et la photo d’identité de l’enfant
                </li>
                <li>
                  Visitez n’ importe quelle Agence à travers le pays et vous serez guidé à travers un service simple et
                  rapide
                </li>
                <li>
                  <p>Les bonus sur ce compte sont immenses :</p>
                  <ul>
                    <li>Gagnez un taux d’intérêt concurrentiel de 7% par an sur un solde minimum de 5 USD</li>
                    <li>Aucun frais de gestion sur ce compte</li>
                    <li>Retraits et dépôts gratuits</li>
                    <li>Pas de frais interprofessionnels</li>
                    <li>Pas de frais de réactivation de compte</li>
                    <li>Relevé de compte disponible sur demande</li>
                    <li>Délai d’exécution rapide pour accéder aux services</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2>Compte bloqué</h2>
            <div>
              <ul>
                <li>Le compte Bloqué facilite vos opérations épargne quotidiennes avec beaucoup de simplicité</li>
                <li>
                  Retraits et dépôts à toutes nos Agences et agent travers le pays Un taux de 5% d’intérêt l’année vous
                  est versé sur le compte courant
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='rotate' style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <img src='/images/services/s1.jpeg' width='50%' height='50%' />
        </div>
      </div>
      <Footer />
    </main>
  )
}

Epargne.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Epargne
