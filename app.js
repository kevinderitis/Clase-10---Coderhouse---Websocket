import express from 'express';
import { Server } from 'socket.io'

const app = express();
const httpServer = app.listen(8080, () => console.log(`Server running`));

const socketServer = new Server(httpServer);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let mensajes = [];

socketServer.on('connection', socket => {
    console.log('Nuevo socket conectado')

    socket.emit('messages', mensajes)

    socket.on('message', data => {
        mensajes.push(data);
        socketServer.emit('messages', mensajes)
    })


})