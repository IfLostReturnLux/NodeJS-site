function Login(form) {
     var login = form.login.value;
     var password = form.password.value;
     document.cookie = "login=kot"
     console.log(document.cookie)
     console.log("Логин: " + login + ";  Пароль: " + password);

     var fail ="";

     if(login == "" || password == ""){
         fail ="Неправильно заполнены поля!";
     }

     if (fail !== ""){
         document.getElementById('error').innerHTML = fail;
         return  false;
     }

}

function Registration(form){
    var name = form.name.value;
    var login = form.login.value;
    var password = form.password.value;
    var rePassword = form.rePassword.value;
    console.log("Логин: " + login + ";  Пароль: " + password);

    var fail ="";

    if(login == "" || password == "" || login < 4 || login >= 32 || password < 4 || name == "" || password >= 32){
        fail ='Неправильно заполнены поля!\n' +
            'Логин и пароль должны быть не менее 4 и не более 32 символов!\n'
    }
    else if (password !== rePassword){
        fail = "Пароли не совпадают!"
    }

    if (fail !== ""){
        document.getElementById('error').innerHTML = fail;
        console.log(fail);
        return  false;
    }
}

function goToRegForm(){
    window.location.href = "http://localhost:3000/Registration"
}
function  goToLogForm(){
    window.location.href = "http://localhost:3000/"
}