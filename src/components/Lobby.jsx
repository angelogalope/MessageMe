import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { BiSolidMessageAltDots } from 'react-icons/bi';

function Lobby() {
  return (
    <div className='flex justify-center p-5'>
      <div className="flex flex-col justify-start items-start gap-2">
        <div className='flex flex-col'>  
          <div className='flex items-center gap-1 font-bold text-white w-[684px] p-3 rounded-t-md bg-gray-700'>
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
              <form>
                <h1>Username</h1>
                <div className='flex gap-2'>
                  <input type='text' id='user-input' className='w-[232px] border border-gray-400 rounded-md p-1'></input>
                  <Link to="/chatroom"> {/* Use Link to navigate to the chatroom */}
                    <button className='border rounded-md text-white bg-green-700 w-[102px]'>
                      Join
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lobby;
