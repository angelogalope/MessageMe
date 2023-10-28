import { React, useEffect, useRef, useState } from 'react';
import { HiOutlinePaperAirplane } from 'react-icons/hi2';
import ScrollToBottom from "react-scroll-to-bottom";
import BubbleMes from '../components/BubbleMes';
import BubbleRes from '../components/BubbleRes';
import Lobby from './Lobby';
import OnUser from '../components/OnUser';

function Chatroom({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [isLeave, setIsLeave] = useState(false);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const currentTime = new Date(Date.now());
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;

      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`,
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const leaveChat = () => {
    const leaveData = {
      room: room,
      username: username,
    };

    socket.emit('leave_room', leaveData);
    setIsLeave(true);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket, username]);

  return (
    <div>
      {!isLeave ? (
      <div className="">
        <div class="flex flex-row">
          {/* Left Side column start */}
          <div className="w-[292px] h-[666px] border-r bg-gray-800 border-gray-700">
            {/* USER DIV start */}
            <div className="border-b border-gray-700">
              <div className=" bg-blue-500 rounded-full w-[50px] h-[50px] mx-auto mt-7 "></div>
              <h1 className="text-center text-2xl font-semibold pt-2 pb-5 text-white">
                {username}
              </h1>
            </div>
            {/* USER DIV end */}

            {/* Chats div start */}
            <div className=' p-2 text-xl font-medium text-white'>
              <h1>Room Name:</h1>
            </div>
            <div className="flex flex-col bg-gray-800 h-[45px] overflow-auto scrollbar-track-gray-800 scrollbar-thumb-gray-700 scrollbar-thin">
              <div className='flex flex-col gap-1 justify-between text-white text-lg px-5'>
                <h1 className='text-2xl font-medium'>{room}</h1>
              </div>
            </div>
            <div className=' px-2 pb-2 text-xl font-medium text-white'>
                <h1>Online:</h1>
            </div>
            <div id='online_users' className="flex flex-col bg-gray-800 h-[310px] border-t border-gray-700 overflow-auto scrollbar-track-gray-800 scrollbar-thumb-gray-700 scrollbar-thin">
              
            </div>
            {/* Chats DIV end */}

            {/* Disconnect div start */}
            <div className="p-2 h-[85px] border-t border-gray-700">
              <button
                onClick={leaveChat}
                className="flex justify-center items-center rounded-full mx-auto bg-red-700 w-[200px] mt-3 h-[50px]"
              >
                <h1 className='text-white text-xl font-medium'>Disconnect</h1>
              </button>
            </div>
            {/* Disconnect div end */}
          </div>
          {/* Left Side column end */}

          {/* Right side column start */}
          <div className='flex flex-col w-[710px]'>
            <div className="flex h-[70px] w-[710px] bg-gradient-to-r from-cyan-500 to-blue-500 text-3xl text-white font-medium items-center p-5">
              MessageMe
            </div>
            {/* Chatbox start */}
            <ScrollToBottom id="message_area" className=" h-[504px] bg-white">
              {messageList.map((messageContent, index) => {
                if (messageContent.author === username) {
                  return <BubbleMes key={index} text={messageContent.message} time={messageContent.time}/>;
                } else {
                  return <BubbleRes key={index} username={messageContent.author} text={messageContent.message} time={messageContent.time}/>;
                }
              })}
            </ScrollToBottom>
            {/* Chatbox end */}

            <div
              id="message-container"
              className="flex justify-center items-center h-[92px] bg-white border-t"
            >
              <div id="send-container" className="flex flex-row justify-center pl-2 gap-2">
                <input
                  placeholder='Send message'
                  id="message-input"
                  className=" bg-gray-800 rounded-[25px] h-[50px] w-[582px] text-start p-3 px-5 my-2 text-white"
                  value={currentMessage}
                  onChange={(event) => { setCurrentMessage(event.target.value); }}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      sendMessage();
                    }
                  }}
                ></input>
                <button
                  id="send-button"
                  onClick={sendMessage}
                  className="flex items-center justify-center gap-1 w-[90px] h-[50px] rounded-full m-2 text-white bg-cyan-500 font-bold"
                >
                  Send
                  <HiOutlinePaperAirplane />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : (
        <Lobby />
      )}
    </div>
  );
}

export default Chatroom;
