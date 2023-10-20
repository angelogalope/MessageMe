import React from 'react';

function BubbleMes({text}) {
    return(
        <div className='flex flex-row justify-end w-[342px]'>    
            <div className='flex flex-col p-5'>
                <p className='flex justify-end text-xl'>You</p>
                <div className='border rounded-b-2xl rounded-l-2xl text-lg bg-blue-500 text-white w-auto h-auto p-3'>
                    <p>{text}</p>
                </div>
            </div>
        </div>
    );
};

export default BubbleMes;