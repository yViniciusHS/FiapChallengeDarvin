// src/components/retailer/RatingBadge.jsx

import React from 'react';

function RatingBadge({ rating }) {
  const ratingStyles = {
    A: { class: 'bg-success', text: 'Excelente' },
    B: { class: 'bg-primary', text: 'Muito Bom' },
    C: { class: 'bg-info', text: 'Bom' },
    D: { class: 'bg-warning', text: 'Regular' },
    E: { class: 'bg-danger', text: 'Melhorar' },
  };

  const style = ratingStyles[rating] || { class: 'bg-secondary', text: 'N/A' };

  return (
    <span className={`badge ${style.class} fs-6`}>
      Rating {rating}
    </span>
  );
}

export default RatingBadge;