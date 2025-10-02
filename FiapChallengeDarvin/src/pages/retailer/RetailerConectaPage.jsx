// src/pages/retailer/ProgramsPage.jsx

import React from 'react';
import { useData } from '../../contexts/dataHooks';
import PageHeader from '../../components/common/PageHeader';

export default function ProgramsPage() {
  const { sales, campaigns } = useData();

  return (
    <div>
      <PageHeader title="Programas e Incentivos" subtitle="Participe das campanhas das indústrias e ganhe bônus!" />
      <div className="row">
        {campaigns.map(campaign => {
          // --- A LÓGICA PRINCIPAL ACONTECE AQUI ---
          // Calcula o progresso do varejista para esta campanha
          const progress = sales.reduce((total, sale) => {
            const item = sale.items.find(i => i.productId === campaign.productId);
            return total + (item ? item.quantity : 0);
          }, 0);
          
          const progressPercentage = Math.min((progress / campaign.targetQuantity) * 100, 100);
          const isCompleted = progress >= campaign.targetQuantity;

          return (
            <div className="col-md-6 mb-4" key={campaign.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{campaign.title}</h5>
                  <p className="card-text text-muted">{campaign.description}</p>
                  
                  <div className="d-flex justify-content-between">
                    <span>Progresso</span>
                    <span>{progress} / {campaign.targetQuantity} un.</span>
                  </div>
                  <div className="progress mb-3" style={{height: '25px'}}>
                    <div 
                      className={`progress-bar ${isCompleted ? 'bg-success' : ''}`}
                      role="progressbar" 
                      style={{ width: `${progressPercentage}%` }} 
                      aria-valuenow={progressPercentage} 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    >
                      {progressPercentage.toFixed(0)}%
                    </div>
                  </div>
                  {isCompleted && <p className="text-success fw-bold">Parabéns, você completou este programa!</p>}
                </div>
                <div className="card-footer">
                  <strong>Recompensa:</strong> R$ {campaign.bonus.toFixed(2)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}