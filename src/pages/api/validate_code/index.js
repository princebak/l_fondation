import User from 'src/models/User'
import { EMAIL_VALIDATED } from 'src/utils/constant'

async function handler(req, res) {
  const { email, code } = req.body
  if (req.method === 'PUT') {
    try {
      const foundUser = await User.findOne({ email: email })
      if (!foundUser) {
        res.status(400).json({ error: 'Utilisateur non existant.' })

        return
      }
      if (foundUser.pin === code) {
        await User.findOneAndUpdate({ _id: foundUser._id }, { status: EMAIL_VALIDATED })
      } else {
        res.status(400).json({error:"Le code fourni n'est pas valid."})

        return
      }
      res.status(200).json({ msg: 'Votre Email est validé.' })
    } catch (error) {
      res.status(500).json({ error: error })
    }
  } else {
    res.status(400).json({ error: 'This API accepts only PUT method' })
  }
}

export default handler
