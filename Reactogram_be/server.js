const express = require("express")
require("dotenv").config()
const PORT = 4000
const cors = require("cors")
const mongoose = require("mongoose")
const user_route = require("./routes/user_route")
const post_route = require("./routes/post_route")
const file_route = require("./routes/file_route")
const app = express()

app.use(cors())
app.use(express.json())
app.use(user_route)
app.use(post_route)
app.use(file_route)

global.__basedir = __dirname

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected")
  })
  .catch((err) => {
    console.log(err)
  })

app.get("*.js", function (req, res, next) {
  res.type("application/javascript")
  next()
})

app.get("kaboom", (req, res) => {
  res.send("working")
})

app.get("/welcome", (req, res) => {
  res.status(200).json({ msg: "HELLO WORLD!!!" })
})

app.listen(PORT, () => {
  console.log("Listening")
})
