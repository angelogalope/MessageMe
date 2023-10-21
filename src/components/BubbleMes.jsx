import React from 'react';

function BubbleMes({ text, time }) {
    return (
        <div className='flex flex-row justify-end'>
            <div className='flex flex-col p-5'>
                <div className='flex justify-end'>
                    <p className='text-xl'>You</p>
                </div>
                <div className='max-w-[342px] border rounded-b-2xl rounded-l-2xl text-lg bg-blue-500 text-white w-auto h-auto p-3'>
                    <p>{text}</p>
                </div>
                <p className='text-sm flex justify-end'>{time}</p>
            </div>
        </div>
    );
}

export default BubbleMes;
