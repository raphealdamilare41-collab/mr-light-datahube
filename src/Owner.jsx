import { useEffect, useState } from 'react';

const OWNER_PROFIT_KEY = 'mr_light_owner_profit';

function Owner() {
  const [summary, setSummary] = useState({ profit: 0, successfulSales: 0, availableForPayout: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    const storedProfit = Number(localStorage.getItem(OWNER_PROFIT_KEY) || 0);
    setSummary({
      profit: storedProfit,
      successfulSales: Math.max(0, Math.floor(storedProfit / 50)),
      availableForPayout: storedProfit,
    });

    fetch('http://localhost:5174/api/owner')
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load owner summary');
        return response.json();
      })
      .then((data) => {
        const ownerProfit = Number(data.profit || localStorage.getItem(OWNER_PROFIT_KEY) || 0);
        setSummary({
          profit: ownerProfit,
          successfulSales: Number(data.successfulSales || 0),
          availableForPayout: ownerProfit,
        });
      })
      .catch(() => {
        setError('Backend not running, but the owner share is still tracking locally.');
      });
  }, []);

  return (
    <main style={{ minHeight: '100vh', padding: '2rem', background: '#0f172a', color: 'white' }}>
      <h1>Owner dashboard</h1>
      {error && <p>{error}</p>}
      <section>
        <p>Recorded profit: ₦{Number(summary.profit || 0).toFixed(2)}</p>
        <p>Successful sales: {summary.successfulSales || 0}</p>
        <p>Available for payout: ₦{Number(summary.availableForPayout || 0).toFixed(2)}</p>
      </section>
    </main>
  );
}

export default Owner;
 