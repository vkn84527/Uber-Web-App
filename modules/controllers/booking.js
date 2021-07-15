const execute_query = require('./db_query').execute_query
const responses = require('../common_functions/responses')
const constants = require('../constants/constants')
var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('m/d/Y H:M:S');

module.exports.find_drivers = async function (req, res) {
    try {
        var sql_query = 'select driver_id, vechile_id,driver_name,driver_phone from driver where driver_id not in \
        (select driver_id from booking where status="booked")'
        var values = []
        let results = await execute_query(sql_query, values)
        if (results.length === 0) {
            responses.sendResponse(res, "No driver found", constants.STATUS_CODES.NOT_FOUND)
        }
        else {
            responses.sendResponse(res, results, constants.STATUS_CODES.SUCCESS)
        }
    } catch {
        responses.sendResponse(res, results, constants.STATUS_CODES.NOT_FOUND)
    }
}

module.exports.check_bookings = async function (req, res) {
    try {
        var sql_query = 'select * from booking where booking_id=? and status="booked"';
        var values = [req.body.booking_id]
        let results = await execute_query(sql_query, values)

        if (results.length !== 0) {
            responses.sendResponse(res, "You have already booked a booking", constants.STATUS_CODES.BAD_REQUEST)
        } else {
            var sql_query1 = 'select * from booking where booking_id=? and status="cancelled"';
            var values1 = [req.body.booking_id]
            let results1 = await execute_query(sql_query1, values1)

            if (results1.length !== 0) {
                responses.sendResponse(res, "You booking is cancelled", constants.STATUS_CODES.BAD_REQUEST)
            } else {
                var sql_query2 = 'select * from booking where booking_id=? and status="completed"';
                var values2 = [req.body.booking_id]
                let results2 = await execute_query(sql_query2, values2)

                if (results2.length !== 0) {
                    responses.sendResponse(res, "You booking ride is completed", constants.STATUS_CODES.BAD_REQUEST)
                } else {
                    responses.sendResponse(res, "Your Booking ID is Not match", constants.STATUS_CODES.NOT_FOUND)
                }
            }
        }
    }
    catch {
        responses.sendResponse(res, "Some Erorr", constants.STATUS_CODES.NOT_FOUND)
    }
}


module.exports.ride_booking = async function (req, res) {
    try {
        var current_time = new Date(dt.now())
        customer_id = req["customer_id"]
        var driver_id = req.body.driver_id

        var sal_query1 = 'select * from booking where status ="booked" and driver_id=?'
        var values1 = [driver_id]
        var result1 = await execute_query(sal_query1, values1)

        if (result1.length !== 0) {
            responses.sendResponse(res, 'This driver is not available', constants.STATUS_CODES.SUCCESS)
        } else {
            var sal_query2 = 'select * from booking where status ="booked" and customer_id=?'
            var values2 = [customer_id]
            var result2 = await execute_query(sal_query2, values2)

            if (result2.length === 0) {
                responses.sendResponse(res, 'Customer is already booked', constants.STATUS_CODES.SUCCESS)
            }
            else {
                var sql_query = 'insert into booking (customer_id ,booking_date_time,source_ride,destination_ride,status,driver_id)values(?, ?, ?, ?, ?, ?)';
                var values = [customer_id, current_time, req.body.source_ride, req.body.destination_ride, "booked", driver_id];

                var results = await execute_query(sql_query, values)
                id = results.insertId
                responses.sendResponse(res, `Congratulations!!! Your Booking_Id is : ${id}`, constants.STATUS_CODES.SUCCESS)
            }
        }
    } catch {
        responses.sendResponse(res, "Please Enter all Required Filed", constants.STATUS_CODES.NOT_FOUND)
    }
}


module.exports.cancel_booking = async function (req, res) {
    try {
        const booking_id = req.body.booking_id
        var sql_query = 'update booking set status="cancelled" where booking_id=? and status="booked"'
        var values = [booking_id]
        let results = await execute_query(sql_query, values)
        if (results.message[27] === '0') {
            responses.sendResponse(res, "Alredy calcelled or Booking_Id is not Valid", constants.STATUS_CODES.SUCCESS)
        } else {
            responses.sendcancelResponse(res, "booking cancelled", req.body.cancel_resion, constants.STATUS_CODES.SUCCESS)
        }
    } catch {
        responses.sendResponse(res, "Some Error", constants.STATUS_CODES.SUCCESS)
    }
}


module.exports.completed_booking = async function (req, res) {
    try {
        const booking_id = req.body.booking_id
        var sql_query = 'update booking set status="completed" where booking_id=? and status="booked"'
        var values = [booking_id]
        let results = await execute_query(sql_query, values)

        if (results.message[27] === '0') {
            return responses.sendResponse(res, "Alredy updated or Booking_Id is not Valid", constants.STATUS_CODES.BAD_REQUEST)
        } else {
            responses.sendResponse(res, "Your Journey is Completed!! Thanks", constants.STATUS_CODES.SUCCESS)
        }
    } catch {
        responses.sendResponse(res, "Some Error", constants.STATUS_CODES.NOT_FOUND)
    }
}
