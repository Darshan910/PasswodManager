import React from 'react'

const Button = (props) => {
    return (
        <div >
            {/* <button className="text-black text-xs bg-cyan-500 my-5 rounded-3xl flex items-center ring-white ring-2"> */}
            <button className="text-black bg-cyan-500 rounded-3xl flex items-center ring-white ring-2 w-full">
                <span className='font-bold px-5 py-1'>{props.name}</span>
            </button>
        </div>
    )
}

export default Button
