import Account from 'src/models/Account'
import { dbConnector } from 'src/utils/dbConnector'

export default async function handler(req, res) {
  console.log('API METHOD', req.method)

  if (req.method == 'GET') {
    await dbConnector()

    try {
      const accounts = await Account.find().populate('owner')

      const clientsAccounts = accounts.filter(account => account.owner.type === 'client')

      res.status(200).json(clientsAccounts)
    } catch (error) {
      console.log('Error >> ', error)
      res.status(500).json({ error })
    }
  } else {
    return res.status(400).json({ error: 'This API call only accepts GET method.' })
  }
}
