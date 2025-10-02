// src/components/retailer/TopProductsChart.jsx

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function TopProductsChart({ data }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title mb-4">Top 5 Produtos por Faturamento</h5>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            layout="vertical" // <-- Isso cria o gráfico de barras horizontal
            data={data}
            margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={120} />
            <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
            <Legend />
            <Bar dataKey="revenue" name="Faturamento" fill="#198754" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TopProductsChart;