import User from 'src/models/User'
import bcrypt from 'bcrypt'
import { compare } from 'bcrypt'

async function handler(req, res) {
  const { currentPassword, newPassword, userId } = req.body

  console.log('Changing pw payload >> ', { currentPassword, newPassword, userId })
  if (req.method === 'PUT') {
    try {
      const foundUser = await User.findOne({ _id: userId }).select('+password')

      if (!foundUser) {
        res.status(400).json({ error: 'Utilisateur non existant.' })

        return
      }

      const isPasswordCorrect = await compare(currentPassword, foundUser.password)

      console.log('isPasswordCorrect >> ', isPasswordCorrect)

      if (isPasswordCorrect) {
        console.log('hashedCurrentPassword matched')
        console.log('newPassword >> ', newPassword)
        const hashedNewPassword = await bcrypt.hash(newPassword, 12)

        await User.findOneAndUpdate({ _id: userId }, { password: hashedNewPassword })

        res.status(200).json({ msg: 'Mot de passe mis a jour.' })

        return
      } else {
        console.log('hashedCurrentPassword not matched')

        res.status(400).json({ error: 'Votre mot de passe actuel est incorrect.' })

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
