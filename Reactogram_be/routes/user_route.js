const express = require("express")
const router = express.Router()
require("dotenv").config()
const UserModel = require("../models/user_model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const protectedResource = require("../middleware/protectedResource")

router.post("/signup", async (req, res) => {
  const { fullName, email, password, profileImg } = req.body
  if (!fullName || !password || !email) {
    return res
      .status(400)
      .json({ error: "One or more mandatory fields are empty" })
  }
  try {
    const userInDB = await UserModel.findOne({ email: email })
    if (userInDB) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" })
    }
    const hashedPassword = await bcrypt.hash(password, 16)
    const user = new UserModel({
      fullName,
      email,
      password: hashedPassword,
      profileImg,
    })
    await user.save()
    res.status(201).json({ result: "User SIgned up Successfully!" })
  } catch (err) {
    console.log(err)
  }
})
router.post("/login", async (req, res) => {
  const { email, password } = req.body
  if (!password || !email) {
    return res
      .status(400)
      .json({ error: "One or more mandatory fields are empty" })
  }
  try {
    const userInDB = await UserModel.findOne({ email: email })
    if (!userInDB) {
      return res.status(401).json({ error: "Invalid Credentials" })
    }
    const didMatch = await bcrypt.compare(password, userInDB.password)
    if (didMatch) {
      const jwtToken = jwt.sign({ _id: userInDB._id }, process.env.JWT_SECRET)
      const userInfo = {
        email: userInDB.email,
        fullName: userInDB.fullName,
        _id: userInDB._id,
      }
      return res.status(200).json({
        result: { token: jwtToken, user: userInfo },
      })
    } else {
      return res.status(401).json({ error: "Invalid Credentials" })
    }
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
