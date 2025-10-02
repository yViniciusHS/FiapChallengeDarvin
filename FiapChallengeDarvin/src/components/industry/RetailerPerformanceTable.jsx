// src/components/industry/RetailerPerformanceTable.jsx

import React from 'react';

// 1. O componente agora aceita a propriedade 'onRowClick'
function RetailerPerformanceTable({ data, onRowClick }) {
  return (
    <div className="card shadow-sm">
      <div className="card-header">
        <h5 className="card-title mb-0">Performance por Varejista</h5>
      </div>
      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th scope="col">Varejista</th>
              <th scope="col">Faturamento (Sell-Out)</th>
              <th scope="col">Unidades Vendidas</th>
              <th scope="col">Qualidade dos Dados</th>
            </tr>
          </thead>
          <tbody>
            {data.map(retailer => (
              // 2. Adicionamos o evento onClick e o estilo do cursor na linha da tabela (<tr>)
              <tr key={retailer.id} onClick={() => onRowClick(retailer)} style={{ cursor: 'pointer' }}>
                <td>{retailer.name}</td>
                <td>R$ {retailer.revenue.toFixed(2)}</td>
                <td>{retailer.unitsSold}</td>
                <td>
                  <div className="progress" style={{height: '20px'}}>
                    <div 
                      className="progress-bar" 
                      role="progressbar" 
                      style={{width: `${retailer.dataRating}%`}} 
                      aria-valuenow={retailer.dataRating} 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    >
                      {retailer.dataRating}%
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RetailerPerformanceTable;