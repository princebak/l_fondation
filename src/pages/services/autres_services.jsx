import React from 'react'
import Breadcrumb from 'src/@core/components/Breadcrumb'
import Footer from 'src/@core/components/Footer'
import Header from 'src/@core/components/Header'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const AutresServices = () => {
  return (
    <main>
      <Header />
      <Breadcrumb pageTitle='Services' pageSubTitle='Autres servives' />
      <div style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
        <p>
          <em>Nous avons cinq autres services :</em>
        </p>
        <div className='subService'>
          <div>
            <h2>Carte visa virtuel</h2>
            <div>
              <ul>
                <li>
                  Lingomba fondation vous permet de transporter votre argent aussi loin que vous le pouvez sans porter
                  beaucoup et de lourds billets.
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2>Bureau de change</h2>
            <div>
              <ul>
                <li>
                  Avec L-fondation Bureau de Change Na Tshombo, sentez-vous libre de convertir vos francs congolais en
                  devises et vos devises en Franc Congolais partout et à tout moment.
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2>Exchange cryptomonnaie</h2>
            <div>
              <ul>
                <li>
                  Parce que vous méritez mieux, Lingomba fondation vous facilite la vie en vous offrant la possibilité
                  d'échanger vos cryptomonnaie en dollars et d'acheter les cryptomonnaie
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2>Lingomba transfert</h2>
            <div>
              <ul>
                <li>
                  Lingomba fondation transfert <br />
                  LIngomba fondation transfert est une messagerie financière, qui vous permet transférer l'argent
                  partout en Afrique Lancée en 2023 , Lingomba fondation transfert est actif et fonctionne au sein de
                  toutes les agences lingomba fondation{' '}
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2>Service de paie</h2>
            <div>
              <ul>
                <li>
                  Notre service de paye fournit des solutions pour les problèmes administratifs et financiers auxquels
                  petits et grands employeurs font face au moment de payer des salaires à leurs employés
                </li>
                <li>
                  Obtenez Votre Paie Faite Sans Tracas
                  <br />
                  Notre service de paye fournit des solutions pour les problèmes administratifs et financiers auxquels
                  petits et grands employeurs font face au moment de payer des salaires à leurs employés. Avec ce
                  service, nous traitons le paiement des salaires au nom des employeurs à leurs employés à un coût
                  moindre en éliminant la paperasse et améliorant la sécurité, tout en offrant aux employés un meilleur
                  service et la valeur pour leur travail acharné.
                </li>
                <li>
                  <p>Avantages</p>
                  Pour l’employeur:
                  <br />
                  <ul>
                    <li>Temps de traitement des salaires plus rapide</li>
                    <li>Amélioration de la sécurité</li>
                    <li>Réduction des coûts</li>
                    <li>Satisfaction accrue des employés et le bien-être</li>
                    <li>l’accessibilité préférentiel à d’autres produits et services l-fondation</li>
                  </ul>
                  Pour l’employé:
                  <br />
                  <ul>
                    <li>Simplicité et la Sécurité</li>
                    <li>Meilleure gestion des revenus</li>
                  </ul>
                </li>
                <li>
                  <p>Avantages supplémentaires</p>
                  <ul>
                    <li>Service à la clientèle exceptionnel</li>
                    <li>Accessibilité</li>
                    <li>Flexibilité</li>
                  </ul>
                </li>
                <li>
                  Le Service de la paie est un service ou une fonction supplémentaire et disponible en option sur notre
                  compte d’entreprise.
                </li>

                <li>
                  <p>Exigences :</p>
                  <ul>
                    <li>Posséder une entreprise rentable</li>
                    <li>L’employeur avec au moins trois employés</li>
                    <li>Congolais résident</li>
                    <li>Titulaire d’un compte d’entreprise l-fondation</li>
                  </ul>
                </li>

                <li>
                  Parce que vous méritez mieux, L-fondation vous facilite la vie en vous offrant la possibilité
                  d’économiser en franc congolais et même faire des opérations de change en francs congolais – dollars
                  et vice-versa.
                </li>

                <li>
                  <p>Caractéristiques :</p>
                  <ul>
                    <li>Un taux de change applicable par jour est déterminé par la Banque Centrale du Congo</li>
                    <li>
                      Ces taux sont publiés sur les écrans plats dans toutes nos branches et devraient varier
                      quotidiennement
                    </li>
                  </ul>
                </li>

                <li>
                  <p>Avantages pour les clients :</p>
                  <ul>
                    <li>
                      Le Change aidera nos clients d’acheter ou de vendre ou de dépôt dans l’une des monaies : USD ou
                      CDF
                    </li>
                    <li>
                      Nos clients peuvent rembourser librement leurs prêts ou d’économiser dans l’une des monnaies
                    </li>
                    <li> Les Prêts à la consommation peuvent être donnés en CDF</li>
                    <li>Nos clients peuvent faire des transactions dans les comptes En utilisant Franc Congolais</li>
                  </ul>
                </li>

                <li>
                  <p>Conditions :</p>
                  <ul>
                    <li>Clients L-fondation partir de 18 ans</li>
                    <li>Carte d’identité valide </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='rotate' style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <img src='/images/services/s3.png' width='50%' height='50%' />
        </div>
      </div>
      <Footer />
    </main>
  )
}

AutresServices.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default AutresServices
