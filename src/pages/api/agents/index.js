import User from 'src/models/User'
import { PAGE_LIMIT } from 'src/utils/constant'
import { dbConnector } from 'src/utils/dbConnector'

export default async function handler(req, res) {
  console.log('API METHOD', req.method)
  const { page, search } = req.query

  if (req.method == 'GET') {
    await dbConnector()

    try {
      const filter = {
        $and: [
          { type: { $not: { $eq: 'client' } } },
          {
            $or: [
              { code: { $regex: search } },
              { fullName: { $regex: search } },
              { email: { $regex: search } },
              { phone: { $regex: search } },
              { status: { $regex: search } }
            ]
          }
        ]
      }

      const sort = { createdAt: -1 } // Sort users by createdAt in descending order

      const limit = PAGE_LIMIT

      const totalElements = await User.countDocuments(filter)
      const totalPages = Math.ceil(totalElements / limit)
      const pageNumber = Number.parseInt(page)

      const currentPage = pageNumber < 1 ? 1 : pageNumber > totalPages ? totalPages : pageNumber

      const users = await User.find(filter)
        .sort(sort)
        .skip((Math.ceil(currentPage) - 1) * limit)
        .limit(limit)
        .exec()

      res.status(200).json({ content: users, totalElements, pageLimit: limit, currentPage })
    } catch (error) {
      console.log('Get agents error >> ', error)
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
