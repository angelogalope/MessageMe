import React, { useState } from 'react';
import io from 'socket.io-client';
import Chatroom from './Chatroom';

const socket = io.connect("http://localhost:3001");

function Lobby() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [roomExists, setRoomExists] = useState(true);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  
  return (
    <div>
      {!showChat ? (
      // <div className='flex justify-center p-5'>
      //   <div className="flex flex-col justify-start items-start gap-2">
      //     <div className='flex flex-col'>  
      //       <div className='flex items-center font-bold text-white w-[684px] p-3 rounded-t-md bg-gray-700'>
      //         <div className='flex gap-1'>
      //           <img src="/images/MessageMeLogo.png" className='w-[38px] h-[30px]' alt="MessageMe_logo" />
      //           <h1>MessageMe</h1>
      //         </div>
      //       </div>
      //       <div className='flex flex-col justify-center border border-gray-400 bg-gray-100 rounded-b-md w-[684px] h-[620px]'>
      //         <div className='flex justify-center p-3'>
      //           <h1 className='font-bold text-xl'>Join Chatroom</h1>
      //         </div>
      //         <div className='flex flex-col items-center'>
      //             <div>  
      //               <h1>Username</h1>
      //               <input type='text' id='user-input' placeholder='gelo...' onChange={(event) => {setUsername(event.target.value);}} className='w-[232px] border border-gray-400 rounded-md p-1'/>
      //             </div>
      //             <div>  
      //               <h1>Room ID</h1>
      //               <input type='text' id='room-id' placeholder='346...' onChange={(event) => {setRoom(event.target.value);}} className='w-[232px] border border-gray-400 rounded-md p-1'/>
      //             </div>
      //             <div className='flex p-5 gap-2'>
      //               <button onClick={joinRoom} className='flex justify-center items-center border rounded-md text-white bg-green-700 w-[102px] h-[42px]'>
      //                   Create
      //               </button>
      //               <button onClick={joinRoom} className='flex justify-center items-center border rounded-md text-white bg-green-700 w-[102px] h-[42px]'>
      //                   Join
      //               </button>
      //             </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
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
                  <input type='text' id='room-id' placeholder='Room ID' onChange={(event) => {setRoom(event.target.value);}} className='w-[232px] border border-gray-400 rounded-md p-2'/>
              </div>
              <div className='flex gap-3'>
                <button onClick={joinRoom} className="border rounded-md text-white font-bold bg-cyan-400 w-[112px] p-1">
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
