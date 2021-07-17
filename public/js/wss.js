import * as store from "./store.js";
import * as ui from "./ui.js";

console.log("entra wss");

export const registerSocketEvents = (socket) => {
    socket.on("connect", () => {
        console.log(" conexion exitosa con wss server wss");
        store.setSocketId(socket.id);
        ui.updatePersonalCode(socket.id);
    })
}