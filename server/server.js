const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);
const createdRooms = new Set();
const roomUsernames = new Map();

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("create_room", (data) => {
        if (createdRooms.has(data)) {
            // Room with the same name already exists, send an error response.
            socket.emit("create_room_response", { success: false, message: "Room already exists" });
        } else {
            socket.join(data);
            createdRooms.add(data);
            console.log(`User with ID: ${socket.id} created and joined room: ${data}`);
            console.log(createdRooms);
    
            // Room creation successful, send a success response.
            socket.emit("create_room_response", { success: true, room: data });
        }
    });

    socket.on("join_room", (data, callback) => {
        if (createdRooms.has(data)) {
            socket.join(data);
            callback("success");
            console.log(`User with ID: ${socket.id} joined room: ${data}`);
        } else {
            callback("failure");
            console.log(`User with ID: ${socket.id} attempted to join a non-existent room: ${data}`);
        }
    });

    socket.on('leave_room', (data) => {
        socket.leave(data.room);
        console.log(`${data.username} left room ${data.room}`);
      });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
      });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });

});

server.listen(3001, () => {
    console.log("SERVER 3001 RUNNING");
})
