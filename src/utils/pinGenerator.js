import User from "src/models/User"

export const generateUserPin = async () => {
  let generatedCode = ''
  try {
    while (generatedCode == '') {
      generatedCode = generateCode()
      let existingCode = await User.findOne({ pin: generatedCode })
      if (existingCode) {
        generatedCode = ''
      }
    }
  } catch (error) {
    console.log('generateUserPin error >> ' + error)
  }

  return generatedCode
}

function generateCode() {
  let generatedCode = ""
  let numbers = '012345678901234567890123456789'

  for (let i = 0; i < 6; i++) {
    let randomIndex = Math.floor(Math.random() * numbers.length)
    generatedCode += numbers.charAt(randomIndex)
  }

  return generatedCode
}
