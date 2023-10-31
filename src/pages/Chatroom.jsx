import { React, useEffect, useState } from 'react';
import { PiPaperPlaneRightFill } from 'react-icons/pi';
import { BiImageAdd } from 'react-icons/bi';
import { MdCancel } from 'react-icons/md';
import ScrollToBottom from "react-scroll-to-bottom";
import BubbleMes from '../components/BubbleMes';
import BubbleRes from '../components/BubbleRes';
import Lobby from './Lobby'

function Chatroom({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [isLeave, setIsLeave] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([username]);
  const [image, setImage] = useState("");
	const [selectedImg, setSelelectedImg] = useState("");

  useEffect(() => {
    socket.emit("get_online_users", room, (users) => {
      setOnlineUsers(users);
    });

    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    socket.on("update_online_users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket, room, username, onlineUsers]);

  const sendMessage = async () => {
    if (currentMessage !== "" || image !== "") {
      const currentTime = new Date(Date.now());
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;

      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        image: image,
        time: `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`,
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
      setSelelectedImg("");
			setImage("");
    }
  };

  const handleImageChange = (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		if (file) {
			if (file.size > 1048576) {
				setImage("");
				setSelelectedImg("");
				alert("File is too large select another image, 1mb maximum.");
				fileInput.value = "";
			} else {
				fileInput.value = "";
				const reader = new FileReader();
				reader.readAsDataURL(file);
				setSelelectedImg(file.name);
				reader.onload = (e) => {
					setImage(e.target.result);
				};
			}
		} else {
			fileInput.value = "";
			alert("front end errror");
		}
	};

  const handleRemoveFile = (e) => {
		e.preventDefault();
		setImage("");
		setSelelectedImg("");
	};

  const leaveChat = () => {
    const leaveData = {
      room: room,
      username: username,
    };

    socket.emit('leave_room', leaveData);
    setIsLeave(true);
  };


  return (
    <div>
      {!isLeave ? (
      <div className="">
        <div class="flex flex-row">
          {/* Left Side column start */}
          <div className="w-[292px] h-[666px] border-r bg-gray-800 border-gray-700">
            {/* USER DIV start */}
            <div className="border-b border-gray-700">
              <div className=" bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full w-[50px] h-[50px] mx-auto mt-7 flex justify-center items-center text-center text-white text-2xl">
                <h1>{username.charAt(0).toUpperCase()}</h1>
              </div>
              <h1 className="text-center text-2xl font-semibold pt-2 pb-5 text-white">
                {username}
              </h1>
            </div>
            {/* USER DIV end */}

            {/* Chats div start */}
            <div className=' p-2 text-xl font-medium text-white'>
              <h1>Room Name:</h1>
            </div>
            <div className="flex flex-col bg-gray-800 h-[45px]">
              <div className='flex flex-col gap-1 justify-between text-white text-lg px-5 '>
                <h1 className='text-2xl font-medium'>{room}</h1>
              </div>
            </div>
            <div className=' px-2 pb-2 text-xl font-medium text-white'>
                <h1>Online:</h1>
            </div>
            <div id='online_users' className="flex flex-col bg-gray-800 w-[233px] h-[310px] border-t border-gray-700 overflow-auto scrollbar-track-gray-800 scrollbar-thumb-gray-700 scrollbar-thin">
            {onlineUsers.map((user, index) => (
              <div key={index} class="flex gap-3 px-3">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full w-[42px] h-[42px] my-5 ml-8 flex justify-center items-center text-center text-white text-2xl">
                    <h1>{user.charAt(0).toUpperCase()}</h1>
                  </div>
                  <h1 className="col-span-2 mt-7  text-2xl text-white">
                      {user}
                  </h1>
              </div>
            ))}
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
              <img src='/images/MessageMeLogo2.png' className='w-[38px] h-[30px] mr-1'/>essageMe
            </div>
            {/* Chatbox start */}
            <ScrollToBottom id="message_area" className=" h-[504px] bg-white overflow-auto scrollbar-track-cyan-400 scrollbar-thumb-gray-500 scrollbar-thin">
              {messageList.map((messageContent, index) => {
                if (messageContent.author === username) {
                  return <BubbleMes key={index} image={messageContent.image} text={messageContent.message} time={messageContent.time}/>;
                } else {
                  return <BubbleRes key={index} image={messageContent.image} username={messageContent.author} text={messageContent.message} time={messageContent.time}/>;
                }
              })}
            </ScrollToBottom>
            <div className="absolute bottom-[90px] w-auto max-w-[272px] left-[232px] right-0 p-3">
							{selectedImg && (
								<div className="border bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-between p-3">
									<div className="text-xs text-white">
										Attached image: {selectedImg}
									</div>
									<button onClick={handleRemoveFile} className="text-xs text-red-400">
										<MdCancel size={22} />
									</button>
								</div>
							)}
						</div>
            {/* Chatbox end */}

            <div
              id="message-container"
              className="flex justify-center items-center h-[92px] bg-white border-t"
            >
              <div id="send-container" className="flex flex-row justify-center pl-2">
                <div className='flex items-center'>
                  <input
                    placeholder='Send message'
                    id="message-input"
                    className=" bg-gray-800 rounded-l-[25px] h-[50px] w-[522px] text-start p-3 px-5 my-2 text-white"
                    value={currentMessage}
                    onChange={(event) => { setCurrentMessage(event.target.value); }}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        sendMessage();
                      }
                    }}
                  />
                  <label htmlFor="fileInput">
                    <div id='add_image' className='flex items-center justify-center text-white bg-gray-800 h-[50px] w-[56px] rounded-r-[25px]'>
                      <BiImageAdd size={'30px'} style={{ cursor: "pointer" }}/>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        id="fileInput"
                        style={{
                          display: "none",
                        }}
                      />
                    </div>
                  </label>
                </div>
                <button
                  id="send-button"
                  onClick={sendMessage}
                  className="flex items-center justify-center gap-1 w-[98px] h-[50px] rounded-full m-2 text-white bg-cyan-500 font-bold text-lg"
                >
                  Send
                  <PiPaperPlaneRightFill size={"22px"}/>
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