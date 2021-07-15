
module.exports = app => {

    const booking = require('../modules/controllers/booking');
    const checkAuth = require('../middleware/checkAuth')

    app.post('/find_driver', checkAuth.customer, booking.find_drivers)
    app.post('/check_bookings', checkAuth.customer, booking.check_bookings)
    app.post('/customer/cancel_booking', checkAuth.customer , booking.cancel_booking)
    app.post('/driver/cancel_booking', checkAuth.driver , booking.cancel_booking)
    app.post('/completed_booking', checkAuth.driver, booking.completed_booking)
    app.post('/book_rides', checkAuth.customer, booking.ride_booking)

}

