const connection = require('../../database/db_connection');
const db_connections = require('../../database/db_connection');


const execute_query = (sql_query, values) => {
    return new Promise((resolve, reject) => {
       /*var conn =*/ db_connections.query(sql_query, values, (err, result) => {
        // console.log(conn.sql)    
        if (err) return reject(err);
        resolve(result);
    })
    })
}

module.exports = { execute_query }