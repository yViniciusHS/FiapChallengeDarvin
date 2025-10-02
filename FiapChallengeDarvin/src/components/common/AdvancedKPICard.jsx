// src/components/common/AdvancedKPICard.jsx

import React from 'react';

function AdvancedKPICard({ title, value, icon, trendValue, trendDirection }) {
  const trendColor = trendDirection === 'up' ? 'text-success' : 'text-danger';
  const trendIcon = trendDirection === 'up' ? 'bi-arrow-up' : 'bi-arrow-down';

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h6 className="card-subtitle text-muted mb-2">{title}</h6>
            <h3 className="card-title">{value}</h3>
          </div>
          <div className={`fs-2 text-primary`}>
            <i className={`bi ${icon}`}></i>
          </div>
        </div>
        {trendValue && (
          <div className={`d-flex align-items-center mt-2 ${trendColor}`}>
            <i className={`bi ${trendIcon} me-1`}></i>
            <small>{trendValue}</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdvancedKPICard;