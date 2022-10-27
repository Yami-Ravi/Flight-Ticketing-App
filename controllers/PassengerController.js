const path = require('path');
var passengerModel = require('../model/Passenger');
var nodemailer = require('nodemailer');

//To show passenger data for admin
const showPassengerData = ((req, res) => {
    var flight_no = req.body.flight_no;
    var seat = req.body.seat;
    passengerModel.find({ passenger_flight: req.body.flight_no, passenger_seat: req.body.seat },function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.render(path.join(__dirname, '../') + 'views/admin/displayPassengerAdmin', {passengerdata: data,flight_no,seat })
        }
    });
});

//To save Passenger data
const savePassenger = ((req, res) => {
    var newPassenger = new passengerModel();


    newPassenger.passenger_name = req.body.passenger_name;
    newPassenger.passenger_age = req.body.passenger_age;
    newPassenger.passenger_email = req.body.passenger_email;
    newPassenger.passenger_flight = req.body.passenger_flight;
    newPassenger.passenger_seat = req.body.passenger_seat;

    newPassenger.save(function (err, data) {
        if (err) {
            console.log(error);
        }
        else {


            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'yaminee1999@gmail.com',
                    pass: 'eloxneykpkoyjgcx'
                }
            });

            var mailOptions = {
                from: 'yaminee1999@gmail.com',
                to: req.body.passenger_email,
                subject: 'Flight Booked !',
                text: 'Please find your Flight Details! \n' + 'Flight Number : ' + req.body.passenger_flight + '\nSeat Number : ' + req.body.passenger_seat
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                }
            });
            res.send("Passenger Details Saved & Flight Booked!");
        }
    });

});

module.exports = { savePassenger, showPassengerData }