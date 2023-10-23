import Account from 'src/models/Account'
import User from 'src/models/User'
import { MEMBER, PROFILE_VALIDATED } from 'src/utils/constant'

async function handler(req, res) {
  const { id } = req.query

  if (req.method == 'PUT') {
    try {
      console.log("Id >> ", id)
      const userAccount = await Account.findOne({ owner: id })
      console.log('userAccount >> ', userAccount)
      if (userAccount && userAccount?.balance >= 1) {
        console.log('Setting user MEMBER')

        await User.findOneAndUpdate({ _id: id }, { status: MEMBER })
      } else {
        console.log('Setting user PROFILE_VALIDATED')

        await User.findOneAndUpdate({ _id: id }, { status: PROFILE_VALIDATED })
      }
      res.status(200).json({ msg: 'Validation a reusie.' })
    } catch (error) {
      console.log('Validation Error >> ', error)
      res.status(400).json({ error: 'Bad id' })
    }
  } else {
    res.status(400).json({ error: 'This Api accept only PUT method' })
  }
}

export default handler
