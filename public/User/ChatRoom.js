var socket = io.connect();
var messages = document.getElementById('messages');
var input = document.getElementById("messageInput")
var button = document.getElementById("messageButton")
function SendMessage() {
    var name = localStorage.getItem("name");
    console.log(input.value)
    if(input.value){
        socket.emit('chat message', {"name":name,"message":input.value});
        input.value = '';
    } 
}
socket.on('info', function (data) {
    console.log(data);
});

socket.on('chat message', function(msg) {
    var item = document.createElement('p');
    var label = document.createElement('label');
    var div = document.createElement('div');

    if(msg.name == localStorage.getItem("name")){
        item.setAttribute("id", "youMessage")
        label.setAttribute("id","youLabel")
        label.setAttribute("for","youMessage")
    }
    else{
        item.setAttribute("id", "friendMessage")
        label.setAttribute("id","friendLabel")
        label.setAttribute("for","friendMessage")
    }

label.textContent = msg.name + " : ";
item.textContent =  msg.message;
messages.appendChild(item);
messages.appendChild(label);
window.scrollTo(0, document.body.scrollHeight);
})





