const Joi = require('joi');

const login = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
  body: {
    login: Joi.string().required(),
    password: Joi.string().required(),
  },
};

const exit = {
  options: {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
  },
};

module.exports = {
  login,
  exit,
};
