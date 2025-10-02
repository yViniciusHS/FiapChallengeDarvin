// src/components/industry/CategoryPieChart.jsx

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Cores para as fatias do gráfico
const COLORS = ['#0d6efd', '#6c757d', '#198754', '#ffc107', '#dc3545'];

function CategoryPieChart({ data }) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-4">Faturamento por Categoria</h5>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="revenue"
              nameKey="category"
              label={(entry) => `${((entry.percent || 0) * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CategoryPieChart;