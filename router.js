/*Main Application Router*/
var express = require('express');
var router = express.Router();

/*Import from Flight Controller*/
const {
    saveFlight,
    displayAllFlights,
    deleteFlight,
    searchFlight
} = require('./controllers/FlightController')

/*Import from Passenger Controller*/
const {
    savePassenger, showPassengerData
} = require('./controllers/PassengerController')

/*Import from Seat Controller*/
const {
    FlightSeatsAdmin, FlightSeatsPassenger, bookSeat
} = require('./controllers/SeatController')


/*Routers for Admin*/
router.get('/addFlights', function (request, response) {
    response.sendFile('addFlights.html', { root: __dirname + "/views/admin" });
})
router.post('/displayAllFlights', displayAllFlights)
router.post('/FlightSeats', FlightSeatsAdmin)
router.post('/deleteFlight', deleteFlight)
router.post('/saveFlight', saveFlight)
router.post('/showPassengerData', showPassengerData)



/*Routers for Customer*/
router.get('/findFlights', function (request, response) {
    response.sendFile('findFlights.html', { root: __dirname + "/views/customer" });
})
router.post('/savePassenger', savePassenger )
router.post('/selectSeats', FlightSeatsPassenger)
router.post('/bookSeat', bookSeat)
router.post('/searchFlights', searchFlight)

module.exports = router;
