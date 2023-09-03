import React from 'react'
import Breadcrumb from 'src/@core/components/Breadcrumb'
import Footer from 'src/@core/components/Footer'
import Header from 'src/@core/components/Header'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const CreditDAffaire = () => {
  return (
    <main>
      <Header />
      <Breadcrumb pageTitle='Services' pageSubTitle='Epargne' />
      <div style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
        <p>
          <em>Il y’a quatre types de crédit :</em>
        </p>
        <div className='subService'>
          <div>
            <h2>Crédit d’affaire</h2>
            <div>
              <ul>
                <li>
                  Une installation à court et à moyen terme de crédit qui est spécialement conçu pour financer les
                  opérations commerciales des petites et moyennes entreprises
                </li>
                <li>
                  Amenez votre entreprise à un niveau supérieur Une installation à court et à moyen terme de crédit qui
                  est spécialement conçu pour financer les opérations commerciales des petites et moyennes entreprises.
                </li>
                <li>
                  <p>Pourquoi demander ce crédit ?</p>
                  <ul>
                    <li>Facilite la performance des entreprises et la croissance</li>
                    <li>Plans de remboursement à long terme de prêt flexible</li>
                    <li>Montant du prêt dépend de la performance des entreprises</li>
                    <li>Charge donc la lumière sur le client</li>
                    <li>Taux d’intérêt concurrentiel</li>
                    <li></li>
                  </ul>
                </li>
                <li>
                  <p>Eligibilité pour ce crédit : </p>
                  <ul>
                    <li>Les personnes ou entreprises avec des activités opérationnelles</li>
                    <li>Le candidat doit être âgé de 18 ans et plus</li>
                    <li>Au moins 6 mois d’existence et d’activité d’affaires</li>
                    <li>La possession d’une licence de commerce Garant</li>
                  </ul>
                </li>
                <li>
                  <p>Accordé avec des avantages exceptionnels : </p>
                  <ul>
                    <li>Facilité de crédit pouvant aller jusqu’à 20.000 US $</li>
                    <li>Conditions et les périodes de remboursement souples 3 – 12 Mois</li>
                    <li>Exigences de garanties flexibles</li>
                    <li>Un traitement plus rapide de prêt (dans les 7 jours)</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2>Crédit au petit entreprise</h2>
            <div>
              <ul>
                <li>
                  Prêts rapides pour booster votre business Crédit de petites Entreprises est facilement accessible,
                  avec des taux d’intérêt très compétitifs et documentation minimale requise.
                </li>
                <li>
                  <p>Avantages</p>
                  <ul>
                    <li>Taux d’intérêt concurrentiels avec des frais minimes</li>
                    <li>Temps de traitement de prêt rapide</li>
                    <li>Un service personnalisé</li>
                    <li>Caractéristiques supplémentaires</li>
                    <li>Contant du prêt varie de $ 50 usd à $ 30,000 usd</li>
                  </ul>
                </li>
                <li>
                  Flexibilité sur la sécurité engagée (fonds de commerce, les véhicules automobiles, les biens meubles)
                  le crédit de petites et moyennes entreprises est adapté pour des entrepreneurs de petite et moyenne
                  échelle qui ont besoin d’injection de capitaux pour faire croître leur entreprise ou d’acquérir les
                  actifs de l’entreprise.
                </li>
                <li>
                  <p>Exigences :</p>
                  <ul>
                    <li>Nécessité de posséder une entreprise</li>
                    <li>Etre âgés de 21 ans et plus</li>
                    <li>Doit être résident congolais</li>
                  </ul>
                </li>

                <li>
                  <p>Termes et Conditions :</p>
                  <ul>
                    <li>Au moins 1 année d’exploitation d’une entreprise</li>
                    <li> Au moins 1 an dans un endroit d’affaire actuel</li>
                    <li> Au moins 1 an dans le lieu de résidence actuelle</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2>Crédit scolaire</h2>
            <div>
              <ul>
                <li>
                  L’avenir se prépare aujourd’hui !<br />
                  Souscrivez au crédit Scolaire plus et préparez calmement la rentrée scolaire de vos enfants.
                </li>
                <li>Délai de remboursement: 13 mois maximum.</li>
                <li>
                  <p>
                    Ne vous tracassez plus, ci-dessous les documents à fournir pour bénéficier du crédit scolaire en
                    toute simplicité :
                  </p>
                  <ul>
                    <li>Une demande manuscrite</li>
                    <li>Une photocopie de votre CNI</li>
                    <li>Un contrat de travail (pour les salariés)</li>
                    <li>Une garantie (pour les non-salariés)</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2>Crédit universitaire</h2>
            <div>
              <ul>
                <li>
                  Des soucis pour la rentrée universitaire de vos nouveaux étudiants ? <br />
                  L-fondation la solution!
                </li>
                <li>Avec L-fondation vous pouvez obtenir un crédit pour tout et nous ne blaguons pas !</li>
                <li>
                  <p>
                    Ne vous tracassez plus, ci-dessous les documents à fournir pour bénéficier du crédit universitaire
                    en toute simplicité :
                  </p>
                  <ul>
                    <li>Une demande manuscrite</li>
                    <li>Une photocopie de votre CNI</li>
                    <li>Un contrat de travail (pour les salariés)</li>
                    <li>Une garantie (pour les non-salariés)</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='rotate' style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <img src='/images/services/s2.jpeg' width='50%' height='50%' />
        </div>
      </div>
      <Footer />
    </main>
  )
}

CreditDAffaire.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default CreditDAffaire
