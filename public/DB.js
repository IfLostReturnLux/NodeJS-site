const mysql = require ("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'diplom'
}).promise();

async function CheckUser(sql, data, callback) {
    console.log(sql)
    const [rows, fields] = await connection.query(sql, [data.login,data.password]);
    connection.end;
    callback(null,rows.length);
}
async function CreateUser(sql, data) {
    console.log(sql)
    console.log(data)
    const [rows, fields] = await connection.query(sql, [data.login,data.password]);
    connection.end;
}

exports.checkUser = CheckUser;
exports.createUser = CreateUser;

