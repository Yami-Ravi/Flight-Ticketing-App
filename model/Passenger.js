var mongoose = require('mongoose');

var passengerSchema = new mongoose.Schema({

    passenger_name: {
        type: String,
        required: true
    },
    passenger_age: {
        type: String,
        required: true
    },
    passenger_email: {
        type: String,
        required: true
    },
    passenger_flight: {
        type: String,
        required: true
    },
    passenger_seat: {
        type: String,
        required: true
    }

}, { collection: 'Passengers' });

module.exports = mongoose.model("Passenger", passengerSchema);