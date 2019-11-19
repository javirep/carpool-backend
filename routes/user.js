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
  const { name, lastName, imgPath } = req.body
  const updatedUser = await User.findByIdAndUpdate({ _id }, { $set: { name, lastName, imgPath } }, { new: true })

  res.json(updatedUser)
})

module.exports = router;