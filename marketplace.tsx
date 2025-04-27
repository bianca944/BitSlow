// Marketplace page stub
import React, { useState, useEffect } from 'react';

const BitSlowMarketplace = () => {
  const [bitSlows, setBitSlows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBitSlows = async () => {
      setLoading(true);
      const response = await fetch('/api/bitSlows');
      const data = await response.json();
      setBitSlows(data);
      setLoading(false);
    };

    fetchBitSlows();
  }, []);

  const handleBuy = async (coinId: string) => {
    const response = await fetch(`/api/buy/${coinId}`, { method: 'POST' });
    const data = await response.json();
    if (data.success) {
      alert('Monedă cumpărată!');
      setBitSlows(bitSlows.filter((coin) => coin.id !== coinId)); // Remove bought coin
    } else {
      alert('Eroare la cumpărare');
    }
  };

  return (
    <div className="bit-slow-marketplace">
      <h2>Piața BitSlow</h2>

      {loading ? (
        <div>Se încarcă...</div>
      ) : (
        <div className="bit-slow-list">
          {bitSlows.map((coin) => (
            <div key={coin.id} className="bit-slow">
              <p>ID: {coin.hash}</p>
              <p>Valoare: {coin.value}</p>
              <p>Pro
