const express = require('express');
const http = require("http");

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

let connectedPeers = [];

io.on("connection", (socket) => {
    connectedPeers.push(socket.id);
    console.log('entra : ', connectedPeers);

    socket.on("pre-offer", (data) => {

        console.log('data 1 es : ', data);
        console.log("pre-offer-came")
        const { callePersonalCode, callType } = data;

        const connectdPeer = connectedPeers.find((peerSocketId) =>
            peerSocketId == callePersonalCode
        );

        console.log(connectdPeer);

        if (connectdPeer) {
            const data = {
                callerSocketId: socket.id,
                callType,
            };

            io.to(callePersonalCode).emit("pre-offer", data);
        } else {
            const data = {
                preOfferAnswer: "CALLE_NOT_FOUND",
            }
            io.to(socket.id).emit('pre-offer-answer', data);
        }
    });

    socket.on("pre-offer-answer", (data) => {
        console.log("pre offer answer came");
        console.log(data);

        const { callerSocketId } = data;
        callePersonalCode = data.preOfferAnswer;

        const connectedPeer = connectedPeers.find(
            (peerSocketId) => peerSocketId === callePersonalCode
        );

        if (connectedPeer) {
            io.to(data.callerSocketId).emit("pre-offer-answer", data);
        }
    });

    socket.on("webRTC-signaling", (data) => {
        console.log("webRTC-signaling");

        const { connectedUserSocketId } = data;
        const connectedPeer = connectedPeers.find(
            (peerSocketId) => peerSocketId === callePersonalCode
        );

        if (connectedPeer) {
            io.to(connectedUserSocketId).emit("webRTC-signaling", data);
        }
    });

    socket.on("disconnect", () => {
        console.log("user disconect");

        const newConnectedPeers = connectedPeers.filter((peerSocketId) => {
            peerSocketId !== socket.id;
        });

        connectedPeers = newConnectedPeers;
        console.log(connectedPeers);
    });
});

server.listen(PORT, () => {
    console.log(`escuchando en port ${PORT}`);
});