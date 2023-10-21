import React from 'react';

function Joined({ user }) {
    return (
        <div className='flex flex-row justify-center'>
            <p>{user} has joined the chat</p>
        </div>
    );
}

export default Joined;
