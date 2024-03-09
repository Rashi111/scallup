import './App.css';
import React, { useState, useEffect } from 'react';
import Balance from './Component/Balance';
import Deposit from './Component/Deposit';
import Withdrawal from './Component/Withdrawal';
import Error from './Component/Error';


function App() {
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load balance from local storage
    const savedBalance = localStorage.getItem('balance');
    if (savedBalance) {
      setBalance(parseInt(savedBalance));
    }
  }, []);
  const depositHandler = (amount) => {
    setBalance(balance + amount);
    localStorage.setItem('balance', balance + amount);
  };
  const withdrawHandler = (amount) => {
    if (balance >= amount) {
      setBalance(balance - amount);
      localStorage.setItem('balance', balance - amount);
    } else {
      setError('Insufficient balance');
    }
  };

  return (
    <div className="App">
      <Balance balance={balance} />
      <div className='atm_box'>
        <div className='deposit_box'>
          <Deposit depositHandler={depositHandler} />
        </div>
        <div className='withdraw_box'>
          <Withdrawal withdrawHandler={withdrawHandler} balance={balance} />
        </div>
        {error &&
          <Error message={error} />

        }
      </div>
    </div>
  );
}

export default App;
