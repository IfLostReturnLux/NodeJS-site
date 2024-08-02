const express = require('express')
const http = require('http');

const db = require("./public/DB")
//const postgreesql = require("./public/PostgreeDB")

const app = express()
const server = require('http').Server(app);

const io = require("socket.io")(server);


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))

app.get('/', (req,res) =>{
    res.render('Main')
})
app.get('/Registration', (req,res) =>{
    res.render('Registration')
})
app.get('/Authorization', (req,res) =>{
    res.render('Authorization')
})
app.get("/User", (req,res) => {
    res.render('User')
})
app.get("/User/News", (req,res) => {
    res.render('News')
})
app.get("/User/ChatRoom.js", (req,res) => {
    res.send("public\ChatRoom.js")
})
app.get("/User/Messages", (req,res) => {
    res.render('Messages')
})
app.get("/User/Groups", (req,res) => {
    res.render('Groups')
})

app.post('/Authorization', (req,res) => {
    let login = req.body.login
    let password = req.body.password
    var data = {"login":login,"password":password}
    var sql = "SELECT * FROM users.logindata WHERE login = ? AND password = ?"

    console.log("data " + data)

    db.checkUser(sql,data,(err,results) =>{
            console.log("result1(rows) =" + results);
            if(results > 0){
                return res.redirect("User")
            }
            else{
                console.log("Вы ввели неверные данные!");
            }
        });
})

app.post('/Registration',(req,res) => {
    console.log(req.body)
    var data = [req.body.login]
    var regData = {"login":req.body.login, "password":req.body.password}
    console.log("data " + regData)
    var sql = "SELECT * FROM users.logindata WHERE login = ?"
    db.checkUser(sql,data,(err,results) =>{
        if(results > 0){
            console.log("Пользователь с таким именем уже занят!");
        }
        else{
            sql = "INSERT INTO users.logindata (login,password) VALUES (?,?)"
            db.createUser(sql,regData)
            return res.redirect("User")
        }
    })

})

const PORT = 3000;

io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('info', "Hello world!")
    socket.on('disconnect', () => {
        console.log('user disconnected');
  });
      
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
})

server.listen(PORT,() =>{
    console.log(`Сервер запущен http://localhost:${PORT}`)
})

