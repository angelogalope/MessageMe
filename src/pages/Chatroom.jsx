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

  }, [socket]);

  return (
    <div>
      {!isLeave ? (
      // <div className='flex justify-center p-5'>
      //   <div className="flex flex-col justify-start items-start gap-2">
      //     <div>
      //       <div className='flex items-center justify-between font-bold text-white w-[684px] p-3 rounded-t-md bg-gray-700'>
      //         <div className='flex gap-1 items-center'>
      //           <img src="/images/MessageMeLogo.png" className='w-[38px] h-[30px]' alt="MessageMe_logo" />
      //           <h1 className='text-xl'>MessageMe</h1>
      //         </div>
      //         <button className='flex justify-center items-center rounded-md bg-red-700 w-24' onClick={leaveChat}>
      //           Leave
      //         </button>
      //       </div>
        //     <ScrollToBottom id='message-area' className='flex flex-col border border-gray-400 bg-gray-100 rounded-b-md w-[684px] h-[570px] overflow-y-auto'>
        //       {messageList.map((messageContent, index) => {
        //         if (messageContent.author === username) {
        //           return <BubbleMes key={index} text={messageContent.message} time={messageContent.time} />;
        //           } else {
        //             return <BubbleRes key={index} username={messageContent.author} text={messageContent.message} time={messageContent.time} />;
        //           }
        //         })}
        //      </ScrollToBottom>
      //     </div>
      //     <div id='message-container' className='flex'>
      //       <input
      //         type='text'
      //         id='message-input'
      //         value={currentMessage}
      //         onChange={(event) => { setCurrentMessage(event.target.value); }}
      //         onKeyPress={(event) => {
      //           if (event.key === "Enter") {
      //             sendMessage();
      //           }
      //         }}
      //         className='border border-gray-400 rounded-l-md w-[582px] text-start p-2'
      //       />
      //       <button
      //         onClick={sendMessage}
      //         id='send-button'
      //         className='flex items-center justify-center gap-1 w-[102px] rounded-r-md text-white bg-green-600'
      //       >
      //         Send<HiOutlinePaperAirplane />
      //       </button>
      //     </div>
      //   </div>
      // </div>
      <div className="">
        <div class="flex flex-row">
          {/* Left Side column start */}
          <div className="w-[292px] border-r bg-gray-800 border-gray-700">
            {/* USER DIV start */}
            <div className="border-b border-gray-700">
              <div className=" bg-blue-500 rounded-full w-[50px] h-[50px] mx-auto mt-7 "></div>
              <h1 className="text-center text-1xl py-5 text-white">
                USERNAME
              </h1>
            </div>
            {/* USER DIV end */}

            {/* Chats div start */}
            <div className="flex flex-col gap-0 bg-gray-800 h-[440px] overflow-auto scrollbar-track-gray-800 scrollbar-thumb-gray-700 scrollbar-thin">
              <div class="flex gap-2">
                <div className=" bg-blue-500 rounded-full w-[42px] h-[42px] my-5 ml-8"></div>
                <h1 className="col-span-2 mt-7  text-md text-white">
                  TEST NAME
                </h1>
              </div>
              <div class="flex gap-2">
                <div className=" bg-blue-500 rounded-full w-[42px] h-[42px] my-5 ml-8"></div>
                <h1 className="col-span-2 mt-7  text-md text-white">
                  TEST NAME
                </h1>
              </div>
              <div class="flex gap-2">
                <div className=" bg-blue-500 rounded-full w-[42px] h-[42px] my-5 ml-8"></div>
                <h1 className="col-span-2 mt-7  text-md text-white">
                  TEST NAME
                </h1>
              </div>
              <div class="flex gap-2">
                <div className=" bg-blue-500 rounded-full w-[42px] h-[42px] my-5 ml-8"></div>
                <h1 className="col-span-2 mt-7  text-md text-white">
                  TEST NAME
                </h1>
              </div>
              <div class="flex gap-2">
                <div className=" bg-blue-500 rounded-full w-[42px] h-[42px] my-5 ml-8"></div>
                <h1 className="col-span-2 mt-7  text-md text-white">
                  TEST NAME
                </h1>
              </div>
              <div class="flex gap-2">
                <div className=" bg-blue-500 rounded-full w-[42px] h-[42px] my-5 ml-8"></div>
                <h1 className="col-span-2 mt-7  text-md text-white">
                  TEST NAME
                </h1>
              </div>
            </div>
            {/* Chats DIV end */}

            {/* Disconnect div start */}
            <div className="p-2 h-[85px] border-t border-gray-700">
              <button
                onClick={leaveChat}
                className="flex justify-center items-center rounded-full mx-auto bg-red-700 w-[200px] mt-3 h-[50px]"
              >
                <h1>Disconnect</h1>
              </button>
            </div>
            {/* Disconnect div end */}
          </div>
          {/* Left Side column end */}

          {/* Right side column start */}
          <div className='flex flex-col w-[710px]'>
            <div className="flex h-[70px] w-[710px] bg-gradient-to-r from-cyan-500 to-blue-500 text-xl text-white font-medium items-center p-5">
              TEST NAME
            </div>
            {/* Chatbox start */}
            <ScrollToBottom className=" h-[535px] bg-white">
              {messageList.map((messageContent, index) => {
                if (messageContent.author === username) {
                  return <BubbleMes key={index} text={messageContent.message} time={messageContent.time}/>;
                } else {
                  return <BubbleRes key={index} username={messageContent.author} text={messageContent.message} time={messageContent.time} />;
                }
              })}
            </ScrollToBottom>
            {/* Chatbox end */}

            <div
              id="message-container"
              className="flex  h-[63px] bg-white border-t"
            >
              <div id="send-container" className="flex flex-row pl-2 gap-2">
                <input
                  placeholder='Send message'
                  id="message-input"
                  className=" bg-gray-800 rounded-[25px] w-[582px] text-start p-3 px-5 my-2 text-white"
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
                  className="flex items-center justify-center gap-1 w-[90px] h-[45px] rounded-full m-2 text-white bg-cyan-500 font-bold"
                >
                  Send
                  <HiOutlinePaperAirplane />
                </button>
              </div>
            </div>

          </div>
          {/* <div className="bg-gradient-to-r from-cyan-500 to-blue-500"> */}
            
              {/* <div className="h-[70px] border-gray-500 ">
                <div class="grid grid-cols-8">
                  <div className=" bg-blue-500 rounded-full w-[42px] h-[42px] my-4 ml-8"></div>
                  <h1 className="col-span-2 mt-7 font-medium text-1xl text-black">
                    TEST NAME
                  </h1>
                </div>
              </div> */}

              {/* Chatbox start */}
              {/* <ScrollToBottom className=" h-[535px] bg-white">
                {messageList.map((messageContent, index) => {
                  if (messageContent.author === username) {
                    return <BubbleMes key={index} text={messageContent.message} time={messageContent.time} />;
                  } else {
                    return <BubbleRes key={index} username={messageContent.author} text={messageContent.message} time={messageContent.time} />;
                  }
                })}
              </ScrollToBottom> */}
              {/* Chatbox end */}

              {/* message container start */}
              {/* <div
                id="message-container"
                className="flex  h-[63px] bg-white border-t"
              >
                <div id="send-container" className="flex flex-row pl-2 gap-2">
                  <input
                    placeholder='Send message'
                    id="message-input"
                    className=" bg-gray-800 rounded-[25px] w-[582px] text-start p-3 my-2 text-white"
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
                    className="flex items-center justify-center gap-1 w-[90px] h-[45px] rounded-full m-2 text-white bg-cyan-500 font-bold"
                  >
                    Send
                    <HiOutlinePaperAirplane />
                  </button>
                </div>
              </div> */}

              {/* message container end */}
          {/* </div> */}
          {/* Right side column end */}
        </div>
      </div>
      ) : (
        <Lobby />
      )}
    </div>
  );
}

export default Chatroom;
