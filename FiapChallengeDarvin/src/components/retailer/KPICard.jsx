// src/components/retailer/KPICard.jsx

import React from 'react';

function KPICard({ title, value, description }) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title text-muted">{title}</h5>
        <h2 className="card-text">{value}</h2>
        <p className="card-text"><small className="text-muted">{description}</small></p>
      </div>
    </div>
  );
}

export default KPICard;