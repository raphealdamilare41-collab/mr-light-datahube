import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const plans = [
    { name: 'MTN', price: '₦500', speed:'1.5GB' },
    { name: 'GLO', price: '₦800', speed:'3GB' },
    { name: 'Airtel', price: '₦1000', speed: '5GB' },
    { name: '9Mobile', price: '₦1200', speed: '10GB' },
  ];

  const features = [
    'Instant delivery',
    'Affordable rates',
    'Secure payment',
    '24/7 support',
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f5f7fb', minHeight: '100vh', color: '#222' }}>
      <div style={{ padding: '30px 20px 50px', background: 'linear-gradient(135deg, #111827, #1f3a8a)', color: '#fff' }}>
        <div style={{ textAlign: 'center' }}>
          <img src="/mr light logo.jpeg" alt="mr light logo" style={{ width: '20vw', maxWidth: '140px' }} />
          <h1 style={{ margin: '10px 0 6px', fontSize: '2rem' }}>Mr Light DataHub</h1>
          <p style={{ margin: '0 0 16px', fontSize: '1rem' }}>Fast internet data, airtime, and digital services at the best prices.</p>
          <Link to="/signup">
            <button style={{ padding: '12px 22px', borderRadius: '999px', backgroundColor: '#ffd700', color: '#111', border: 'none', fontWeight: '700', cursor: 'pointer' }}>
              Buy Data Now
            </button>
          </Link>
        </div>
      </div>

      <div style={{ padding: '24px 20px' }}>
        <h2 style={{ marginBottom: '12px' }}>Popular Data Plans</h2>
        <div style={{ display: 'grid', gap: '12px' }}>
          {plans.map((plan) => (
            <div key={plan.name} style={{ background: '#fff', borderRadius: '12px', padding: '14px 16px', boxShadow: '0 6px 18px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>{plan.name}</strong>
                <span style={{ color: '#2563eb', fontWeight: '700' }}>{plan.price}</span>
              </div>
              <p style={{ margin: '6px 0 0', color: '#666' }}>{plan.speed} data plan</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 20px 24px' }}>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '18px', boxShadow: '0 6px 18px rgba(0,0,0,0.08)' }}>
          <h3 style={{ marginTop: 0 }}>Why Choose Us?</h3>
          <div style={{ display: 'grid', gap: '8px' }}>
            {features.map((item) => (
              <div key={item} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>{item}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px 24px' }}>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '18px', boxShadow: '0 6px 18px rgba(0,0,0,0.08)' }}>
          <h3 style={{ marginTop: 0 }}>How It Works</h3>
          <p>1. Choose your network</p>
          <p>2. Select a data plan</p>
          <p>3. Make payment</p>
          <p>4. Receive data instantly</p>
        </div>
      </div>

      <div style={{ padding: '0 20px 30px' }}>
        <div style={{ background: '#111', color: '#fff', padding: '18px', borderRadius: '16px', textAlign: 'center' }}>
          <h3 style={{ marginTop: 0 }}>Need help?</h3>
          <p>WhatsApp: 080XXXXXXXX</p>
          <p>Email: support@mrlightdatahub.com</p>
        </div>
      </div>

      <div style={{ background: '#111', color: 'white', padding: '20px', textAlign: 'center' }}>
        <p>© 2026 Mr Light DataHub. All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Login;
