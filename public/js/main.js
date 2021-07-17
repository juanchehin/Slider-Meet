import * as store from './store.js';

const socket = io("/");
// import { io } from "../../app.js";

socket.on("connect", () => {
    console.log(" conexion exitosa con wss server");
    store.setSocketId(socket.id);
})