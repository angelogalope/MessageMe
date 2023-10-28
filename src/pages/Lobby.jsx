import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Chatroom from './Chatroom';

const socket = io.connect("http://localhost:3001");

function Lobby() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const createRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("create_room", room);
  
      // Listen for the server's response to room creation.
      socket.on("create_room_response", (response) => {
        if (response.success) {
          setShowChat(true);
        } else {
          alert(response.message); // Display the error message from the server.
        }
  
        // Don't forget to remove the response listener if needed.
        socket.off("create_room_response");
      });
    }
  };

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room, (response) => {
        if (response === "success") {
          setShowChat(true);
        } else {
          alert("Room not found or has not been created.");
        }
      });
    }
  };
  
  return (
    <div>
      {!showChat ? (
      <div class="h-[666px] bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="flex justify-center p-5">
          <div className="flex flex-col justify-center border border-white bg-white opacity-95 rounded-[25px] w-[700px] h-[525px] mt-11">
            <div class="container mx-auto">
              <div className="mx-auto bg-[url('/images/MessageMeLogo2.png')] bg-contain bg-no-repeat w-[250px] h-[250px]"></div>
              <h1 className="text-center pb-6 font-bold text-5xl bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
                MessageMe
              </h1>
            </div>
            <div className="flex flex-col items-center">
              <div className='flex flex-col gap-3 pb-5'>
                  <input type='text' id='user-input' placeholder='Username' onChange={(event) => {setUsername(event.target.value);}} className='w-[232px] border border-gray-400 rounded-md p-2'/>
                  <input type='text' id='room-name' placeholder='Room Name' onChange={(event) => {setRoom(event.target.value);}} className='w-[232px] border border-gray-400 rounded-md p-2'/>
              </div>
              <div className='flex gap-3'>
                <button onClick={createRoom} className="border rounded-md text-white font-bold bg-cyan-400 w-[112px] p-1">
                  Create
                </button>
                <button onClick={joinRoom} className="border rounded-md text-white font-bold bg-cyan-400 w-[112px] p-1">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : (
        <Chatroom socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default Lobby;
