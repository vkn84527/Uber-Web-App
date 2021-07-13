
module.exports = app => {

    const booking = require('../modules/controllers/booking');
    const checkAuth = require('../middleware/checkAuth')

    app.post('/find_driver',checkAuth, booking.find_drivers)
    app.post('/check_bookings',checkAuth, booking.check_bookings)
    app.post('/cancel_booking',checkAuth, booking.cancel_booking)
    app.post('/completed_booking',checkAuth, booking.completed_booking)
    app.post('/book_rides',checkAuth, booking.ride_booking)

}

