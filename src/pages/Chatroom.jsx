import { React, useEffect, useRef, useState } from 'react';
import { HiOutlinePaperAirplane } from 'react-icons/hi2';
import ScrollToBottom from "react-scroll-to-bottom";
import BubbleMes from '../components/BubbleMes';
import BubbleRes from '../components/BubbleRes';
import Lobby from './Lobby';

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
    socket.disconnect();
    setIsLeave(true);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    return () => {
      socket.off("receive_message");
    };

  }, [socket]);

  return (
    <div>
      {!isLeave ? (
      <div className='flex justify-center p-5'>
        <div className="flex flex-col justify-start items-start gap-2">
          <div>
            <div className='flex items-center justify-between font-bold text-white w-[684px] p-3 rounded-t-md bg-gray-700'>
              <div className='flex gap-1 items-center'>
                <img src="/images/MessageMeLogo.png" className='w-[38px] h-[30px]' alt="MessageMe_logo" />
                <h1 className='text-xl'>MessageMe</h1>
              </div>
              <button className='flex justify-center items-center rounded-md bg-red-700 w-24' onClick={leaveChat}>
                Leave
              </button>
            </div>
            <ScrollToBottom id='message-area' className='flex flex-col border border-gray-400 bg-gray-100 rounded-b-md w-[684px] h-[570px] overflow-y-auto'>
              {messageList.map((messageContent, index) => {
                if (messageContent.author === username) {
                  return <BubbleMes key={index} text={messageContent.message} time={messageContent.time} />;
                } else {
                  return <BubbleRes key={index} username={messageContent.author} text={messageContent.message} time={messageContent.time} />;
                }
              })}
            </ScrollToBottom>
          </div>
          <div id='message-container' className='flex'>
            <input
              type='text'
              id='message-input'
              value={currentMessage}
              onChange={(event) => { setCurrentMessage(event.target.value); }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  sendMessage();
                }
              }}
              className='border border-gray-400 rounded-l-md w-[582px] text-start p-2'
            />
            <button
              onClick={sendMessage}
              id='send-button'
              className='flex items-center justify-center gap-1 w-[102px] rounded-r-md text-white bg-green-600'
            >
              Send<HiOutlinePaperAirplane />
            </button>
          </div>
        </div>
      </div>)
      : (
        <Lobby />
      )}
    </div>
  );
}

export default Chatroom;
