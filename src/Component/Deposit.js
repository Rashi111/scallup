// Deposit.js
import React, { useState } from 'react';

const Deposit = ({ depositHandler }) => {
    const [notes, setNotes] = useState({ '100': 0, '500': 0, '1000': 0, '2000': 0 });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNotes({ ...notes, [name]: parseInt(value) });
    };

    const calculateTotal = () => {
        return Object.keys(notes).reduce((acc, denomination) => {
            return acc + (parseInt(denomination) * notes[denomination]);
        }, 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const totalAmount = calculateTotal();
        depositHandler(totalAmount);
        setNotes({ '100': 0, '500': 0, '1000': 0, '2000': 0 });
    };

    return (
        <div>
            <h2>Deposit Money</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="100">Rs. 100 Notes:</label>
                    <input type="number" name="100" value={notes['100']} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="500">Rs. 500 Notes:</label>
                    <input type="number" name="500" value={notes['500']} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="1000">Rs. 1000 Notes:</label>
                    <input type="number" name="1000" value={notes['1000']} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="2000">Rs. 2000 Notes:</label>
                    <input type="number" name="2000" value={notes['2000']} onChange={handleChange} />
                </div>
                <p>Total Amount: {calculateTotal()}</p>
                <button type="submit">Deposit</button>
            </form>
        </div>
    );
};

export default Deposit;
