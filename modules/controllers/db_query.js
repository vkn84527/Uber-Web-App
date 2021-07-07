const db_connections = require('../../database/db_connection');

const execute_query = (sql_query, values) => {
    return db_connections.query(sql_query, values, (err, result) => {
        if (err) return err;
        else {
            return result
        }
    })
}

module.exports = {execute_query}

