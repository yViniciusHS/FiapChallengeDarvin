// src/components/retailer/SalesChart.jsx

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function SalesChart({ data }) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-4">Vendas por Produto (R$)</h5>
        {/* ResponsiveContainer faz o gráfico se adaptar ao tamanho do card */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
            <Legend />
            <Bar dataKey="totalVendido" fill="#0d6efd" name="Total Vendido" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SalesChart;