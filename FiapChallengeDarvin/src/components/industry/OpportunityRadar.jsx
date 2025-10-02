// src/components/industry/OpportunityRadar.jsx

import React from 'react';

function OpportunityRadar({ insights }) {
  const icons = {
    alert: 'bi-exclamation-octagon-fill text-danger',
    growth: 'bi-graph-up-arrow text-success',
    mix: 'bi-lightbulb-fill text-info'
  };

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title mb-4"><i className="bi bi-broadcast me-2"></i>Radar de Oportunidades</h5>
        <ul className="list-group list-group-flush">
          {insights.map((insight, index) => (
            <li key={index} className="list-group-item d-flex align-items-center">
              <i className={`bi ${icons[insight.type]} fs-4 me-3`}></i>
              <span>{insight.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OpportunityRadar;