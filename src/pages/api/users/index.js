import User from 'src/models/User'
import { dbConnector } from 'src/utils/dbConnector'

export default async function handler(req, res) {
  /* switch(req.method){
        case "Get" : {

        }
    } */
  console.log('API METHOD', req.method)
  if (req.method !== 'GET') {
    return res.status(400).json({ error: 'This API call only accepts GET method.' })
  }

  await dbConnector()

  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}
