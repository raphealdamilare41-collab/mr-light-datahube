import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OWNER_SHARE_RATE = 0.1;
const WALLET_KEY = 'mr_light_wallet_balance';
const OWNER_PROFIT_KEY = 'mr_light_owner_profit';

const getNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const Airtimepage = () => {
  const [amount, setAmount] = useState('65');
  const [phoneNumber, setPhoneNumber] = useState('');

  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  const handleAddAmount = (value) => {
    setAmount((prev) => String(Number(prev || 0) + value));
  };

  const handlePay = async () => {
    const airtimeAmount = Number(amount);

    if (airtimeAmount < 50 || airtimeAmount > 150000) {
      alert('Amount must be between ₦50 and ₦150,000');
      return;
    }

    const currentWallet = getNumber(localStorage.getItem(WALLET_KEY), 0);

    if (currentWallet < airtimeAmount) {
      alert('Insufficient wallet balance. Please fund your wallet first.');
      return;
    }

    const remainingWallet = currentWallet - airtimeAmount;
    const ownerShare = getNumber(localStorage.getItem(OWNER_PROFIT_KEY), 0) + airtimeAmount * OWNER_SHARE_RATE;

    localStorage.setItem(WALLET_KEY, String(remainingWallet));
    localStorage.setItem(OWNER_PROFIT_KEY, String(ownerShare));

    alert(`Airtime purchase successful. Owner share earned: ₦${(airtimeAmount * OWNER_SHARE_RATE).toFixed(2)}`);
  };

  return (
    <main style={{ backgroundColor: '#000', minHeight: '100vh', color: 'white', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Buy Airtime</h1>

      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <div style={{ flex: 1, textAlign: 'center', borderBottom: '2px solid #2563eb', padding: '10px' }}>Buy For Self</div>
        <div style={{ flex: 1, textAlign: 'center', padding: '10px', color: 'gray' }}>Buy For Others</div>
      </div>

      <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
        <div style={{ fontSize: '14px', marginBottom: '8px' }}>Phone number</div>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
          style={{
            width: '100%',
            height: '50px',
            backgroundColor: '#fff',
            color: '#111827',
            fontSize: '18px',
            border: '1px solid #dbeafe',
            borderRadius: '10px',
            padding: '0 12px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '10px' }}>
          <span>Enter amount:</span>
          <span>Min : ₦50 | Max : ₦150,000</span>
        </div>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            width: '100%',
            height: '60px',
            backgroundColor: 'transparent',
            color: 'white',
            fontSize: '28px',
            border: 'none',
            outline: 'none',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '15px', overflowX: 'auto' }}>
        {quickAmounts.map((value) => (
          <button
            key={value}
            onClick={() => handleAddAmount(value)}
            style={{
              padding: '10px 15px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: '1px solid #1d4ed8',
              borderRadius: '20px',
              whiteSpace: 'nowrap',
            }}
          >
            +₦{value}
          </button>
        ))}
      </div>

      <p style={{ marginTop: '20px' }}>
        <a href="" style={{ color: '#60a5fa' }}>Pay With Voucher</a>
        <span style={{ color: '#f8d76a', marginLeft: '8px' }}>want to pay with voucher</span>
      </p>

      <button
        onClick={handlePay}
        style={{
          marginTop: '30px',
          width: '100%',
          height: '55px',
          backgroundColor: '#2563eb',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '18px',
          border: 'none',
          borderRadius: '12px',
        }}
      >
        Proceed
      </button>

      <button style={{ width: '100%', marginTop: '14px' }}>
        <Link to="/main" style={{ textDecoration: 'none', color: '#111827' }}>Back to Main Page</Link>
      </button>
    </main>
  );
};

export default Airtimepage;