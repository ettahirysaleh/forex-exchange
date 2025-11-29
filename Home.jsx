import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home(){
  const [coins,setCoins] = useState([]);
  useEffect(()=>{
    async function f(){
      try {
        const res = await axios.get((import.meta.env.VITE_API_URL || 'http://localhost:4000') + '/api/coins/latest');
        setCoins(res.data);
      } catch (e){ console.error(e); }
    }
    f();
    const id = setInterval(f, 60*1000);
    return ()=> clearInterval(id);
  },[]);

  return (
    <div className="min-h-screen p-4 bg-white">
      <header className="text-center py-4 border-b">
        <h1 className="text-2xl font-bold text-blue-600">CryptoExchange</h1>
      </header>

      <section className="mt-4">
        <h2 className="text-xl text-blue-600">Buy coins</h2>
        <div className="grid grid-cols-4 gap-3 mt-3">
          {['OKX','Binance','Coinbase','Bitget'].map(x=> <div key={x} className="bg-gray-100 p-3 rounded text-center">{x}</div>)}
        </div>
        <p className="mt-3 bg-blue-50 p-2 border-l-4 border-blue-500">🎁 Register now to receive a 1,000 USDT welcome gift package!</p>
      </section>

      <section className="mt-6">
        <h3 className="font-semibold">Popular list</h3>
        <div className="mt-3">
          {coins.map(c=> (
            <div key={c.symbol} className="flex justify-between items-center py-3 border-b">
              <div className="font-medium">{c.symbol}/USDT</div>
              <div>{Number(c.price).toFixed(6)}</div>
              <div className={`px-2 py-1 rounded ${c.changePct>=0? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {(c.changePct>=0?'+':'') + Number(c.changePct).toFixed(2) + '%'}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
