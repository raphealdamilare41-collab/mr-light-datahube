import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const OWNER_SHARE_RATE = 0.1;
const WALLET_KEY = 'mr_light_wallet_balance';
const OWNER_PROFIT_KEY = 'mr_light_owner_profit';

const getNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const Datapage = () => {
  const [network, setNetwork] = useState('mtn');
  const [amount, setAmount] = useState('65');
  const quickAmounts = [100, 200, 500, 1000, 2000, 5000, 10000];
  const [plans, setPlans] = useState([]);
  const [plansError, setPlansError] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    setPlansError('');
    fetch(`http://localhost:5000/api/data-plans/${network}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        return res.json();
      })
      .then((data) => setPlans(data))
      .catch(() => {
        setPlans([]);
        setPlansError('Unable to connect to the data service. Start the backend on port 5000.');
      });
  }, [network]);

  const buyData = async (planId, price) => {
    const dataAmount = Number(price);
    const currentWallet = getNumber(localStorage.getItem(WALLET_KEY), 0);

    if (currentWallet < dataAmount) {
      alert('Insufficient wallet balance. Please fund your wallet first.');
      return;
    }

    const remainingWallet = currentWallet - dataAmount;
    const ownerShare = getNumber(localStorage.getItem(OWNER_PROFIT_KEY), 0) + dataAmount * OWNER_SHARE_RATE;

    localStorage.setItem(WALLET_KEY, String(remainingWallet));
    localStorage.setItem(OWNER_PROFIT_KEY, String(ownerShare));

    alert(`Data purchase successful. Owner share earned: ₦${(dataAmount * OWNER_SHARE_RATE).toFixed(2)}`);
  };

  const handleAddAmount = (value) => {
    setAmount((prev) => String(Number(prev || 0) + value));
  };

  const handlePay = async () => {
    const dataAmount = Number(amount);

    if (Number(amount) < 50 || Number(amount) > 150000) {
      alert('Amount must be between ₦50 and ₦150,000');
      return;
    }

    const currentWallet = getNumber(localStorage.getItem(WALLET_KEY), 0);

    if (currentWallet < dataAmount) {
      alert('Insufficient wallet balance. Please fund your wallet first.');
      return;
    }

    const remainingWallet = currentWallet - dataAmount;
    const ownerShare = getNumber(localStorage.getItem(OWNER_PROFIT_KEY), 0) + dataAmount * OWNER_SHARE_RATE;

    localStorage.setItem(WALLET_KEY, String(remainingWallet));
    localStorage.setItem(OWNER_PROFIT_KEY, String(ownerShare));

    alert(`Data purchase successful. Owner share earned: ₦${(dataAmount * OWNER_SHARE_RATE).toFixed(2)}`);
  };

  return (
    <div>
      <h2>Buy Data</h2>
      <main style={{ backgroundColor: '#000', minHeight: '100vh', color: 'white', padding: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>Buy Data</h1>

        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <div style={{ flex: 1, textAlign: 'center', borderBottom: '2px solid #2563eb', padding: '10px' }}>Buy For Self</div>
          <div style={{ flex: 1, textAlign: 'center', padding: '10px', color: 'gray' }}>Buy For Others</div>
        </div>

        <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', marginBottom: '8px' }}>Phone number</div>

          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
              boxSizing: 'border-box'
            }}
          />

          <select value={network} onChange={(e) => setNetwork(e.target.value)} style={{ marginTop: '12px', width: '100%', padding: '10px' }}>
            <option value="mtn">MTN</option>
            <option value="glo">GLO</option>
            <option value="airtel">AIRTEL</option>
            <option value="9mobile">9MOBILE</option>
          </select>
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
              outline: 'none'
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
                whiteSpace: 'nowrap'
              }}
            >
              +₦{value}
            </button>
          ))}
        </div>

        <p style={{ marginTop: '20px' }}> <a href="">Pay With Vouche</a> <span style={{ color: 'yellow' }}>want to pay with vou</span></p>

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
            borderRadius: '12px'
          }}
        >
          Proceed
        </button>

        <button> <Link to="/main">Back to Main Page</Link></button>
      </main>

      {plansError && <p style={{ color: 'crimson' }}>{plansError}</p>}

      {plans.map((plan) => (
        <div key={plan.id} onClick={() => buyData(plan.id, plan.price)}>
          <p>{plan.name} - ₦{plan.price}</p>
          <button>Buy Now</button>
        </div>
      ))}
    </div>
  );
};

export default Datapage;