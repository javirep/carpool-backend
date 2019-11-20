const express = require("express");
const router = express.Router();
const User = require("../models/User");

const { isLoggedIn } = require("../helpers/middlewares")

//router.use(isLoggedIn())

/* GET users listing. */
router.get('/', function (req, res, next) {
  req.session.currentUser.password = "******"
  res.json(req.session.currentUser);
});

router.get("/:userId", async (req, res, next) => {
  const { userId } = req.params
  const user = await User.findById({ "_id": userId }).populate("rides")

  res.json(user)
})

router.put("/edit", async (req, res, next) => {
  const { _id } = req.session.currentUser
  const { name, lastName, imagePath } = req.body
  console.log(name, lastName, imagePath)
  let updatedUser;
  if (name) {
    updatedUser = await User.findByIdAndUpdate({ _id }, { $set: { name } }, { new: true })
  }
  if (lastName) {
    updatedUser = await User.findByIdAndUpdate({ _id }, { $set: { lastName } }, { new: true })
  }
  if (imagePath) {
    updatedUser = await User.findByIdAndUpdate({ _id }, { $set: { imagePath } }, { new: true })
  }

  res.json(updatedUser)
})

module.exports = router;