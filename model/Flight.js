var mongoose = require('mongoose');

var flightSchema = new mongoose.Schema({
    flight_no: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    arrival: {
        type: Date,
        required: true
    },
    departure: {
        type: Date,
        required: true
    },

}, { collection: 'Flights' });

module.exports = mongoose.model("Flight", flightSchema);