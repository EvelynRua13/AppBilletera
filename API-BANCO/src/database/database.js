import mysql from 'mysql2/promise'
import config from './config.js'

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.dbport
})

const getConnection = () => {
    return connection
}
export {getConnection}