import React, { useState } from 'react';

const Withdraw = ({ balance, withdrawHandler }) => {
    const [amount, setAmount] = useState('');
    const [notes, setNotes] = useState({ '2000': 0, '1000': 0, '500': 0, '100': 0 });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { value } = e.target;
        setAmount(value);
    };

    const handleNoteChange = (denomination, value) => {
        const newNotes = { ...notes };
        newNotes[denomination] = parseInt(value, 10) || 0;
        setNotes(newNotes);
    };

    const handleWithdraw = () => {
        const withdrawalAmount = parseInt(amount);
        if (withdrawalAmount > balance) {
            setError('Insufficient balance');
            return;
        }
        if (withdrawalAmount % 100 !== 0) {
            setError('Amount must be in multiples of 100');
            return;
        }
        setError('');

        let totalWithdrawnAmount = 0;
        const newNotes = { ...notes };

        const denominations = Object.keys(newNotes).sort((a, b) => b - a);

        for (let denomination of denominations) {
            const noteCount = newNotes[denomination];
            const withdrawnAmount = parseInt(denomination) * noteCount;
            if (withdrawnAmount > 0) {
                totalWithdrawnAmount += withdrawnAmount;
                newNotes[denomination] = 0;
            }
            if (totalWithdrawnAmount >= withdrawalAmount) {
                break;
            }
        }

        if (totalWithdrawnAmount < withdrawalAmount) {
            setError('Unable to dispense requested amount');
            return;
        }

        withdrawHandler(withdrawalAmount);
    };


    return (
        <div>
            <h2>Withdraw Money</h2>
            <div>
                <h3>Select Number of Notes to Withdraw:</h3>
                <ul>
                    {Object.entries(notes).map(([denomination, count]) => (
                        <li key={denomination}>
                            <span>{`Rs. ${denomination}: `}</span>
                            <input
                                type="number"
                                value={count}
                                onChange={(e) => handleNoteChange(denomination, e.target.value)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            {error && <p className='error'>{error}</p>}

            <input type="number" value={amount} onChange={handleChange} placeholder="Enter amount" />
            <button onClick={handleWithdraw}>Withdraw</button>


        </div>
    );
};

export default Withdraw;
