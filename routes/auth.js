const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/User");


const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin
} = require("../helpers/middlewares")

router.get("/me", isLoggedIn(), async (req, res, next) => {
  const { _id } = req.session.currentUser
  const user = await User.findById({ _id }).populate("rides")
  user.password = "******"
  res.json(user);
})

router.post("/login", isNotLoggedIn(), async (req, res, next) => {

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).populate("rides")

    if (!user) {
      next(createError(404))
    }

    else if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res
        .status(200)
        .json(user)
    }
    else {
      next(createError(401));
    }
  }
  catch (error) {
    next(error)
  }
})

router.post("/signup", isNotLoggedIn(), validationLoggin(), async (req, res, next) => {
  const { name, lastName, email, password } = req.body;
  console.log(name, lastName, email, password)

  const emailExist = await User.findOne({ email })

  if (emailExist) next(createError(400));
  else {
    try {
      const salt = bcrypt.genSaltSync(saltRounds)
      const hashPass = bcrypt.hashSync(password, salt);
      const newUser = await User.create({ name, lastName, password: hashPass, email })
      req.session.currentUser = newUser;
      res
        .status(200)
        .json(newUser);
    } catch (error) {
      next(error)
    }
  }
})

router.post("/logout", isLoggedIn(), (req, res, next) => {
  req.session.destroy();
  res
    .status(200)
    .send();
})

module.exports = router;