// src/components/retailer/SalesTrendChart.jsx

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function SalesTrendChart({ data }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title mb-4">Tendência de Faturamento (por dia)</h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
            <Legend />
            <Line type="monotone" dataKey="revenue" name="Faturamento" stroke="#0d6efd" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SalesTrendChart;