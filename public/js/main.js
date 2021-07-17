const socket = io("/");

socket.io("connect", () => {
    console.log(" conexion exitosa con wss server");
    console.log(socket.id);
})