import User from 'src/models/User'
import { EMAIL_VALIDATED, PROFILE_UPDATED } from 'src/utils/constant'

async function handler(req, res) {
  const user = req.body
  console.log('Updating user >> ', user)
  if (req.method === 'PUT') {
    try {
      const foundUser = await User.findOne({ email: user.email })
      if (!foundUser) {
        res.status(400).json({ error: 'Utilisateur non existant.' })

        return
      }
      if (foundUser.status === EMAIL_VALIDATED) {
        console.log('First update')
        await User.findOneAndUpdate({ _id: foundUser._id }, { ...user, status: PROFILE_UPDATED })
        res.status(200).json({ msg: 'Utilisateur mis a jour.' })

        return
      } else {
        console.log('Next update')

        await User.findOneAndUpdate({ _id: foundUser._id }, { ...user })
        res.status(200).json({ msg: 'Utilisateur mis a jour.' })

        return
      }
    } catch (error) {
      console.log('Error >> ', error)
      res.status(500).json({ error: 'There is error on server' })
    }
  } else {
    res.status(400).json({ error: 'This API accepts only PUT method' })
  }
}

export default handler
