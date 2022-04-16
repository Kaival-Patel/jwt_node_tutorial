//Import JOI
const Joi = require("@hapi/joi");

//Registration Validation
const registerValidation = data => {
  const schema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  };
  return Joi.validate(data,schema);
};

//Login Validation
const loginValidation = (data) => {
    const schema = {
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    };
    return Joi.validate(data,schema);
  };

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
