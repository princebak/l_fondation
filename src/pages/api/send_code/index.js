import { SENDGRID_USER_KEY } from 'src/utils/constant'
import * as sgMail from '@sendgrid/mail'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, userPin } = req.body

    console.log('Sending code >> ', { email, userPin })

    const msg = {
      to: 'princebakenga09032017@gmail.com',
      from: 'bakengailunga@gmail.com',
      subject: "L-Fondation validation de l'E-mail",
      text: 'Bienvenue chez Lingomba Fondation',
      html: 'Bienvenue chez Lingomba Fondation, validez vorte email avec ce code : ' + userPin
    }

    try {
      sgMail.setApiKey('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') //('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') // SENDGRID_USER_KEY
      const response = await sgMail.send(msg)
      console.log('Code response >> ', response)

      res.status(200).json({ msg: 'The code is sent on mail box' })
    } catch (error) {
      console.log('Code Error >> ', error)
      res.status(500).json({ error: 'The mail server is not reachable' })
    }
  } else {
    res.status(400).json({ error: 'This API accepts only POST method' })
  }
}
