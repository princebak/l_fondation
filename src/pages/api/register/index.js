import bcrypt from 'bcrypt'
import User from 'src/models/User'
import { dbConnector } from 'src/utils/dbConnector'

const validateEmail = email => {
  const regExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

  return regExp.test(email)
}

const validatePassword = password => {
  return password.length >= 5
}

const validateForm = async (email, password) => {
  if (!validateEmail(email)) {
    return { error: "L'e-mail est invalid" }
  }
  if (!validatePassword(password)) {
    return {
      error: "Le mot de pass est invalid. verifier qu'il plus de 5 caracteres."
    }
  }

  await dbConnector()
  const userByEmail = await User.findOne({ email: email })

  if (userByEmail) {
    return {
      error: "ChangE d'e-mail svp, il y a deja un utilisateur avec cet'e-mail."
    }
  }

  return null
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'This API call only accepts POST method.' })
  }
  const data = req.body
  const { email, password } = data

   const validateFormRes = await validateForm(email, password)
  if (validateFormRes) {
    return res.status(400).json(validateFormRes)
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const goodData = {
    ...data,
    password: hashedPassword
  }

  console.log('goodData >> ', goodData)
  const newUser = new User(goodData)

  res.status(200).json({ msg: 'Inscription reussie.' })

    newUser
    .save()
    .then(() => {
      res.status(200).json({ msg: 'Inscription reussie.' })
    })
    .catch(err => res.status(500).json({ error: "Error on '/api/register' : " + err }))
}
