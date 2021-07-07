const execute_query = require('./db_query').execute_query
const responses = require('../../modules/common_functions/responses')
const constants = require('../../modules/constants/constants')
var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('m/d/Y H:M:S');


module.exports.find_drivers =  function(req, res) {
        var sql_query = 'select driver_id, vechile_id from driver where driver_id not in \
        (select driver_id from booking where status="booked")'
        var values = []

        let results =  execute_query(sql_query, values)
        if (results.length === 0) {
            return responses.sendResponse(res, "No driver found", constants.STATUS_CODES.NOT_FOUND)
        }
        if(results.error) 
          {
        return res.json(error)
        }
        else {
            return responses.sendResponse(res, results, constants.STATUS_CODES.SUCCESS)
        }
         
}


module.exports.check_bookings =function (req, res){
    
        var booking_id = req.body.booking_id
        var sql_query = 'select * from booking where booking_id=?';
        var values = [req.body.booking_id]
        let results =  execute_query(sql_query, values);

        if (results.length !== 0) {
            return responses.sendResponse(res, "You have already booked a booking", constants.STATUS_CODES.SUCCESS)
            
        }
        if (results.error) {
            return res.json(error)
        }
}

module.exports.ride_booking =function (req, res){
        //var booking_date_time = new Date(dt.now())
        var sql_query = 'insert into booking values(?, ?, ?, ?, ?, ?)';
        var values = [customer_id,new Date(dt.now()), req.body.source_ride ,req.body.destination_ride,"booked",driver_id];

        var booking =  execute_query(sql_query, values);
        if (booking.error) {
            return res.json(error)
        }
        console.log(booking);
        return res.json(booking)
     
    }


module.exports.cancel_booking = (req, res) => {

        const booking_id = req["booking_id"]
        var sql_query = 'update booking set status="cancelled" where booking_id=?'
        var values = [booking_id]
        let results =  execute_query(sql_query, values)
        if(results.error) {
            res.json(error)
        }
        return responses.sendResponse(res, "booking cancelled", constants.STATUS_CODES.SUCCESS)
    }


module.exports.completed_booking =  (req, res) => {

        const booking_id = req["booking_id"]
        var sql_query = 'update booking set status="completed" where booking_id=? and status="booked"'
        var values = [booking_id]
        let results =  execute_query(sql_query, values)
        if(results.error) {
            res.json(error)
        }
        responses.sendResponse(res, results, constants.STATUS_CODES.SUCCESS)
    
    
}
