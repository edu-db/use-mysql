const express = require('express');
const mysql = require('mysql2/promise');
const {extend} = require("lodash") 

const config = require("./yaml-config")("./RESTfull/service.config.yml")


/**
* Шаблони  SQL-запитів
*/

const sql = {

  createProduct: `INSERT INTO PRODUCT(ID, NAME, PRODUCER) VALUES (:id, :name, :producer)`,
  
  readProductList: `SELECT * FROM PRODUCT`,
  readProductById: `SELECT * FROM PRODUCT WHERE ID= :id`,

  updateProductById: `UPDATE PRODUCT SET NAME= :name, PRODUCER= :producer WHERE ID= :id`,

  deleteProductById: `DELETE FROM PRODUCT WHERE ID= :id`

}


/**
 * Повертає результат виконання SQL-запиту
 * @param {String} query шаблон SQL-запиту
 * @param {Object} values дані для заповнення шаблону
 * @throws {Error}
 * @return {Array}
*/

const executeSQL = async (query, values) => {
  let connection
  let sqlStatement    
    try {
        connection = await mysql.createConnection({
          uri: config.db.uri,
          namedPlaceholders: true,
        });
        
        sqlStatement = connection.format(query, values)

        const [ results, fields ] = await connection.execute(sqlStatement)
        return results
    } catch (e) {
        throw new Error(`SQL: ${sqlStatement} - ${e.toString()}`)
    } finally {
        if(connection) connection.end()
    }
}


const router = new express.Router();


/**
 * Створює специфікацію товару та поверає її
 */

router.post('/:id', async (req, res) => {
  
  try {
    const values = extend({}, req.body, req.params) 
    let result = await executeSQL(sql.createProduct, values)
    result = await executeSQL(sql.readProductById, req.params)
    res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: `${err.toString()}`
    });
  }
});


/**
 * Повертає список товарів
 */

router.get('/', async (req, res) => {
  try {
    let result = await executeSQL(sql.readProductList)
    res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: `${err.toString()}`
    });
  }
});


/**
 * Повертає специфікацію товару за його id
 */

router.get('/:id', async (req, res) => {
  
  try {
    let result = await executeSQL(sql.readProductById, req.params)
    res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: `${err.toString()}`
    });
  }
});


/**
 * Оновлює специфікацію товару та повертає оновлену версію 
 * специфікації
 */

router.put('/:id', async (req, res) => {
   try {
    const values = extend({}, req.body, req.params) 
    let result = await executeSQL(sql.updateProductById, values)
    result = await executeSQL(sql.readProductById, req.params)
    res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: `${err.toString()}`
    });
  }
});


/**
 * Видаляє специфікацію товару та повертає її
 */
router.delete('/:id', async (req, res) => {
  try {
    let result = await executeSQL(sql.readProductById, req.params)
    await executeSQL(sql.deleteProductById, req.params)
    res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: `${err.toString()}`
    });
  }
});


module.exports = router;
