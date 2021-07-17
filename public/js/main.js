const socket = io("/");
// import { io } from "../../app.js";

socket.on("connect", () => {
    console.log(" conexion exitosa con wss server");
    console.log(socket.id);
})