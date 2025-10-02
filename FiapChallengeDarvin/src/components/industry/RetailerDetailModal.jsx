// src/components/industry/RetailerDetailModal.jsx

import React from 'react';
import { Modal } from 'react-bootstrap';
import { useData } from '../../contexts/dataHooks';

function RetailerDetailModal({ retailer, handleClose }) {
  // CORREÇÃO: Removemos 'products' que não estava sendo usado.
  const { sales } = useData();

  if (!retailer) return null;

  const retailerSales = sales.filter(s => s.retailerId === retailer.id);
  const totalRevenue = retailerSales.reduce((acc, sale) => acc + sale.totalAmount, 0);
  const totalUnits = retailerSales.reduce((total, sale) => total + sale.items.reduce((itemTotal, item) => itemTotal + item.quantity, 0), 0);
  
  const opportunity = "Potencial de expansão na categoria 'Doces', que representa apenas 5% das vendas.";

  return (
    <Modal show={!!retailer} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Detalhes de Performance: {retailer.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>KPIs Principais</h5>
        <ul>
          <li><strong>Faturamento Total (Sell-Out):</strong> R$ {totalRevenue.toFixed(2)}</li>
          <li><strong>Total de Unidades Vendidas:</strong> {totalUnits}</li>
        </ul>
        <hr />
        <h5>Radar de Oportunidades</h5>
        <p><i className="bi bi-search me-2"></i>{opportunity}</p>
      </Modal.Body>
    </Modal>
  );
}

export default RetailerDetailModal;