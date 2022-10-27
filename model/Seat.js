var mongoose = require('mongoose');

var seatsSchema = new mongoose.Schema({
    flight_no: {
        type: String,
        required: true
    },
    seats_econ: {
        type: Object,
        required: true
    },
    seats_business: {
        type: Object,
        required: true
    }
}, { collection: 'Seats' });

module.exports = mongoose.model("Seat", seatsSchema);