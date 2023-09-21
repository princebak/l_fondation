import User from 'src/models/User'
import { dbConnector } from 'src/utils/dbConnector'

export default async function handler(req, res) {
  console.log('API METHOD', req.method)

  if (req.method == 'GET') {
    await dbConnector()

    try {
      const users = await User.find({ type: { $eq: 'client' } })
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  } else if (req.method == 'PUT') {
    await dbConnector()

    const { password, ...dataWithoutPW } = req.body

    const goodData = {
      ...dataWithoutPW,
      dob: new Date(dob)
    }
    const newUser = new User(goodData)

    newUser
      .save() // data is provided with _id, so this update the existing document
      .then(() => {
        res.status(200).json({ msg: 'Mise a jour reussie.' })
      })
      .catch(err => res.status(500).json({ error: "Error on '/api/register' : " + err }))
  } else {
    return res.status(400).json({ error: 'This API call only accepts GET method.' })
  }
}
