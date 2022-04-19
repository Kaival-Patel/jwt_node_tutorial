const router = require("express").Router();
const User = require("../schema/user");
const multer = require("multer");
const upload = multer();
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs/dist/bcrypt");

//CREATE TOKEN
const jsonToken = require("jsonwebtoken");
router.post("/register", upload.none(), async function (req, res, next) {
  const { name, email, password } = req.body;

  //CHECK FOR Validation
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //CHECK IF USER IS IN DB
  const emailExist = await User.findOne({ email: email });

  if (emailExist) {
    return res.status(200).send("Email already exists");
  }

  //HASH password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = User({
    name: name,
    email: email,
    password: hashPassword,
  });

  const ref = await user.save();

  return res.status(200).send(ref);
});

router.post("/login", upload.none(), async (req, res) => {
  const { email, password } = req.body;

  //CHECK FOR Validation
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  
  //Login
  //CHECK IF USER IS IN DB
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(200).send("Email doesn't exists");
  } else {
    const validPass = await bcrypt.compare(password, user.password);
    if (validPass) {
      const token = jsonToken.sign({_id:user._id},process.env.TOKEN_SECRET);
      res.header('auth-token',token).send(token);
      // return res.status(200).send("Logged In");
    } else {
      return res.status(200).send("Invalid Password");
    }
  }
});

module.exports = router;
