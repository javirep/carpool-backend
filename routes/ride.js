const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Ride = require("../models/Ride")

const { isLoggedIn } = require("../helpers/middlewares")

router.use(isLoggedIn())

router.get("/everyRide", async (req, res, next) => {
    const rides = await Ride.find().populate("user")
    res.json(rides)
})

router.get("/:rideId", async (req, res, next) => {
    const { rideId } = req.params;
    const ride = await Ride.findById({ "_id": rideId })
    res.json(ride)
})

router.post("/", async (req, res, next) => {
    const { departureTime, departureZip, departurePlace, arrivalTime, arrivalZip, arrivalPlace, frequency, car } = req.body
    const userId = req.session.currentUser._id
    const ride = await Ride.create({
        departure: { departureTime, departureZip, departurePlace },
        arrival: { arrivalTime, arrivalZip, arrivalPlace },
        frequency,
        car,
        "user": userId
    })

    const updatedUser = await User.findByIdAndUpdate({ "_id": userId }, { $push: { rides: ride._id } }, { new: true })

    req.session.currentUser = updatedUser

    res.json(ride)
})

router.put("/:rideId", async (req, res, next) => {
    const { rideId } = req.params
    const { departureTime, departureZip, departurePlace, arrivalTime, arrivalZip, arrivalPlace, frequency, car } = req.body
    const updatedRide = await Ride.findByIdAndUpdate({ "_id": rideId }, {
        $set: {
            departure: { departureTime, departureZip, departurePlace },
            arrival: { arrivalTime, arrivalZip, arrivalPlace },
            frequency,
            car
        }
    }, { new: true })

    res.json(updatedRide)
})

router.delete("/:rideId", async (req, res, next) => {
    const { rideId } = req.params
    const del = await Ride.findByIdAndDelete({ "_id": rideId })
    const ridesUpdated = await Ride.find({ "user": req.session.currentUser._id })

    req.session.currentUser.rides = ridesUpdated;
    res.json(req.session.currentUser)
})

module.exports = router