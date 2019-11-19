const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rideSchema = new Schema({
    departure: { type: Object, required: true },
    arrival: { type: Object, required: true },
    frequency: { type: String },
    car: { type: Boolean, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;