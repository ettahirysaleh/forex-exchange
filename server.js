require('dotenv').config();
const app = require('./app');
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend listening on ${PORT}`);
  fetchAndStorePrices();
  setInterval(fetchAndStorePrices, 60 * 1000);
});

async function fetchAndStorePrices() {
  try {
    const res = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: { ids: 'ripple,icon,eos,bitcoin,ethereum', vs_currencies: 'usd', include_24hr_change: 'true' }
    });

    const mapping = { ripple: 'XRP', icon: 'ICX', eos: 'EOS', bitcoin: 'BTC', ethereum: 'ETH' };
    const tasks = [];

    for (const id of Object.keys(mapping)) {
      const price = res.data[id]?.usd ?? 0;
      const change = res.data[id]?.usd_24h_change ?? 0;
      tasks.push(prisma.coinSnapshot.create({ data: { symbol: mapping[id], price: Number(price), changePct: Number(change) } }));
    }
    await Promise.all(tasks);
    console.log('Prices fetched and stored', new Date().toISOString());
  } catch (err) {
    console.error('Error fetching prices', err.message);
  }
}
