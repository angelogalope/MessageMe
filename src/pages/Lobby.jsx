import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { BiSolidMessageAltDots } from 'react-icons/bi';
import io from 'socket.io-client';
import Chatroom from './Chatroom';

const socket = io.connect("http://localhost:3001");

function Lobby() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  
  return (
    <div className='flex justify-center p-5'>
      {!showChat ? (
      <div className="flex flex-col justify-start items-start gap-2">
        <div className='flex flex-col'>  
          <div className='flex items-center font-bold text-white w-[684px] p-3 rounded-t-md bg-gray-700'>
            <div className='flex gap-1'>
              <BiSolidMessageAltDots size={30} color='white'/>
              <h1>MessageMe</h1>
            </div>
          </div>
          <div className='flex flex-col justify-center border border-gray-400 bg-gray-100 rounded-b-md w-[684px] h-[620px]'>
            <div className='flex justify-center p-3'>
              <h1 className='font-bold text-xl'>Join Chatroom</h1>
            </div>
            <div className='flex flex-col items-center'>
                <div>  
                  <h1>Username</h1>
                  <input type='text' id='user-input' placeholder='gelo...' onChange={(event) => {setUsername(event.target.value);}} className='w-[232px] border border-gray-400 rounded-md p-1'/>
                </div>
                <div>  
                  <h1>Room ID</h1>
                  <input type='text' id='room-id' placeholder='346...' onChange={(event) => {setRoom(event.target.value);}} className='w-[232px] border border-gray-400 rounded-md p-1'/>
                </div>
                <button onClick={joinRoom} className='flex justify-center items-center border rounded-md text-white bg-green-700 w-[132px] h-[42px]'>
                    Join
                </button>
            </div>
          </div>
        </div>
      </div>)
      : (
        <Chatroom socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default Lobby;
