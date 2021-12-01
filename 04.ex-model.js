const mysql = require('mysql2/promise');
const connectionUrl = 'mysql://root:aabold@localhost:3306/x4mspp0ssyvlauv8'


const pool = mysql.createPool({ uri: connectionUrl });


const executeQuery = async query => {
    try {
        if(!pool){
            console.warn("Wait while connection pool initiated...")
        }
        await pool
        let [results,fields] = await pool.execute(query)
        return results    
    } catch (e) {
        throw e
    }
}

module.exports = {
    pool,
    findAll: async entityType => executeQuery(`select * from ${entityType}`)
}



