import React from 'react'
import { useState, useEffect } from 'react';

function Balance({ balance }) {
    return (
        <div>
            <div>
                <h2>Account Balance: Rs. {balance}</h2>
            </div>
        </div>
    )
}

export default Balance