const db_connections = require('../../database/db_connection');

const execute_query = (sql_query, values,callback) => {
     return db_connections.query(sql_query, values, (err, results) => {
        if (err) callback(err)
        else {
            return callback(null,results)
        }
    })
}

module.exports = {execute_query}