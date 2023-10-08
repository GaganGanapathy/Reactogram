const express = require("express")
const router = express.Router()
const multer = require("multer")

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      return res
        .status(400)
        .json({ error: "File types that is allowed are .jpeg, .png, .jpg " })
    }
  },
})

router.post("/uploadFile", upload.single("file"), (req, res) => {
  res.json({ filename: req.file.filename })
})

router.get("/files/:fileName", (req, res) => {
  try {
    const { fileName } = req.params
    const path = __basedir + "/uploads/"
    res.download(path + fileName)
  } catch (error) {
    res.status(500).send({ mesage: "File cannot be downloaded " + error })
  }
})

module.exports = router
