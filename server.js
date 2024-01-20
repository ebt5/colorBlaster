const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Serve your static files

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('colorChange', (color) => {
        io.emit('colorChange', color); // Emit the color to all clients
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
});
