
module.exports = app => {

    const booking = require('../modules/controllers/booking');

    app.post('/find_driver', booking.find_drivers)
    app.post('/check_bookings', booking.check_bookings)
    app.post('/cancel_booking', booking.cancel_booking)
    app.post('/completed_booking', booking.completed_booking)
    app.post('/book_rides', booking.ride_booking)

}

