import { React, useEffect, useRef, useState } from 'react';
import { HiOutlinePaperAirplane } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
 
function Chatroom({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const containerRef = useRef();

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }
    
            await socket.emit("send_message", messageData);
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, []);

    const scrollToBottom = () => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      };

      useEffect(() => {
        scrollToBottom();
      }, []);
      
    return (
        <div className='flex justify-center p-5'>
            <div className="flex flex-col justify-start items-start gap-2">
                <div>  
                    <div className='flex items-center justify-between font-bold text-white w-[684px] p-3 rounded-t-md bg-gray-700'>
                        <div className='flex gap-1 items-center'>
                            <img src="/images/MessageMeLogo.png" className='w-[38px] h-[30px]' alt="MessageMe_logo" />
                            <h1 className='text-xl'>MessageMe</h1>
                        </div>
                        <Link to="/" className='flex justify-center items-center rounded-md bg-red-700 w-24'>
                            <h1>
                                Leave
                            </h1>
                        </Link>
                    </div>
                    <div id='message-area' className='flex flex-col border border-gray-400 bg-gray-100 rounded-b-md w-[684px] h-[570px] overflow-y-auto' ref={containerRef}>
                        {messageList.map((messageContent, index) => {
                            return <h1 key={index}>{messageContent.message}</h1>
                        })}
                    </div>
                </div>
                <div id='message-container' className='flex'>
                    <input type='text' id='message-input' onChange={(event) => {setCurrentMessage(event.target.value);}} className='border border-gray-400 rounded-l-md w-[582px] text-start p-2'/>
                    <button onClick={sendMessage} id='send-button' className='flex items-center justify-center gap-1 w-[102px] rounded-r-md text-white bg-green-600'>Send<HiOutlinePaperAirplane/></button>
                </div>
            </div>
        </div>
    );
}

export default Chatroom;
