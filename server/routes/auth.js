const express = require("express");
const { register, login } = require("../services/auth/authService");
const { update, deleteUser } = require("../services/user/userService");

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/update").post(update);

router.route("/delete").delete(deleteUser);

module.exports = router;
