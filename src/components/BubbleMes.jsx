import React from 'react';

function BubbleMes({ text, time, image }) {
  return (
    <div className='flex flex-row justify-end'>
      <div className='flex flex-col p-5'>
        <div className='flex justify-end'>
          <p className='text-xl'>You</p>
        </div>
        <div className='max-w-[342px] border rounded-b-2xl rounded-l-2xl text-lg bg-bluegreenMain text-white h-auto p-3 wrap' style={{ overflow: 'hidden', whiteSpace: 'normal', wordWrap: 'break-word' }}>
          <p>{text}</p>
          {image && <img src={image} alt="Sent Image" />}
        </div>
        <p className='text-sm flex justify-end'>Sent at {time}</p>
      </div>
    </div>
  );
}

export default BubbleMes;