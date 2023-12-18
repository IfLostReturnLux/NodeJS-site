const express = require('express')
const app = express()

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
app.get("/User/Messages", (req,res) => {
    res.render('Messages')
})
app.get("/User/Groups", (req,res) => {
    res.render('Groups')
})

app.post('/check-user', (req,res) => {
    console.log(req.body)
    let login = req.body.login
    let password = req.body.password
    const db = require('./public/DB')
    //db.createConnection()
    if(db.checkLoginData(login,password)){
        //return res.send({"login": "kot"}), res.redirect("User") 
    }
    else{
        console.log("Вы ввели неверные данные!")
    }
    
})

const PORT = 3000;

app.listen(3000,() =>{
    console.log(`Сервер запущен http://localhost:${PORT}`)
})