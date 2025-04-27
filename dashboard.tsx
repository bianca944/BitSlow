// Dashboard page stub
import React, { useState, useEffect } from 'react';

const TransactionDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', minValue: 0, maxValue: 1000 });
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      const response = await fetch(`/api/transactions?page=${page}&filters=${JSON.stringify(filters)}`);
      const data = await response.json();
      setTransactions(data);
      setLoading(false);
    };

    fetchTransactions();
  }, [page, filters]);

  return (
    <div className="transaction-dashboard">
      <h2>Tranzacții</h2>
      <div className="filters">
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
        />
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        />
        <input
          type="number"
          value={filters.minValue}
          onChange={(e) => setFilters({ ...filters, minValue: parseInt(e.target.value) })}
          placeholder="Valoare minimă"
        />
        <input
          type="number"
          value={filters.maxValue}
          onChange={(e) => setFilters({ ...filters, maxValue: parseInt(e.target.value) })}
          placeholder="Valoare maximă"
        />
      </div>

      {loading ? (
        <div>Se încarcă...</div>
      ) : (
        <div className="transactions-list">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="transaction">
              <p>{transaction.date}</p>
              <p>{transaction.amount} BitSlow</p>
              <p>{transaction.buyer}</p>
              <p>{transaction.seller}</p>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Precedentă</button>
        <span>Pagina {page}</span>
        <button onClick={() => setPage(page + 1)}>Următoare</button>
      </div>
    </div>
  );
};

export default TransactionDashboard;
