// src/components/retailer/QuickInsights.jsx

import React from 'react';

function QuickInsights({ bestSeller, lowStockProduct }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title mb-4">Insights Rápidos</h5>
        <ul className="list-unstyled">
          {bestSeller && (
            <li className="d-flex align-items-start mb-3">
              <i className="bi bi-trophy-fill text-warning fs-4 me-3"></i>
              <div>
                <strong>Campeão de Vendas:</strong>
                <p className="mb-0 text-muted">{bestSeller.name} gerou R$ {bestSeller.revenue.toFixed(2)}.</p>
              </div>
            </li>
          )}
          {lowStockProduct && (
            <li className="d-flex align-items-start">
              <i className="bi bi-exclamation-triangle-fill text-danger fs-4 me-3"></i>
              <div>
                <strong>Atenção ao Estoque:</strong>
                <p className="mb-0 text-muted">{lowStockProduct.name} tem apenas {lowStockProduct.stock} unidades restantes.</p>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default QuickInsights;