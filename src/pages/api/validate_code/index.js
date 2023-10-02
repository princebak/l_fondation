import User from 'src/models/User'

async function handler(req, res) {
  const body = req.body
  try {
    const foundUser = await User.findOne({email:body.email})
    if (!foundUser) {
      res.status(400).json({ error: 'Bad id' })
    }
    if(foundUser.pin === body.code){
      await User.findOneAndUpdate({_id:foundUser._id}, {status:"verified"})
    }
    res.status(200).json(foundUser)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

export default handler
