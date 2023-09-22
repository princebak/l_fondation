import bcrypt from 'bcrypt'
import Account from 'src/models/Account'
import User from 'src/models/User'
import { generateAccountCode, generateUserCode } from 'src/utils/codeGenerator'
import { dbConnector } from 'src/utils/dbConnector'

const validateEmail = email => {
  const regExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

  return regExp.test(email) && email.length <= 150
}

const validateFullName = fullName => {
  return fullName.length <= 150
}

const validatePassword = password => {
  return password.length >= 5
}

const validateForm = async (fullName, email, password) => {
  if (!validateFullName(fullName)) {
    return { error: 'Le nom complet est invalid' }
  }

  if (!validateEmail(email)) {
    return { error: "L'e-mail est invalid" }
  }

  if (!validatePassword(password)) {
    return {
      error: "Le mot de passe est invalid. verifier qu'il aie au moins 5 caractères."
    }
  }

  await dbConnector()
  const userByEmail = await User.findOne({ email: email })

  if (userByEmail) {
    return {
      error: 'Changer d’e-mail s’il vous plaît, il y a déjà un utilisateur avec cet e-mail.'
    }
  }

  return null
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'This API call only accepts POST method.' })
  }
  const data = req.body

  const { fullName, email, password } = data

  const validateFormRes = await validateForm(fullName, email, password)
  if (validateFormRes) {
    return res.status(400).json(validateFormRes)
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const codePrefix = data.type === 'client' ? 'CL' : 'AG'
  const generatedCode = await generateUserCode(codePrefix)

  const goodData = {
    ...data,
    code: generatedCode,
    password: hashedPassword
  }

  console.log('goodData >> ', goodData)

  const newUser = new User(goodData)

  try {
    const savedUser = await newUser.save()

    const account = new Account({
      code: await generateAccountCode('CC'),
      owner: savedUser._id
    })

    const savedAccount = await account.save()

    console.log('savedUser >> ', savedUser)
    console.log('savedAccount >> ', savedAccount)

    res.status(200).json(savedUser)
  } catch (error) {
    console.log('Error >> ', error)
    res.status(500).json({ error: error })
  }
}
