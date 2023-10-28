import React from "react";

function OnUser({ username }) {
    return (     
        <div>
            <div class="flex gap-2">
                <div className=" bg-blue-500 rounded-full w-[42px] h-[42px] my-5 ml-8"></div>
                <h1 className="col-span-2 mt-7  text-md text-white">
                    {username}
                </h1>
            </div>
        </div>
    )
}

export default OnUser;