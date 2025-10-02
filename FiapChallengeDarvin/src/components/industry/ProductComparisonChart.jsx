// src/components/industry/ProductComparisonChart.jsx

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ProductComparisonChart({ data }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title mb-4">Estoque vs. Vendas (Unidades)</h5>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="stock" name="Estoque Atual" fill="#6c757d" />
            <Bar dataKey="unitsSold" name="Unidades Vendidas" fill="#0d6efd" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ProductComparisonChart;