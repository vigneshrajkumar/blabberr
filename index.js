const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use('/dist', express.static('dist'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.broadcast.emit('chat message', {
        "name": "system",
        "contents": "user joined",
        "isSystemMessage": true,
        "clientCount": io.of("/").sockets.size
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', {
            "name": msg.name,
            "contents": msg.contents,
            "isSystemMessage": false,
            "clientCount": io.of("/").sockets.size
        });
    });


    socket.on('disconnect', () => {
        console.log('user disconnected');
        socket.broadcast.emit('chat message', {
            "name": "system",
            "contents": "user left",
            "isSystemMessage": true,
            "clientCount": io.of("/").sockets.size
        });
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});