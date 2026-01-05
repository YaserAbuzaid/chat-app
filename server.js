const express = require('express');
const socketio = require('socket.io');

const app = express();
app.use(express.static('public'));

const expressServer = app.listen(6969, () => {
  console.log('Server running at http://localhost:6969');
});

const io = socketio(expressServer, {
  cors: { origin: "*" }
});

io.on('connect', (socket) => {
  console.log(socket.id, "joined");

  socket.on('joined', ({ username }) => {
    io.emit('messageFromServerToAllClients', {
      username: "System",
      newMessage: `${username || "Someone"} joined the chat.`,
      createdAt: Date.now()
    });
  });

  socket.on('messageFromClientToServer', (data) => {
    io.emit('messageFromServerToAllClients', data);
  });
});
