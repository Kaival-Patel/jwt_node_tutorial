const router = require("express").Router();
const User = require("../schema/user");
const multer = require("multer");
const upload = multer();
router.post("/register", upload.none(), function (req, res, next) {
  const {name,email,password} = req.body;
  const user = User({
      name:name,
      email:email,
      password:password
  })
});

router.post("/login", (req, res) => {
  res.send("Login");
});

module.exports = router;
