const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Notification = require("../models/Notification")

const { isLoggedIn } = require("../helpers/middlewares")

router.use(isLoggedIn())

router.get("/", async (req, res, next) => {
    const userId = req.session.currentUser._id;
    const notifications = await Notification.find({ receiver: userId }).populate("creator")

    res.json(notifications)
})

router.post("/", async (req, res, next) => {
    const userId = req.session.currentUser._id;
    const { message, receiverId } = req.body
    console.log("received message: ")
    const theNotification = await Notification.create({
        creator: userId,
        receiver: receiverId,
        message,
    })

    User.findByIdAndUpdate({ "_id": receiverId }, { $set: { newNotification: true } })
        .then(res.json(theNotification))

})

router.delete("/:notificationId", async (req, res, next) => {
    const { notificationId } = req.params
    await Notification.findByIdAndDelete({ "_id": notificationId })

    res.json({ "message": "The notification has been successfully deleted" })
})

router.post("/notificationSeen", async (req, res, next) => {
    const { _id } = req.session.currentUser
    const newUser = await User.findByIdAndUpdate({ _id }, { $set: { newNotification: false } })
    req.session.currentUser = newUser
    res.json(newUser)
})


module.exports = router;