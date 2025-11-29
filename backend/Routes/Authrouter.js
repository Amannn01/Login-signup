const { signup, login } = require('../controllers/AuthControllers');
const { signupvalidation, loginvalidation } = require('../Middleware/AuthValidation');

const Router = require('express').Router();

Router.post('/login',loginvalidation,login);

Router.post('/signup',signupvalidation,signup);

module.exports = Router;