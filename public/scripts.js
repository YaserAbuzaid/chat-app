// Connect to the Socket.IO server at localhost:4000
// This uses the 'io()' function from the socket.io.min.js script (loaded in HTML)
// This returns a socket object that represents the connection
const socket = io('http://localhost:6969')

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
