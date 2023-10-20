import React from 'react';

function BubbleRes({text}) {
    return(
        <div className='flex flex-row justify-start w-[342px]'>    
            <div className='flex flex-col p-5'>
            <p className='flex justify-start text-xl'>Abc</p>
                <div className='border rounded-b-2xl rounded-r-2xl text-lg bg-gray-400 text-white w-auto h-auto p-3'>
                    <p>{text}</p>
                </div>
            </div>
        </div>
    );
};

export default BubbleRes;