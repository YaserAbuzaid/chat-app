// Import the Express framework
// Express helps create web servers easily and handle routing, middleware, and static files
const express = require('express')

// Create an instance of an Express application
const app = express()

// MIDDLEWARE HANDLING:
// This line adds a middleware function using app.use()
// Middleware in Express is a function that runs between the request and the response.
// Here, express.static() is a built-in middleware that serves static files from the "public" folder.
// So if someone requests "/", they’ll get public/index.html automatically
app.use(express.static('public'))

// Start the server and listen for HTTP connections on port 4000
// app.listen() returns an instance of the underlying Node HTTP server
const expressServer = app.listen(6969)

// Import the Socket.IO library (real-time bidirectional communication)
const socketio = require('socket.io')

// Create a Socket.IO server instance and attach it to our HTTP server
// This allows both HTTP and WebSocket connections to run on the same port (4000)
const io = socketio(expressServer, {
    // Configuration options can go here (like CORS settings)
    cors: { origin: "*"}
})

// Listen for socket connections from clients
// 'connect' is a built-in event triggered automatically by Socket.IO

// on means its waiting for connect to show up once it id==did it will do what it was doing
io.on('connect', socket => {
    // Each client that connects is assigned a unique socket.id
    // This logs their connection to the terminal
    console.log(socket.id, "has joined our server")

    // Emit a custom event called 'welcome' to this specific socket (client)
    // You can pass any kind of data as the second argument (string, object, array, etc.)
    // socket.emit('welcome', [1, 2, 3])

    // // Listen for a 'thankyou' event from the client
    // // Just for demonstration — you could log or do something on response
    // socket.on('thankyou', data => {
    //     console.log("message from client", data)
    // })

    socket.on('messageFromClientToServer', newMessage=>{
        // passsing the message to everyone connected

        io.emit('messageFromServerToAllClients', newMessage)
    })
})
