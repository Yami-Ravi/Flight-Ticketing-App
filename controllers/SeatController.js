const path = require('path');
var seatModel = require('../model/Seat');

//To display flight seats for admin
const FlightSeatsAdmin = ((req, res) => {
    var flight_no = req.body.flight_no;
    seatModel.find({ flight_no: req.body.flight_no }, function (err,data) {

        if (err) {
            console.log(err);
        }
        else {
            res.render(path.join(__dirname, '../') +'views/admin/displaySeatsAdmin', { seatdata:data, flight_no })
        }
    });
});

//To display flight seats for passenger
const FlightSeatsPassenger = ((req, res) => {
    var flight_no = req.body.flight_no;
    seatModel.find({ flight_no: req.body.flight_no }, function (err, docs) {

        if (err) {
            console.log(err);
        }
        else {
            res.render(path.join(__dirname, '../') +'views/customer/displaySeatsPassenger', { details: docs, flight_no })
        }
    });
});

//To book a flight seat
const bookSeat = ((req, res) => {
    var seat = req.body.seat;
    var seatclass = req.body.seatclass;
    var flight_no=req.body.flight_no;
    var newSeat;
    seatModel.find({ flight_no: req.body.flight_no }, function (err, docs) {

        if (err) {
            console.log(err);
        }
        else {

            if (seatclass == "econ") {
                newSeat = JSON.parse(JSON.stringify(docs[0].seats_econ));
                newSeat[seat] = "booked";
                seatModel.update({ flight_no: req.body.flight_no }, { seats_econ: newSeat }, function (err, docs) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.render(path.join(__dirname, '../') +'views/customer/enterPassangerDetails', { seat, flight_no })
                    }
                });

            }
            if (seatclass == "business") {
                newSeat = JSON.parse(JSON.stringify(docs[0].seats_business));
                newSeat[seat] = "booked";
                seatModel.update({ flight_no: req.body.flight_no }, { seats_business: newSeat }, function (err, docs) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.render(path.join(__dirname, '../') +'views/customer/enterPassangerDetails', { seat, flight_no })
                    }
                });
            }


        }
    });

});


module.exports = { FlightSeatsAdmin, FlightSeatsPassenger, bookSeat}