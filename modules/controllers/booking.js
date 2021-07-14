const execute_query = require('./db_query').execute_query
const responses = require('../common_functions/responses')
const constants = require('../constants/constants')
var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('m/d/Y H:M:S');

module.exports.find_drivers = function (req, res) {
    var sql_query = 'select driver_id, vechile_id,driver_name,driver_phone from driver where driver_id not in \
        (select driver_id from booking where status="booked")'
    var values = []

    let results = execute_query(sql_query, values)
    results.then((message) => {
        if (message.length === 0) {
            responses.sendResponse(res, "No driver found", constants.STATUS_CODES.NOT_FOUND)
        }
        else {
            responses.sendResponse(res, message, constants.STATUS_CODES.SUCCESS)
        }
    }).catch((message) => {
        responses.sendResponse(res, message, constants.STATUS_CODES.NOT_FOUND)
    })

}

module.exports.check_bookings = function (req, res) {

    var booking_id = req.body.booking_id
    var sql_query = 'select * from booking where booking_id=?';
    var values = [req.body.booking_id]
    let results = execute_query(sql_query, values)
    results.then((message) => {
        if (message.length !== 0) {
            responses.sendResponse(res, "You have already booked a booking", constants.STATUS_CODES.SUCCESS)
        } else {
            responses.sendResponse(res, "Your Booking ID is Not match")
        }
    }).catch((message) => {
        responses.sendResponse(res, "Some Erorr", constants.STATUS_CODES.NOT_FOUND)
    })
}


module.exports.ride_booking = function (req, res) {
    //var booking_date_time = new Date(dt.now())
    customer_id = req["customer_id"]
    var current_time = new Date(dt.now())
    var driver_id = req.body.driver_id

    var sal_query1 = 'select * from booking where status ="booked" and driver_id=?'
    var values1 = [driver_id]
    var result1 = execute_query(sal_query1,values1)
    result1.then((mess) => {
        if (mess.length !== 0) {
            responses.sendResponse(res, `Driver_ID: ${driver_id} is busy with Customer_Id: ${customer_id}`, constants.STATUS_CODES.SUCCESS)
        } else {
            var sal_query2 = 'select * from booking where status ="booked" and customer_id=?'
            var values2 = [customer_id]
            var result2 = execute_query(sal_query2,values2)
            result2.then((msg) => {
                //console.log(msg)
                if (msg.length === 0) {
                    responses.sendResponse(res, `Customer_Id: ${customer_id} is busy with Driver_ID: ${driver_id}`, constants.STATUS_CODES.SUCCESS)
                } else {

                    var sql_query = 'insert into booking (customer_id ,booking_date_time,source_ride,destination_ride,status,driver_id)values(?, ?, ?, ?, ?, ?)';
                    var values = [customer_id, current_time, req.body.source_ride, req.body.destination_ride, "booked", driver_id];

                    var results = execute_query(sql_query, values)
                    results.then((message) => {
                        id = message.insertId
                        //return res.json(booking)
                        responses.sendResponse(res, `Your Booking_Id is : ${id}`, constants.STATUS_CODES.SUCCESS)

                    }).catch((message) => {
                        responses.sendResponse(res, "Some Error ", constants.STATUS_CODES.BAD_REQUEST)
                    })
                }

            }).catch((msg) => {
                responses.sendResponse(res, "Some Erorr with with Customer_Id", constants.STATUS_CODES.NOT_FOUND)
            })
        }

    }).catch((mess) => {
        responses.sendResponse(res, "Some Erorr with Driver_Id", constants.STATUS_CODES.NOT_FOUND)
    })
}


module.exports.cancel_booking = (req, res) => {

    const booking_id = req.body.booking_id
    var sql_query = 'update booking set status="cancelled" where booking_id=?'
    var values = [booking_id]
    let results = execute_query(sql_query, values)
    results.then((message) => {
        //console.log(message)
        if (message.message[27] === '0') {
            responses.sendResponse(res, "Alredy calcelled or Booking_Id is not Valid", constants.STATUS_CODES.SUCCESS)
        } else {
            responses.sendResponse(res, "booking cancelled", constants.STATUS_CODES.SUCCESS)
        }
    }).catch((message) => {
        responses.sendResponse(res, "Some Error", constants.STATUS_CODES.SUCCESS)
    })

}


module.exports.completed_booking = (req, res) => {

    const booking_id = req.body.booking_id
    var sql_query = 'update booking set status="completed" where booking_id=? and status="booked"'
    var values = [booking_id]
    let results = execute_query(sql_query, values)
    results.then((message) => {
        if (message.message[27] === '0') {
            return responses.sendResponse(res, "Alredy updated or Booking_Id is not Valid", constants.STATUS_CODES.BAD_REQUEST)
        } else {
            responses.sendResponse(res, "Your Journey is Completed!! Thanks", constants.STATUS_CODES.SUCCESS)
        }
    }).catch((message) => {
        responses.sendResponse(res, "Some Error", constants.STATUS_CODES.NOT_FOUND)
    })
}
