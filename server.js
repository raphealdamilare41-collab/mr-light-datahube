const axios = require('axios');
require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5174;

// 1. CONNECT TO MONGODB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

// 2. CREATE SCHEMAS
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  walletBalance: { type: Number, default: 1000 }
});
const User = mongoose.model('User', userSchema);

const plans = {
  MTN_1GB: { network: 'mtn', size: '1GB', wholesaleCost: 220, retailPrice: 250 },
};

const ownerLedger = {
  profit: 0,
  successfulSales: 0,
};

// 3. HELPER FUNCTIONS
function sendJson(response, status, body) {
  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  response.end(JSON.stringify(body));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => { body += chunk; });
    request.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error('Invalid JSON body'));
      }
    });
    request.on('error', reject);
  });
}

async function deliverData(plan, phoneNumber) {
  const providerUrl = process.env.VTPASS_VENDOR_API_URL;
  const providerKey = process.env.VTPASS_SECRET_KEY;

  if (!providerUrl || !providerKey) {
    console.error("VTPass keys missing in .env");
    return false;
  }

  const providerResponse = await fetch(providerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${providerKey}',
    },
    body: JSON.stringify({
      network: plan.network,
      plan: plan.size,
      phone: phoneNumber,
    }),
  });

  const providerResult = await providerResponse.json();
  if (providerResult.status !== 'success') return false;

  return providerResult;
}

// 4. SERVER
const server = http.createServer(async (request, response) => {
  // Handle CORS
  if (request.method === 'OPTIONS') {
    response.writeHead(200, {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return response.end();
  }

  // GET OWNER PROFIT
  if (request.method === 'GET' && request.url === '/api/owner') {
    return sendJson(response, 200, ownerLedger);
  }

  // FUND WALLET
  if (request.method === 'POST' && request.url === '/api/pay') {
    const { userId = 'user_01', amount } = await readBody(request);
    const numericAmount = Number(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      return sendJson(response, 400, { error: 'Amount must be positive' });
    }

    let user = await User.findById(userId);
    if (!user) {
      // create user if doesn't exist
      user = await User.create({ _id: userId, name: 'John Doe', walletBalance: 0 });
    }

    user.walletBalance += numericAmount;
    await user.save();

    return sendJson(response, 200, {
      message: 'Wallet funded successfully',
      newBalance: user.walletBalance,
    });
  }

  // BUY DATA
  if (request.method === 'POST' && request.url === '/api/buy-data') {
    try {
      const { userId = 'user_01', planId, phoneNumber } = await readBody(request);

      const user = await User.findById(userId);
      if (!user) return sendJson(response, 404, { error: 'User not found' });

      const plan = plans[planId];
      if (!plan) return sendJson(response, 400, { error: 'Invalid data plan' });

      if (!phoneNumber) return sendJson(response, 400, { error: 'Phone number required' });

      if (user.walletBalance < plan.retailPrice) {
        return sendJson(response, 400, { error: 'Insufficient wallet balance' });
      }

      const providerSucceeded = await deliverData(plan, phoneNumber);

      if (providerSucceeded) {
        user.walletBalance -= plan.retailPrice;
        await user.save();

        ownerLedger.profit += (plan.retailPrice - plan.wholesaleCost);
        ownerLedger.successfulSales += 1;

        return sendJson(response, 200, {
          message: 'Data delivered successfully',
          remainingBalance: user.walletBalance,
        });
      } else {
        return sendJson(response, 500, { error: 'Provider delivery failed' });
      }
    } catch (error) {
      return sendJson(response, 500, { error: error.message });
    }
  }

  return sendJson(response, 404, { error: 'Route not found' });
});


const PAYSTACK_SECRET_KEY = "sk_test_your_key_here";

app.post('/api/fund-wallet', async (req, res) => {
  try {
    const { email, amount, paymentMethod } = req.body;

    if(!email || !amount) {
      return res.status(400).json({ message: "Email and Amount are required" })
    }

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email: email,
        amount: amount * 100, 
        callback_url: 'http://localhost:5174/payment-success',
      },
      {
        headers: { 
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ 
      success: true, 
      url: response.data.authorization_url
    });

  } catch (error) {
    console.log(error.response?.data);
    res.status(500).json({ message: "Could not initialize payment" });
  }
});

app.get('/payment-success', (req, res) => {
  res.send("Payment successful! Reference: " + req.query.reference);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});