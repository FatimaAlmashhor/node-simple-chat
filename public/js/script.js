const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const roomContainer = document.getElementById('room-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const users_container = document.getElementById('users_container')
if (messageForm != null) {
    const name = prompt('What is your name?')
    appendMessage('You joined')
    socket.emit('new-user', roomName, name)

    messageForm.addEventListener('submit', e => {
        e.preventDefault()
        const message = messageInput.value
        appendMessage(`You: ${message}`, true)
        socket.emit('send-chat-message', roomName, message)
        messageInput.value = ''
    })
}

socket.on('room-created', room => {
    const roomElement = document.createElement('div')
    roomElement.innerText = room
    const roomLink = document.createElement('a')
    roomLink.href = `/${room}`
    roomLink.innerText = 'join'
    roomContainer.append(roomElement)
    roomContainer.append(roomLink)
})

// this is not working on the client side 
socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)

})
socket.on('show-users', users => {
    console.log('[users in clinet]', users);
    const messageElement = document.createElement('div')
    users_container.innerHTML = ''
    Object.values(users).forEach(user => {
        users_container.innerHTML += '<p>' + user + '</p>'
    })
})
socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})


function appendMessage(message, colorClass = false) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    if (colorClass)
        messageElement.classList.add('you')

    messageContainer.append(messageElement)
}