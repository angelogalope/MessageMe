import React from 'react';
import { HiOutlinePaperAirplane } from 'react-icons/hi2';
import { BiSolidMessageAltDots } from 'react-icons/bi';
import { Link } from 'react-router-dom';
 
function Chatroom() {
    return (
        <div className='flex justify-center p-5'>
            <div className="flex flex-col justify-start items-start gap-2">
                <div>  
                    <div className='flex items-center justify-between font-bold text-white w-[684px] p-3 rounded-t-md bg-gray-700'>
                        <div className='flex gap-1'>
                            <BiSolidMessageAltDots size={30} color='white'/>
                            <h1>MessageMe</h1>
                        </div>
                        <Link to="/" className='flex justify-center items-center rounded-md bg-red-700 w-24'>
                            <h1>
                                Leave
                            </h1>
                        </Link>
                    </div>
                    <div className='border border-gray-400 bg-gray-100 rounded-b-md w-[684px] h-[490px]'>
                    </div>
                </div>
                <div id='message-container' className='flex'>
                    <form id='send-container' className='flex flex-row'>
                    <input type='text' id='message-input' className='border border-gray-400 rounded-l-md w-[582px] text-start p-2'></input>
                    <button type='submit' id='send-button' className='flex items-center justify-center gap-1 w-[102px] rounded-r-md text-white bg-green-600'>Send<HiOutlinePaperAirplane/></button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Chatroom;
