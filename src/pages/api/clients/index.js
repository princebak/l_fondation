import Account from 'src/models/Account'
import User from 'src/models/User'
import { PAGE_LIMIT } from 'src/utils/constant'
import { dbConnector } from 'src/utils/dbConnector'

export default async function handler(req, res) {
  console.log('API METHOD', req.method)
  const { page, search } = req.query

  if (req.method == 'GET') {
    await dbConnector()

    try {
      const users = await User.find({ type: { $eq: 'client' } })

      /* const filter = {
        $or: [{ address: { $contains: ['Main'] } }, { address: { $contains: ['Elm'] } }]
      } */

      const filter = { type: { $eq: 'client' } }
      const sort = { createdAt: -1 } // Sort users by createdAt in descending order

      const page = 2
      const limit = PAGE_LIMIT
      const totalElements = await User.countDocuments(filter)

      /* const users = await User.find(filter)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec() */

      res.status(200).json({ content: users, totalElements, pageLimit: limit })
    } catch (error) {
      console.log('Error >> ', error)
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
    return res.status(400).json({ error: 'This API call only accepts GET and PUT methods.' })
  }
}
