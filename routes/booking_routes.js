
module.exports = app => {

    const booking = require('../modules/controllers/booking');

    app.post('/find_drivers', booking.find_drivers)
    app.post('/book_ride', booking.check_rides)
    app.post('/cancel_ride', booking.cancel_ride)
    app.post('/completed_ride', booking.completed_ride)

}


