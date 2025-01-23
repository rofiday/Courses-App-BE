const express = require("express");
const {
  login,
  register,
  logout,
} = require("../controllers.js/auth.controller");
const {
  middlewareAuthLogin,
  middlewareAuthRegister,
} = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", middlewareAuthRegister, register);
router.post("/login", middlewareAuthLogin, login);
router.post("/logout", logout);
module.exports = router;
