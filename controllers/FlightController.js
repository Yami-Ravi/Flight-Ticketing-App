const path = require('path');
var flightModel = require('../model/Flight');
var seatModel = require('../model/Seat');



//To display flights by origin, destination and date for passenger
const searchFlight = ((req, res) => {

    flightModel.find({
        origin: req.body.origin, destination: req.body.destination,
        departure: {
            $gt: req.body.from,
            $lt: req.body.to
        }
    }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            res.render(path.join(__dirname, '../') + 'views/customer/dispflightsPassenger', { details: docs })
        }
    });
});

//To display all flights for admin user
const displayAllFlights=((req, res)=> {
    flightModel.find(function (err,data) {
        if (err) {
            console.log(err);
        }
        else {
            res.render(path.join(__dirname, '../') + 'views/admin/displayFlightsAdmin', { flightdata:data})
        }
    });
});

//To delete a flight
const deleteFlight = ((req, res) => {
    flightModel.remove({ flight_no: req.body.flight_no }, function (err, result) {
        if (err) {
            console.log(err)
        } else {

            res.send("Deleted flight  " + req.body.flight_no);
        }
    });
    seatModel.remove({ flight_no: req.body.flight_no }, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            //res.send("Deleted flight  " + req.body.flight_no);
        }
    });
})

//To save a flight
const saveFlight = ((req, res) => {
    var newFlight = new flightModel();
    var newSeat = new seatModel();

    var insert = true;

    //Validations for save Flight - Starts
    flightModel.find({ flight_no: req.body.flight_no }, function (err, docs) {
        if (docs.length > 1) {
                insert = false;
                res.send("Flight already Available. Try Again.");
            }
        });
    if (req.body.arrival < req.body.departure && insert==true) {
        insert = false;
        res.send("Arrival is less than Departure. Try Again.");
    }
    if (req.body.origin == req.body.destination && insert == true) {
        insert = false;
        res.send("Origin and Departure is the same. Try Again.");
    }
    //Validations for save Flight - Ends
    if (insert == true) {


    newFlight.flight_no = req.body.flight_no;
    newFlight.origin = req.body.origin;
    newFlight.destination = req.body.destination;
    newFlight.arrival = req.body.arrival;
    newFlight.departure = req.body.departure;

    newFlight.save(function (err, data) {
        if (err) {
            console.log(error);
        }
        else {
            res.send("Flight inserted");
        }
    });

        var econ_seat = { E1: 'free', E2: 'free', E3: 'free' };
        var business_seat = { B1: 'free', B2: 'free', B3: 'free' };

        newSeat.seats_econ=econ_seat;
        newSeat.seats_business=business_seat;
        newSeat.flight_no = req.body.flight_no;
        newSeat.save(function (err, data) {
            if (err) {
                console.log(error);
            }
            else {
                //console.log("Seat inserted");
            }
        });

    }
})

module.exports = { saveFlight, displayAllFlights , deleteFlight, searchFlight}