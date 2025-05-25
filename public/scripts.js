// Connect to the Socket.IO server at localhost:4000
// This uses the 'io()' function from the socket.io.min.js script (loaded in HTML)
// This returns a socket object that represents the connection

let username = prompt('please enter your username')
const socket = io('https://8m0hmpv1-6969.inc1.devtunnels.ms', {
    auth: {
        secret: "secretsssss"
    },
    query: {
        meaningOfLife: 69
    }
});

socket.on('connect', ()=>{
    document.getElementById('chat-status').innerHTML = '<span style="color: green; font-weight:bolder; font-size:30px;">🟢Connected</span>'
} )

socket.on('disconnect', ()=>{
    document.getElementById('chat-status').innerHTML = '<span style="color: red; font-weight:bolder; font-size:30px;">🔴Disconnected</span>'
} )
// --- SOCKET.IO CONCEPTS ---
// .emit(eventName, data) → Sends an event to the server
// .on(eventName, callback) → Listens for an event from the server

// Listen for a custom event named 'welcome' sent from the server
// When that event is received, run the callback function with the received data
socket.on('welcome', data => {
    
    // Log the data received from the server (in this case: [1, 2, 3])
    console.log(data)
    
    
    // Emit a custom event called 'thankyou' to the server
    // This sends a message back — you could attach data too (ex: socket.emit('thankyou', 'Hello!'))
    socket.emit('thankyou', [4,5,6])
})


socket.on('messageFromServerToAllClients', data=>{
    document.getElementById('messages').innerHTML += `<li>${data.username}: ${ data.newMessage} 
     <button class="buttond" onclick="this.parentElement.remove()" >🗑️</button>
     <button class="buttond" onclick="this.parentElement.innerHTML = ${data.username}: prompt('enter new mesage') " >✏️</button>
     
     </li>`
     
})

document.getElementById('messages-form').addEventListener('submit', e=>{
    e.preventDefault()
    const data ={
        newMessage: document.getElementById('user-message').value,
        username: username
    }
    document.getElementById('user-message').value = ""
// this socket is sending an event to the serevr
    socket.emit('messageFromClientToServer', data)

})




















///////////////////////////////

// // Connect to the Socket.IO server at 'http://localhost:6969'
// // The io() function is provided by the Socket.IO client library (socket.io.min.js)
// // It returns a socket object that represents the connection to the server
// const socket = io('http://localhost:6969', {
//     // Send authentication data with the connection
//     auth: {
//         secret: "This is a secret"  // Could be a token or password for server validation
//     },
//     // Send query parameters with the connection URL
//     query: {
//         meaningOfLife: 42  // Custom data, can be anything useful to the server
//     }
// })

// // Just like on the server, the socket object has:
// // - an 'on' method to listen for events from the server
// // - an 'emit' method to send events to the server

// // Listen for the 'welcome' event sent from the server
// socket.on('welcome', data => {
//     // When the server emits 'welcome', run this callback
//     // 'data' contains whatever the server sent with the event
//     console.log(data)  // Log the welcome data to the browser console

//     // Send a 'thankYou' event back to the server
//     // Here we send an array [4, 5, 6] as the event payload
//     socket.emit('thankYou', [4, 5, 6])
// })

// // Listen for the 'newClient' event sent by the server
// socket.on('newClient', data => {
//     // This event likely means a new user connected to the server
//     console.log('Message to all clients: A new socket has joined', data)
// })

// // Listen for the 'messageFromServerToAllClients' event
// socket.on('messageFromServerToAllClients', newMessage => {
//     // When this event occurs, add the message to a list in the HTML
//     // 'messages' is the ID of an element (like <ul>) in your HTML document
//     document.getElementById('messages').innerHTML += `<li>${newMessage}</li>`
// })

// // Add an event listener to a form with the ID 'messages-form'
// // This listens for the form's submit event (user sending a message)
// document.getElementById('messages-form').addEventListener('submit', e => {
//     e.preventDefault()  // Prevent the form from refreshing the page

//     // Get the text input value from an input with the ID 'user-message'
//     const newMessage = document.getElementById('user-message').value

//     // Clear the input box after getting the message
//     document.getElementById('user-message').value = ""

//     // Emit a 'messageFromClientToServer' event, sending the message to the server
//     socket.emit('messageFromClientToServer', newMessage)
// })
