const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")
const UserModel = require("../models/user_model")

module.exports = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: "User not logged in" })
  }
  const token = authorization.replace("Bearer ", "")
  jwt.verify(token, JWT_SECRET, async (error, payload) => {
    if (error) {
      return res.status(402).json({ error: "Invalid Credentials" })
    }
    const { _id } = payload
    const dbUser = await UserModel.findById(_id)
    req.user = dbUser
    next()
  })
}
