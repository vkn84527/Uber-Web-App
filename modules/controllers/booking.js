const execute_query = require('./db_query').execute_query
const responses = require('../common_functions/responses')
const constants = require('../constants/constants')
var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('m/d/Y H:M:S');


module.exports.find_drivers =  function(req, res) {
        var sql_query = 'select driver_id, vechile_id,driver_name,driver_phone from driver where driver_id not in \
        (select driver_id from booking where status="booked")'
        var values = []

        let results =  execute_query(sql_query, values,(err,results)=>{
        if (results.length === 0) {
            return responses.sendResponse(res, "No driver found", constants.STATUS_CODES.NOT_FOUND)
        }
        if(err) 
          {
        return res.json(err)
        }
        else {
            return responses.sendResponse(res, results, constants.STATUS_CODES.SUCCESS)
        }
    })
         
}

module.exports.check_bookings =function (req, res){
    
        var booking_id = req.body.booking_id
        var sql_query = 'select * from booking where booking_id=?';
        var values = [req.body.booking_id]
        let results =  execute_query(sql_query, values,(err,results)=>{

        if (results.length !== 0) {
            return responses.sendResponse(res, "You have already booked a booking", constants.STATUS_CODES.SUCCESS)
            
        }
        if (err) {
            return res.json(err)
        }
        else{
            return responses.sendResponse(res,"Your Booking ID is Not match")
        }
    })
}

module.exports.ride_booking =function (req, res){
        //var booking_date_time = new Date(dt.now())
        var current_time=new Date(dt.now())
        var sql_query = 'insert into booking (customer_id ,booking_date_time,source_ride,destination_ride,status,driver_id)values(?, ?, ?, ?, ?, ?)';
        var values = [req.body.customer_id,current_time, req.body.source_ride ,req.body.destination_ride,"booked",req.body.driver_id];

        var results =  execute_query(sql_query, values,(err,results) => {

        if (err) {
            return res.json(err)
        }
        id=results.insertId
        //return res.json(booking)
        return responses.sendResponse(res, `Your Booking_Id is : ${id}`, constants.STATUS_CODES.SUCCESS)
     
    })
}


module.exports.cancel_booking = (req, res) => {

        const booking_id = req.body.booking_id
        var sql_query = 'update booking set status="cancelled" where booking_id=?'
        var values = [booking_id]
        let results =  execute_query(sql_query, values,(err,results)=>{
        if(results.message[27]==='0'){
            return responses.sendResponse(res, "Booking_Id is not Valid", constants.STATUS_CODES.SUCCESS)
        }
        if(err) {
            res.json(err)
        }
        return responses.sendResponse(res, "booking cancelled", constants.STATUS_CODES.SUCCESS)
        
    })

}


module.exports.completed_booking =  (req, res) => {

        const booking_id = req.body.booking_id
        var sql_query = 'update booking set status="completed" where booking_id=? and status="booked"'
        var values = [booking_id]
        let results =  execute_query(sql_query, values,(err,results)=>{
        if(results.message[27]==='0'){
                return responses.sendResponse(res, "Booking_Id is not Valid", constants.STATUS_CODES.SUCCESS)
            }
        if(err) {
            res.json(err)
        }
        responses.sendResponse(res, "Your Journey is Completed!! Thanks", constants.STATUS_CODES.SUCCESS)
       
    })
    
}
