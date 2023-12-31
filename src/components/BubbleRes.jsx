import React from 'react';

function BubbleRes({ text, username, time, image }) {
  return (
    <div className='flex flex-row justify-start w-[342px]'>
      <div className='flex flex-col p-5'>
        <div className='flex justify-start'>
          <p className='text-xl'>{username}</p>
        </div>
        <div className='max-w-[342px] border rounded-b-2xl rounded-r-2xl text-lg bg-gray-400 text-white h-auto p-3' style={{ overflow: 'hidden', whiteSpace: 'normal', wordWrap: 'break-word' }}>
          <p>{text}</p>
          {image && <img src={image} alt="Received Image" />}
        </div>
        <p className='text-sm flex justify-start'>Seen at {time}</p>
      </div>
    </div>
  );
}

export default BubbleRes;