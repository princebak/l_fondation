import User from "model/User";

async function handler(req, res) {
  const { id } = req.query;
  try {
    const foundUser = await User.findById(id);
    if (!foundUser) {
      res.status(400).json({ error: "Bad id" });
    }
    res.status(200).json(foundUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export default handler;
