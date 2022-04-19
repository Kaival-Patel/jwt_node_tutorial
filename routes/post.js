const router = require("express").Router();
const User = require("../schema/user");
const multer = require("multer");
const upload = multer();
const verify = require("./verify_token");
router.get("/", upload.none(), verify, (req, res) => {
  res.json({
    posts: {
      title: "myFirst Post",
      description: "Randomly Accessible",
    },
  });
});

module.exports = router;
