const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const createdRooms = new Set();
const roomUsers = new Map();

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("get_online_users", (room, callback) => {
        if (roomUsers.has(room)) {
            const users = Array.from(roomUsers.get(room));
            callback(users);
        } else {
            callback([]);
        }
    });

    socket.on("create_room", (data, username) => {
        if (createdRooms.has(data)) {
            socket.emit("create_room_response", { success: false, message: "Room already exists" });
        } else {
            socket.join(data);
            createdRooms.add(data);
    
            if (!roomUsers.has(data)) {
                roomUsers.set(data, new Set());
            }
    
            roomUsers.get(data).add(username);
            console.log(`User with ID: ${socket.id} created and joined room: ${data}`);
            console.log("This is the room created ", createdRooms);
    
            socket.emit("create_room_response", { success: true, room: data });
        }
    });

    socket.on("join_room", (data, username, callback) => {
        if (createdRooms.has(data)) {
            socket.join(data);

            if (roomUsers.get(data).has(username)) {
                callback("username_exist");
            } else {
                if (!roomUsers.has(data)) {
                    roomUsers.set(data, new Set());
                }
                roomUsers.get(data).add(username);
            }
            callback("success");
            console.log(`User with ID: ${socket.id} joined room: ${data}`);
        } else {
            callback("failure");
            console.log(`User with ID: ${socket.id} attempted to join a non-existent room: ${data}`);
        }
    
        if (roomUsers.has(data)) {
            const users = Array.from(roomUsers.get(data)).filter((user) => user !== username);
            io.to(data).emit("update_online_users", users);
        } else {
            io.to(data).emit("update_online_users", []);
        }
    });

    socket.on('leave_room', (data) => {
        if (roomUsers.has(data.room)) {
            roomUsers.get(data.room).delete(data.username);
            const users = Array.from(roomUsers.get(data.room));
            io.to(data.room).emit("update_online_users", users);
        }
        socket.leave(data.room);
        checkAndDeleteEmptyRooms(data.room);
        console.log(`${data.username} left room ${data.room}`);
        console.log("Users left the room: ", roomUsers);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    io.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    
        createdRooms.forEach((room) => {
            if (roomUsers.has(room)) {
                if (roomUsers.get(room).has(socket.id)) {
                    socket.leave(room);
                    roomUsers.get(room).delete(socket.id);
    
                    const onlineUsers = Array.from(roomUsers.get(room));
                    io.to(room).emit("update_online_users", onlineUsers);
                }
                checkAndDeleteEmptyRooms(room);
            }
        });
    });

    function checkAndDeleteEmptyRooms(room) {
        const roomSockets = io.sockets.adapter.rooms.get(room);
        if (!roomSockets || roomSockets.size === 0) {
            createdRooms.delete(room);
            roomUsers.delete(room);
            console.log(`Room ${room} is empty and has been deleted.`);
        }
    }
});

server.listen(3001, () => {
    console.log("SERVER 3001 RUNNING");
});
