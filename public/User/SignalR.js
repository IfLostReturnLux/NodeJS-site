var myUserName = localStorage.getItem("name");

let connection = new signalR.HubConnectionBuilder()
	.withUrl('http://localhost/chatHub')
	.build()

	connection.start().then(() =>
		console
			.log('Успешно подключились к серверу SignalR!')
			.catch(function (err) {
				return console.error(err.toString())
			})
	)

connection.invoke('SendMessage', myUserName, message => {
	console.log("Имя " + myUserName + ", с сообщением: " + message)
})



    connection.on('RecieveMessage', function (message, userName) {
			const userNameElem = document.createElement('b')
			userNameElem.textContent = `${userName}: `

			const elem = document.createElement('p')
			elem.appendChild(userNameElem)
			elem.appendChild(document.createTextNode(message))

			const firstElem = document.getElementById('messages').firstChild
			document.getElementById('messages').insertBefore(elem, firstElem)
		})