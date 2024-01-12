function Login(form) {
    var login = form.login.value
    var password = form.password.value
    var data = {"login":login , "password":password}
    document.cookie = "login=kot"
    console.log(document.cookie)
    var fail ="";
    if(login == "" || password == ""){ 
        fail ="Неправильно заполнены поля!";
    }
    if (fail !== ""){
        document.getElementById('error').innerHTML = fail;
        return  false;
    }
    else{
        localStorage.setItem("name", login)
        const response = fetch("/Authorization", {
            method: "POST",
            body: data,
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
        }
        else{
            console.log(response.body)
            return false;
        }
    }
     

}

function Registration(form){
    var name = form.name.value;
    var login = form.login.value;
    var password = form.password.value;
    var rePassword = form.rePassword.value;

    var data = {"name":name,"login":login,"password":password,"rePassword":rePassword}
    
    console.log("Логин: " + login + ";  Пароль: " + password);

    var fail ="";
//|| login < 4 || login >= 32 || password < 4  || password >= 32
    if(login == "" || password == "" || name == "" ){
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
    }else{
        const response = fetch("/Registration", {
            method: "POST",
            body: data,
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
        }
        else{
            console.log(response.body)
            return false;
        }
    }
}