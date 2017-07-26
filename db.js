const pg = require('pg');

const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'devDemo',
    password: 'devAdmin',
    user: 'postgres',
    max: 10,
    idleTimeoutMillis: 1000
});

function queryDB(sql, arrayData) {
    return new Promise((resolve, reject) => {
        pool.connect((err, client) => {
            if (err) return reject(err);
            client.query(sql, arrayData, (errQuery, result) => {
                if (errQuery) return reject(errQuery);
                resolve(result);
            });
        });
    });
}

module.exports = queryDB;

//Test Connected Database 

// queryDB('SELECT * FROM "users"')
// .then(result => console.log(result.rows))
// .catch(result => console.log(err));