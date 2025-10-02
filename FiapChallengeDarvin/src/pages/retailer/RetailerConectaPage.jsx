// src/pages/retailer/RetailerConectaPage.jsx

import React from 'react';
import { useData } from '../../contexts/dataHooks';
import PageHeader from '../../components/common/PageHeader';

export default function RetailerConectaPage() { 
  const { sales, campaigns } = useData();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  if (!loggedInUser) {
    return <div>Carregando...</div>;
  }

  const retailerSales = sales.filter(s => s.retailerId === loggedInUser.id);

  return (
    <div>
      <PageHeader title="Darvin Conecta" subtitle="Participe das campanhas das indústrias e ganhe bônus!" />
      <div className="row">
        {campaigns.map(campaign => {
          const progress = retailerSales.reduce((total, sale) => {
            const item = sale.items.find(i => i.productId === campaign.productId);
            return total + (item ? item.quantity : 0);
          }, 0);
          
          const progressPercentage = Math.min((progress / campaign.targetQuantity) * 100, 100);
          const isCompleted = progress >= campaign.targetQuantity;

          return (
            <div className="col-md-6 mb-4" key={campaign.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{campaign.title}</h5>
                  <p className="card-text text-muted">{campaign.description}</p>
                  
                  <div className="d-flex justify-content-between">
                    <span>Progresso</span>
                    <span>{progress} / {campaign.targetQuantity} un.</span>
                  </div>
                  <div className="progress mb-3" style={{height: '25px'}}>
                    <div 
                      className={`progress-bar ${isCompleted ? 'bg-success progress-bar-striped progress-bar-animated' : ''}`}
                      role="progressbar" 
                      style={{ width: `${progressPercentage}%` }} 
                      aria-valuenow={progressPercentage} 
                    >
                      {progressPercentage.toFixed(0)}%
                    </div>
                  </div>
                  {isCompleted && <p className="text-success fw-bold"><i className="bi bi-check-circle-fill me-2"></i>Parabéns, você completou este programa!</p>}
                </div>
                <div className="card-footer">
                  <strong>Recompensa:</strong> 
                  {/* CORREÇÃO AQUI: Usamos parseFloat para garantir que o valor é um número */}
                  R$ {parseFloat(campaign.bonus || 0).toFixed(2)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}