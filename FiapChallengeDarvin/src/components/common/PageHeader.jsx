// src/components/common/PageHeader.jsx

import React from 'react';

function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h1 className="h2">{title}</h1>
      {subtitle && <p className="text-muted">{subtitle}</p>}
      <hr />
    </div>
  );
}

export default PageHeader;