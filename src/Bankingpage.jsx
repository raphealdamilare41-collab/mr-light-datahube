import React, { useEffect, useState } from 'react';
import { FaBell, FaFolder, FaSyncAlt, FaUniversity } from 'react-icons/fa';

const OWNER_SHARE_RATE = 0.1;
const WALLET_KEY = 'mr_light_wallet_balance';
const OWNER_PROFIT_KEY = 'mr_light_owner_profit';

const getNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const Bankingpage = () => {
  const [amount, setAmount] = useState('5000');
  const [selectedBank, setSelectedBank] = useState('Access Bank');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [walletBalance, setWalletBalance] = useState(() => getNumber(localStorage.getItem(WALLET_KEY), 0));
  const [ownerShare, setOwnerShare] = useState(() => getNumber(localStorage.getItem(OWNER_PROFIT_KEY), 0));

  useEffect(() => {
    localStorage.setItem(WALLET_KEY, String(walletBalance));
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem(OWNER_PROFIT_KEY, String(ownerShare));
  }, [ownerShare]);

  const palette = {
    bg: 'linear-gradient(135deg, #f53e1d, #1a63c4,  #4ba70d)',
    panel: 'rgba(255, 255, 255, 0.95)',
    text: '#1e3a8a',
    muted: '#475569',
    balance: '#b45309',
    accent: '#2563eb',
  };

  const buttonStyle = {
    padding: '10px 14px',
    margin: '10px 5px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #f53e1d, #1a63c4,  #4ba70d)',
    border: '1px solid rgba(37, 99, 235, 0.2)',
    color: palette.panel,
    fontWeight: 700,
    boxShadow: '0 8px 20px rgba(37, 99, 235, 0.12)',
    cursor: 'pointer',
  };

  const bankingheaderStyle = {
    padding: '10px 14px',
    margin: '20px',
    borderRadius: '24px',
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
    color: palette.panel,
     background: 'linear-gradient(135deg, #f53e1d, #1a63c4,  #4ba70d)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)',
    cursor: 'pointer',
    width: '700px',
    justifyContent: 'center',
    alignContent: 'center'
  };


  const handleFundWallet = () => {
    const fundAmount = getNumber(amount, 0);

    if (fundAmount <= 0) {
      alert('Enter a valid amount to fund the wallet.');
      return;
    }

    if (!accountName.trim() || !accountNumber.trim()) {
      alert('Please enter your account name and account number.');
      return;
    }

    const nextBalance = walletBalance + fundAmount;
    const ownerProfit = ownerShare + fundAmount * OWNER_SHARE_RATE;

    setWalletBalance(nextBalance);
    setOwnerShare(ownerProfit);
    setAmount('5000');
    setAccountName('');
    setAccountNumber('');
    alert(`Wallet funded successfully via ${selectedBank}. Owner share added: ₦${ownerProfit.toFixed(2)}`);
  };

  return (
    <div className='bankingcontainer' style={{ minHeight: '100vh', background: palette.bg, padding: '1px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ color: palette.panel, justifyContent: 'space-between', font: 'caption' }}>
        <h1> Banking <FaUniversity size={30} color={palette.panel} /> </h1>
      </div>

      <div style={bankingheaderStyle}>
        <div className='header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}> Welcome, </h2>
          <FaBell style={{ color: palette.panel }} size={22} />
        </div>  

        <p style={{ color: palette.panel }}>Wallet Balance</p>
        <div style={{ color: palette.panel, fontWeight: 700, fontSize: '1.2rem' }}>
          ₦{walletBalance.toFixed(2)}
        </div>

        <div style={{ marginTop: '12px', color: palette.panel, fontWeight: 600 }}>
          Owner share: ₦{ownerShare.toFixed(2)}
        </div>

        <div style={{ marginTop: '16px' }}>
          {/* <label style={{ display: 'block', marginBottom: '6px', color: palette.muted }}>Select payment method</label>
          <select
            value={PaymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', marginBottom: '12px' }}
          >
            <option>Access Bank</option>
            <option>GTBank</option>
            <option>First Bank</option>
            <option>Zenith Bank</option>
            <option>UBA</option>
            <option>Ecobank</option>
            <option>Fidelity Bank</option>
            <option>Union Bank</option>
            <option>Polaris Bank</option>
            <option>Opay</option>
            <option>Paystack</option>
            <option>Card Payment</option>
            <option>Flutterwave</option>
          </select> */}

          <label style={{ display: 'block', marginBottom: '6px', color: palette.panel }}> Account name </label>
          <input
            type='text'
            value={accountName}
            onChange={(event) => setAccountName(event.target.value)}
            placeholder='Enter account name'
            style={{ width: '50%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', marginBottom: '12px' }}
          />

          <label style={{ display: 'block', marginBottom: '6px', color: palette.panel }}>Account number</label>
          <input
            type='number'
            value={accountNumber}
            onChange={(event) => setAccountNumber(event.target.value)}
            placeholder='Enter account number'
            style={{ width: '50%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', marginBottom: '12px' }}
          />

          <label style={{ display: 'block', marginBottom: '6px', color: palette.panel }}>Amount</label>
          <input
            type='number'
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder='Enter amount'
            style={{ width: '50%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
          />
        </div>

      </div>

      <button onClick={handleFundWallet} style={buttonStyle}>Fund Wallet<br />
        <FaFolder size={19} />
      </button>
      <button style={buttonStyle}>
        Transaction <br />
        <FaSyncAlt size={19} />
      </button>

      <div>
        <span style={{ color: palette.muted }}>services</span>
      </div>
    </div>
  );
};

export default Bankingpage;