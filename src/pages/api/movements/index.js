import Movement from 'src/models/Movement'
import { dbConnector } from 'src/utils/dbConnector'

export default async function handler(req, res) {
  console.log('API METHOD', req.method)

  if (req.method == 'GET') {
    await dbConnector()

    try {
      const movements = await Movement.find().populate([
        { path: 'sourceAccount', populate: { path: 'owner' } },
        { path: 'destinationAccount', populate: { path: 'owner' } }
      ])

      res.status(200).json(movements)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  } else {
    return res.status(400).json({ error: 'This API call only accepts GET method.' })
  }
}
