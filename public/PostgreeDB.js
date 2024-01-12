//const postgreesql = require("pg");
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres', // Пользователь базы данных
    host: 'localhost', // Хост базы данных (обычно localhost)
    database: 'users', // Название базы данных, которую мы создали
    password: 'root', // Пароль пользователя postgres
    port: 5432, // Порт PostgreSQL (по умолчанию 5432)
  });


pool.query('SELECT NOW()', (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса:', err);
    } else {
      console.log('Результат запроса:', result.rows[0]);
    }
  });

  async function CheckUser(sql, data, callback) {
    console.log(sql);
    const { rows } = pool.query(sql, [data.login,data.password]);
    console.log("Результат запроса выборки: " + rows);
    callback(null,rows.length);
}
async function CreateUser(sql, data) {
    console.log(sql);
    console.log(data);
    const rows = pool.query(sql, [data.login,data.password]);
}
async function Do(){
  const rows  = await pool.query('SELECT * FROM users.public.logindata', (err,result) => {
    console.log(result.rowCount)
    return result.rowCount
  });
  console.log("Результат выборки: " + rows);
}
Do();

exports.checkUser = CheckUser;
exports.createUser = CreateUser;