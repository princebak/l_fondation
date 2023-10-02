import User from 'src/models/User'

async function handler(req, res) {
  const { id } = req.query

  if (req.method == 'DELETE') {
    try {
      await User.findOneAndDelete({ _id: id })
      res.status(200).json({ msg: 'Suppression reusie.' })
    } catch (error) {
      console.log('Delete Error >> ', error)
      res.status(400).json({ error: 'Bad id' })
    }
  } else {
    res.status(400).json({ error: 'This Api accept only DELETE method' })
  }
}

export default handler
