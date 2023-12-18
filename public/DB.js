const mysql = require('mysql2');

function checkLoginData(login, password) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'users'
    });
    var result;
    connection.connect(function(err){
        if (err) {
          return console.error("Ошибка: " + err.message);
        }
        else{
          console.log("Подключение к серверу MySQL успешно установлено");
        }
     });

        result = connection.execute(
        "SELECT * FROM users.logindata WHERE 'login' = ? AND 'password' = ? ",
        [login,password]
        );
    if (result !== null){
        return true
    }
    else {
        return false
    }
}

module.exports.checkLoginData = checkLoginData;