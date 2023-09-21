import Account from 'src/models/Account'
import User from 'src/models/User'

export const generateUserCode = async prefix => {
  let generatedCode = ''
  try {
    while (generatedCode == '') {
      console.log('Prefix >> ', prefix)
      generatedCode = generate(prefix)
      let existingCode = await User.findOne({ code: generatedCode })
      if (existingCode) {
        generatedCode = ''
      }
    }
  } catch (error) {
    console.log('generateUserCode error >> ' + error)
  }

  return generatedCode
}

export const generateAccountCode = async prefix => {
  let generatedCode = ''
  try {
    while (generatedCode == '') {
      console.log('Prefix >> ', prefix)
      generatedCode = generate(prefix)
      let existingCode = await Account.findOne({ code: generatedCode })
      if (existingCode) {
        generatedCode = ''
      }
    }
  } catch (error) {
    console.log('generateAccountCode error >> ' + error)
  }

  return generatedCode
}

function generate(prefix) {
  let generatedCode = prefix
  let letters = 'ABCDEFGHIJKLMNPQRSTUVWXYZABCDEFGHIJKLMNPQRSTUVWXYZABCDEFGHIJKLMNPQRSTUVWXYZ'
  let numbers = '012345678901234567890123456789'

  for (let i = 0; i < 5; i++) {
    let randomIndex = Math.floor(Math.random() * numbers.length)
    generatedCode += numbers.charAt(randomIndex)
  }

  for (let i = 0; i < 3; i++) {
    let randomIndex = Math.floor(Math.random() * letters.length)
    generatedCode += letters.charAt(randomIndex)
  }

  return generatedCode
}
