import React from 'react'

function Error({ message }) {
    return (
        <div>
            <p className='error'>{message}</p>;
        </div>
    )
}

export default Error