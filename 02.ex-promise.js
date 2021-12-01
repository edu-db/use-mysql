
( async () => {

    const mysql = require('mysql2/promise');
    const connectionUrl = 'mysql://root:aabold@localhost:3306/x4mspp0ssyvlauv8'
    const sqlStatement = 
`
SELECT 
    product.id as product_id,
    product.name as product_name,
    producer.name as producer,
    location.name as location
FROM product 
    left join producer 
        on product.producer = producer.id
    left join location
        on producer.location = location.id
           
`


    let connection    
    
    try {
        
        connection = await mysql.createConnection({
          uri: connectionUrl
        });

        const [ results, fields ] = await connection.execute(sqlStatement)
        
        console.log(results)
    
    } catch (e) {
        console.error(e.toString())
    } finally {
        if(connection) connection.end()
    }    


})()




